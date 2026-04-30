
-- Tighten insert policies: only the admin email can write
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) = 'sahil280389@gmail.com'
  );
$$;

DROP POLICY IF EXISTS "Authenticated users can insert EE draws" ON public.express_entry_draws;
CREATE POLICY "Admin can insert EE draws"
  ON public.express_entry_draws FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can insert PNP draws" ON public.pnp_draws;
CREATE POLICY "Admin can insert PNP draws"
  ON public.pnp_draws FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
CREATE POLICY "Admin can insert blog posts"
  ON public.blog_posts FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can insert NOC codes" ON public.noc_codes;
CREATE POLICY "Admin can insert NOC codes"
  ON public.noc_codes FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can insert processing times" ON public.processing_times;
CREATE POLICY "Admin can insert processing times"
  ON public.processing_times FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());
