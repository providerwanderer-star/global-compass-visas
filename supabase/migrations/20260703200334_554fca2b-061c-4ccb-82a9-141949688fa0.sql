
CREATE TABLE IF NOT EXISTS public.immigration_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'policy',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_immigration_news_published ON public.immigration_news (published_at DESC);

GRANT SELECT ON public.immigration_news TO anon, authenticated;
GRANT ALL ON public.immigration_news TO service_role;

ALTER TABLE public.immigration_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read immigration news"
  ON public.immigration_news FOR SELECT
  USING (true);

CREATE TRIGGER update_immigration_news_updated_at
  BEFORE UPDATE ON public.immigration_news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


CREATE TABLE IF NOT EXISTS public.ingestion_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  items_upserted INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ingestion_runs_finished ON public.ingestion_runs (finished_at DESC);
CREATE INDEX IF NOT EXISTS idx_ingestion_runs_status ON public.ingestion_runs (status, finished_at DESC);

GRANT SELECT ON public.ingestion_runs TO anon, authenticated;
GRANT ALL ON public.ingestion_runs TO service_role;

ALTER TABLE public.ingestion_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read ingestion runs"
  ON public.ingestion_runs FOR SELECT
  USING (true);
