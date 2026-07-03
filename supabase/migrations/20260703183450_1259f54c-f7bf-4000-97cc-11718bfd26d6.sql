REVOKE EXECUTE ON FUNCTION public.notify_indexnow() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.notify_indexnow() TO service_role;