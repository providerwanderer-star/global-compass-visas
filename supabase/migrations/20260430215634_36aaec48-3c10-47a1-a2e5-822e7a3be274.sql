
-- Phase 2: additive tables (blog, NOC, processing times)

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT NOT NULL DEFAULT '5 min',
  category TEXT NOT NULL DEFAULT 'General',
  meta_description TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.noc_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  alt_titles TEXT[] NOT NULL DEFAULT '{}',
  teer INT NOT NULL,
  category TEXT NOT NULL,
  median_salary INT,
  express_entry_eligible BOOLEAN NOT NULL DEFAULT true,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.noc_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view NOC codes"
  ON public.noc_codes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert NOC codes"
  ON public.noc_codes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.processing_times (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_type TEXT NOT NULL,
  processing_time_text TEXT NOT NULL,
  updated_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.processing_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view processing times"
  ON public.processing_times FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert processing times"
  ON public.processing_times FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to insert into the existing draws tables (for admin)
CREATE POLICY "Authenticated users can insert EE draws"
  ON public.express_entry_draws FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert PNP draws"
  ON public.pnp_draws FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- updated_at trigger for blog_posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
