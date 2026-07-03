
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  full_name IS NOT NULL
  AND length(btrim(full_name)) BETWEEN 2 AND 120
  AND email IS NOT NULL
  AND length(email) <= 254
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND phone IS NOT NULL
  AND length(btrim(phone)) BETWEEN 3 AND 32
  AND phone ~ '^[0-9+()\-.\s/]+$'
  AND (destination_country IS NULL OR length(destination_country) <= 80)
  AND (origin_country IS NULL OR length(origin_country) <= 80)
  AND (visa_type IS NULL OR length(visa_type) <= 80)
  AND (education_level IS NULL OR length(education_level) <= 80)
  AND (source_page IS NULL OR length(source_page) <= 120)
);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;
