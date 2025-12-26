-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view story likes count" ON public.story_likes;

-- Create a new policy that only allows users to view their own likes
CREATE POLICY "Users can view their own story likes" 
ON public.story_likes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a secure function to get story like counts (for public display)
CREATE OR REPLACE FUNCTION public.get_story_likes_count(p_story_id text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.story_likes
  WHERE story_id = p_story_id
$$;

-- Create a function to check if current user liked a story
CREATE OR REPLACE FUNCTION public.user_has_liked_story(p_story_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.story_likes
    WHERE story_id = p_story_id
      AND user_id = auth.uid()
  )
$$;