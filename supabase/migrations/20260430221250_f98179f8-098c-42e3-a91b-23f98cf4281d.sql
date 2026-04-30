-- Mapping table: which NOC codes were eligible for each Express Entry draw
-- Used to compute "Recent Draw Cutoff" per NOC and per-NOC draw history.
CREATE TABLE IF NOT EXISTS public.draw_noc_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_number integer NOT NULL,
  noc_code text NOT NULL,
  category text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (draw_number, noc_code)
);

CREATE INDEX IF NOT EXISTS idx_draw_noc_codes_noc ON public.draw_noc_codes (noc_code);
CREATE INDEX IF NOT EXISTS idx_draw_noc_codes_draw ON public.draw_noc_codes (draw_number);

ALTER TABLE public.draw_noc_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view draw NOC mappings"
  ON public.draw_noc_codes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert draw NOC mappings"
  ON public.draw_noc_codes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());