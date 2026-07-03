-- Restrict ingestion_runs to admins; expose only last-success timestamp publicly via SECURITY DEFINER function.
DROP POLICY IF EXISTS "Public can read ingestion runs" ON public.ingestion_runs;
REVOKE SELECT ON public.ingestion_runs FROM anon;
REVOKE SELECT ON public.ingestion_runs FROM authenticated;

CREATE POLICY "Admins can read ingestion runs"
  ON public.ingestion_runs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.get_last_ingested_at()
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT finished_at
  FROM public.ingestion_runs
  WHERE status = 'ok'
  ORDER BY finished_at DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_last_ingested_at() TO anon, authenticated;