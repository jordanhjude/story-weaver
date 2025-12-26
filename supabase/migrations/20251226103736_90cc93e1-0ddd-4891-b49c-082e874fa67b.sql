-- Create story_likes table for tracking likes on stories
CREATE TABLE public.story_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- Create story_comments table for comments on stories
CREATE TABLE public.story_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.story_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for story_likes
CREATE POLICY "Anyone can view story likes count"
  ON public.story_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like stories"
  ON public.story_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes"
  ON public.story_likes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for story_comments
CREATE POLICY "Anyone can view comments"
  ON public.story_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add comments"
  ON public.story_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.story_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.story_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updating updated_at on comments
CREATE TRIGGER update_story_comments_updated_at
  BEFORE UPDATE ON public.story_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_story_likes_story_id ON public.story_likes(story_id);
CREATE INDEX idx_story_comments_story_id ON public.story_comments(story_id);
CREATE INDEX idx_story_comments_created_at ON public.story_comments(created_at DESC);