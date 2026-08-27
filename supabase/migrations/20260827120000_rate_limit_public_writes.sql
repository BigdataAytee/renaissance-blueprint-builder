-- ============================================================================
-- Rate limiting for the endpoints anonymous visitors can write to.
--
-- contact_messages, job_applications, newsletter_subscribers and the
-- `applications` storage bucket all accept anonymous INSERTs by design — that
-- is what lets people contact us or apply without an account. The honeypots on
-- those forms stop naive bots, but nothing stopped volume.
--
-- Every check below runs SECURITY DEFINER on purpose: anon has no SELECT
-- privilege on these tables, so a SECURITY INVOKER check would count zero rows
-- and never fire.
--
-- The exceptions are raised without an explicit ERRCODE, so they surface as
-- SQLSTATE P0001, which PostgREST returns as HTTP 400 with the message intact.
-- The site shows that message to the visitor, so each one is written for them.
-- ============================================================================

-- ============ Contact form ============
CREATE INDEX IF NOT EXISTS contact_messages_email_created_idx
  ON public.contact_messages (lower(email), created_at DESC);

CREATE OR REPLACE FUNCTION public.enforce_contact_message_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.contact_messages
       WHERE lower(email) = lower(NEW.email)
         AND created_at > now() - interval '1 hour') >= 3 THEN
    RAISE EXCEPTION 'You have already sent us several messages. Please give us a little time to reply before sending another.';
  END IF;

  IF (SELECT count(*) FROM public.contact_messages
       WHERE created_at > now() - interval '5 minutes') >= 60 THEN
    RAISE EXCEPTION 'The contact form is busy right now. Please try again in a few minutes.';
  END IF;

  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.enforce_contact_message_rate_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_contact_messages_rate_limit ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_rate_limit
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.enforce_contact_message_rate_limit();

-- ============ Job applications ============
CREATE INDEX IF NOT EXISTS job_applications_email_created_idx
  ON public.job_applications (lower(email), created_at DESC);

CREATE OR REPLACE FUNCTION public.enforce_job_application_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- One application per role per person is the norm; three an hour is a bot.
  IF (SELECT count(*) FROM public.job_applications
       WHERE lower(email) = lower(NEW.email)
         AND created_at > now() - interval '1 hour') >= 3 THEN
    RAISE EXCEPTION 'You have already applied a few times recently. Please wait a while before applying again.';
  END IF;

  IF (SELECT count(*) FROM public.job_applications
       WHERE lower(email) = lower(NEW.email)
         AND created_at > now() - interval '24 hours') >= 10 THEN
    RAISE EXCEPTION 'You have reached the daily application limit for this address. Please try again tomorrow.';
  END IF;

  IF (SELECT count(*) FROM public.job_applications
       WHERE created_at > now() - interval '5 minutes') >= 40 THEN
    RAISE EXCEPTION 'We are receiving a lot of applications right now. Please try again in a few minutes.';
  END IF;

  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.enforce_job_application_rate_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_job_applications_rate_limit ON public.job_applications;
CREATE TRIGGER trg_job_applications_rate_limit
  BEFORE INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.enforce_job_application_rate_limit();

-- ============ Newsletter ============
-- The unique email constraint already stops one address subscribing twice, but
-- nothing stopped a bot enumerating addresses.
CREATE OR REPLACE FUNCTION public.enforce_newsletter_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.newsletter_subscribers
       WHERE created_at > now() - interval '5 minutes') >= 30 THEN
    RAISE EXCEPTION 'Too many signups at once. Please try again in a few minutes.';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.enforce_newsletter_rate_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_newsletter_rate_limit ON public.newsletter_subscribers;
CREATE TRIGGER trg_newsletter_rate_limit
  BEFORE INSERT ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.enforce_newsletter_rate_limit();

-- ============ CV uploads ============
-- Storage has no BEFORE INSERT trigger to hook, so the cap lives in the bucket's
-- INSERT policy. It must be a SECURITY DEFINER function rather than an inline
-- subquery: a policy on storage.objects that reads storage.objects would
-- re-enter its own policy. Running as the owner bypasses RLS and breaks that.
CREATE OR REPLACE FUNCTION public.applications_upload_within_rate_limit()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, storage
AS $$
  SELECT (SELECT count(*) FROM storage.objects
           WHERE bucket_id = 'applications'
             AND created_at > now() - interval '1 minute') < 10
     AND (SELECT count(*) FROM storage.objects
           WHERE bucket_id = 'applications'
             AND created_at > now() - interval '1 hour') < 60;
$$;
REVOKE EXECUTE ON FUNCTION public.applications_upload_within_rate_limit() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.applications_upload_within_rate_limit() TO anon, authenticated;

CREATE INDEX IF NOT EXISTS objects_applications_created_idx
  ON storage.objects (created_at DESC) WHERE bucket_id = 'applications';

DROP POLICY IF EXISTS "Anyone can upload a CV" ON storage.objects;
CREATE POLICY "Anyone can upload a CV"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'applications'
    AND public.applications_upload_within_rate_limit()
  );

-- ============ Orphaned CV cleanup ============
-- A CV is uploaded before its application row is inserted, so an insert that
-- fails after a successful upload leaves a file with nothing pointing at it.
-- Applicants cannot delete from the bucket (only admins can read or delete),
-- so cleanup has to be server-side.
CREATE OR REPLACE FUNCTION public.delete_orphan_application_cvs(older_than INTERVAL DEFAULT interval '24 hours')
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, storage
AS $$
DECLARE
  removed INTEGER;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden: admin role required';
  END IF;

  WITH deleted AS (
    DELETE FROM storage.objects o
     WHERE o.bucket_id = 'applications'
       AND o.created_at < now() - older_than
       AND NOT EXISTS (
         SELECT 1 FROM public.job_applications a WHERE a.cv_path = o.name
       )
    RETURNING 1
  )
  SELECT count(*) INTO removed FROM deleted;

  RETURN removed;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.delete_orphan_application_cvs(INTERVAL) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_orphan_application_cvs(INTERVAL) TO authenticated;
