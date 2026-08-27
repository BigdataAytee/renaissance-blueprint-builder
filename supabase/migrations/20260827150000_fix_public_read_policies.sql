-- ============================================================================
-- Public read policies must not call has_role().
--
-- Five content tables carried a SELECT policy granted to {anon, authenticated}:
--
--     USING (is_published = true OR has_role(auth.uid(), 'admin'))
--
-- but EXECUTE on has_role() is revoked from anon (20260710231010) and granted
-- only to authenticated and service_role (20260710232950). The planner folds
-- that stable call into an InitPlan, so it is evaluated even for rows where
-- is_published is already true — and anonymous SELECT fails outright with
-- "permission denied for function has_role" rather than returning the
-- published rows.
--
-- Effect: /events, /gallery, /news, /team and /careers return nothing to
-- logged-out visitors. Because each page renders an empty state on error, an
-- unreadable table is indistinguishable from an empty one.
--
-- The fix keeps the revoke intact — anon is never handed has_role(). Each
-- table gets two policies instead of one:
--
--   anon          → is_published = true          (no function call at all)
--   authenticated → the original predicate       (admins still preview drafts)
-- ============================================================================

DO $$
DECLARE
  t TEXT;
  old_name TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['events','gallery_images','news_posts','team_members','vacancies']
  LOOP
    -- Drop the existing combined policy, whatever it was named.
    FOR old_name IN
      SELECT policyname FROM pg_policies
      WHERE schemaname = 'public' AND tablename = t
        AND cmd = 'SELECT' AND 'anon' = ANY(roles)
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', old_name, t);
    END LOOP;

    EXECUTE format($f$
      CREATE POLICY "Anonymous can read published %1$s"
        ON public.%1$I FOR SELECT TO anon
        USING (is_published = true)
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "Signed-in can read published %1$s"
        ON public.%1$I FOR SELECT TO authenticated
        USING (is_published = true OR public.has_role(auth.uid(), 'admin'))
    $f$, t);
  END LOOP;
END $$;
