-- Add UPDATE policy for user_library
CREATE POLICY "Users can update their own library"
ON public.user_library
FOR UPDATE
USING (auth.uid() = user_id);