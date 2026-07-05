REVOKE EXECUTE ON FUNCTION public.get_last_ingested_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_last_ingested_at() TO service_role;