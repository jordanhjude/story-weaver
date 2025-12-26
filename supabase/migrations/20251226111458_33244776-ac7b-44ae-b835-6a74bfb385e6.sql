-- Create a secure function to get story comments without exposing user_id
-- Returns comments with an is_owner flag instead of raw user_id
CREATE OR REPLACE FUNCTION public.get_story_comments(p_story_id text)
RETURNS TABLE (
  id uuid,
  content text,
  author_name text,
  created_at timestamptz,
  is_owner boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    sc.id,
    sc.content,
    sc.author_name,
    sc.created_at,
    (auth.uid() = sc.user_id) AS is_owner
  FROM public.story_comments sc
  WHERE sc.story_id = p_story_id
  ORDER BY sc.created_at DESC
$$;

-- Update SELECT policy to be more restrictive - only allow users to see their own comments directly
-- All public access should go through the secure function
DROP POLICY IF EXISTS "Authenticated users can view comments" ON public.story_comments;

CREATE POLICY "Users can view their own comments" 
ON public.story_comments 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);