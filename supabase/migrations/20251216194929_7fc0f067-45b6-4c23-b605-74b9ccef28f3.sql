-- Add content and videos columns to episodes
ALTER TABLE public.episodes 
ADD COLUMN content TEXT,
ADD COLUMN videos TEXT[] DEFAULT '{}';