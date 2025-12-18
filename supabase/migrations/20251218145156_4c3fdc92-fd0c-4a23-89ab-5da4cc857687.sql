-- Create function to increment views
CREATE OR REPLACE FUNCTION public.increment_views(comic_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE comics
  SET views = COALESCE(views, 0) + 1
  WHERE id = comic_id;
END;
$$;

-- Create user_likes table to track likes per user
CREATE TABLE public.user_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  comic_id UUID NOT NULL REFERENCES public.comics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, comic_id)
);

-- Enable RLS
ALTER TABLE public.user_likes ENABLE ROW LEVEL SECURITY;

-- Users can see their own likes
CREATE POLICY "Users can view their own likes"
ON public.user_likes
FOR SELECT
USING (auth.uid() = user_id);

-- Users can add their own likes
CREATE POLICY "Users can add likes"
ON public.user_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove their own likes
CREATE POLICY "Users can remove likes"
ON public.user_likes
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to toggle like and update count
CREATE OR REPLACE FUNCTION public.toggle_like(p_comic_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_exists BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;

  -- Check if like exists
  SELECT EXISTS(
    SELECT 1 FROM user_likes WHERE user_id = v_user_id AND comic_id = p_comic_id
  ) INTO v_exists;

  IF v_exists THEN
    -- Remove like
    DELETE FROM user_likes WHERE user_id = v_user_id AND comic_id = p_comic_id;
    UPDATE comics SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = p_comic_id;
    RETURN false;
  ELSE
    -- Add like
    INSERT INTO user_likes (user_id, comic_id) VALUES (v_user_id, p_comic_id);
    UPDATE comics SET likes = COALESCE(likes, 0) + 1 WHERE id = p_comic_id;
    RETURN true;
  END IF;
END;
$$;