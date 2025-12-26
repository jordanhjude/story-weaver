-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own story likes" ON public.story_likes;

-- Create a new policy that explicitly requires authentication AND restricts to own likes
CREATE POLICY "Authenticated users can view their own story likes" 
ON public.story_likes 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);