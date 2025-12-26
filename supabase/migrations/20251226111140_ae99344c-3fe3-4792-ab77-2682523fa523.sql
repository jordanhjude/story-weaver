-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view comments" ON public.story_comments;

-- Create a new policy that requires authentication to view comments
CREATE POLICY "Authenticated users can view comments" 
ON public.story_comments 
FOR SELECT 
TO authenticated
USING (true);