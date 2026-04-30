CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_indexnow()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://ojrdnehpkmyvakweknot.supabase.co/functions/v1/indexnow-ping',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW; -- never block the insert if the ping fails
END;
$$;

DROP TRIGGER IF EXISTS trg_indexnow_ee ON public.express_entry_draws;
CREATE TRIGGER trg_indexnow_ee
  AFTER INSERT ON public.express_entry_draws
  FOR EACH ROW EXECUTE FUNCTION public.notify_indexnow();

DROP TRIGGER IF EXISTS trg_indexnow_pnp ON public.pnp_draws;
CREATE TRIGGER trg_indexnow_pnp
  AFTER INSERT ON public.pnp_draws
  FOR EACH ROW EXECUTE FUNCTION public.notify_indexnow();