-- Remove the overly permissive SELECT policy
DROP POLICY IF EXISTS "Only authenticated users can view leads" ON public.leads;