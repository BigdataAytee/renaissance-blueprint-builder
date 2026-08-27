-- ============ Job applications ============
-- Anyone can apply; only admins can read applications back or download a CV.
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  cover_note TEXT NOT NULL DEFAULT '',
  cv_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply"
  ON public.job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX job_applications_vacancy_idx ON public.job_applications (vacancy_id, created_at DESC);

-- ============ CV storage ============
-- Private bucket: uploads are open so applicants can attach a CV, but reading
-- one back requires an admin (and therefore a signed URL issued to an admin).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'applications',
  'applications',
  false,
  5242880,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload a CV"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'applications');

CREATE POLICY "Admins can read CVs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'applications' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete CVs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'applications' AND public.has_role(auth.uid(), 'admin'));
