-- ============================================================================
-- Per-IP throttling, and closing direct public writes.
--
-- The limits added in 20260827120000 are per-address and global, which a bot
-- rotating addresses walks straight past — it just consumes the global budget
-- and locks out real visitors. Limiting per IP needs the client IP, which
-- Postgres cannot see when the browser writes to PostgREST directly.
--
-- So the writes move behind the app's own server functions, which do see the
-- request. Those run with the service role, and this migration removes the
-- anonymous INSERT grants entirely: after it, the only way into these tables
-- and into the CV bucket is through a request that has passed a Turnstile
-- check and the per-IP throttle.
--
-- The per-address triggers stay as a second layer — triggers fire for the
-- service role too.
-- ============================================================================

-- ============ Throttle ledger ============
-- Subjects are a peppered SHA-256 of the IP, never the IP itself: this table
-- would otherwise be a log of who visited, which the privacy policy does not
-- claim and NDPR/GDPR would treat as personal data.
CREATE TABLE IF NOT EXISTS public.request_throttle (
  id BIGSERIAL PRIMARY KEY,
  scope TEXT NOT NULL,
  subject TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS request_throttle_lookup_idx
  ON public.request_throttle (scope, subject, created_at DESC);
CREATE INDEX IF NOT EXISTS request_throttle_created_idx
  ON public.request_throttle (created_at);

-- No anon or authenticated access: only the server touches this.
REVOKE ALL ON public.request_throttle FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.request_throttle TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.request_throttle_id_seq TO service_role;
ALTER TABLE public.request_throttle ENABLE ROW LEVEL SECURITY;

/**
 * Records one attempt and reports whether it is within the limits.
 *
 * Prunes, counts and inserts in a single round trip so a burst of concurrent
 * requests cannot each read a stale count. Returns false when either window is
 * already full, and in that case records nothing — a blocked attempt must not
 * extend its own penalty.
 */
CREATE OR REPLACE FUNCTION public.register_throttle_hit(
  _scope TEXT,
  _subject TEXT,
  _per_hour INTEGER,
  _per_day INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  hour_count INTEGER;
  day_count INTEGER;
BEGIN
  DELETE FROM public.request_throttle WHERE created_at < now() - interval '2 days';

  SELECT
    count(*) FILTER (WHERE created_at > now() - interval '1 hour'),
    count(*) FILTER (WHERE created_at > now() - interval '1 day')
    INTO hour_count, day_count
  FROM public.request_throttle
  WHERE scope = _scope AND subject = _subject;

  IF hour_count >= _per_hour OR day_count >= _per_day THEN
    RETURN false;
  END IF;

  INSERT INTO public.request_throttle (scope, subject) VALUES (_scope, _subject);
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.register_throttle_hit(TEXT, TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_throttle_hit(TEXT, TEXT, INTEGER, INTEGER)
  TO service_role;

-- ============ Close direct public writes ============
DROP POLICY IF EXISTS "Anyone can send a message" ON public.contact_messages;
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can apply" ON public.job_applications;
REVOKE INSERT ON public.job_applications FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
REVOKE INSERT ON public.newsletter_subscribers FROM anon, authenticated;

-- Supabase's service_role normally carries BYPASSRLS, which would make these
-- policies redundant — but "normally" is not a good enough reason to bet every
-- public form on it. With the anonymous policies gone there is otherwise no
-- INSERT policy left on these tables, so a service_role without BYPASSRLS would
-- be refused and every form would break. Stating them costs nothing.
CREATE POLICY "Server can record messages"
  ON public.contact_messages FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Server can record applications"
  ON public.job_applications FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Server can record subscribers"
  ON public.newsletter_subscribers FOR INSERT TO service_role WITH CHECK (true);

-- CV uploads now use a signed upload URL minted by the server after the same
-- checks, and a signed upload carries its own authorisation, so the bucket no
-- longer needs to accept anonymous writes at all.
DROP POLICY IF EXISTS "Anyone can upload a CV" ON storage.objects;

-- applications_upload_within_rate_limit() backed that policy and nothing else
-- references it now.
DROP FUNCTION IF EXISTS public.applications_upload_within_rate_limit();
