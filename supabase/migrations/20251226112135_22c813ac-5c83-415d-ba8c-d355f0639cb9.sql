-- Drop and recreate increment_views function with authentication requirement
DROP FUNCTION IF EXISTS public.increment_views(uuid);

CREATE FUNCTION public.increment_views(comic_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get current user (can be null for anonymous views)
  v_user_id := auth.uid();
  
  -- Only increment if user is authenticated (prevents bot abuse)
  IF v_user_id IS NOT NULL THEN
    UPDATE comics
    SET views = COALESCE(views, 0) + 1
    WHERE id = comic_id;
  END IF;
END;
$$;