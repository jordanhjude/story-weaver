-- Create user library table for saving favorite comics
CREATE TABLE public.user_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  comic_id UUID NOT NULL REFERENCES public.comics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, comic_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;

-- Users can only see their own library
CREATE POLICY "Users can view their own library" 
ON public.user_library 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can add to their own library
CREATE POLICY "Users can add to their own library" 
ON public.user_library 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own library
CREATE POLICY "Users can remove from their own library" 
ON public.user_library 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_library_user_id ON public.user_library(user_id);
CREATE INDEX idx_user_library_comic_id ON public.user_library(comic_id);