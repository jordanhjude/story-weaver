-- Create comics table
CREATE TABLE public.comics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  banner_image TEXT,
  genres TEXT[] DEFAULT '{}',
  episode_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  city TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create episodes table
CREATE TABLE public.episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comic_id UUID NOT NULL REFERENCES public.comics(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(comic_id, episode_number)
);

-- Enable Row Level Security
ALTER TABLE public.comics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

-- Comics are public to read
CREATE POLICY "Comics are viewable by everyone" 
ON public.comics 
FOR SELECT 
USING (true);

-- Episodes are public to read
CREATE POLICY "Episodes are viewable by everyone" 
ON public.episodes 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_comics_updated_at
BEFORE UPDATE ON public.comics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster episode lookups
CREATE INDEX idx_episodes_comic_id ON public.episodes(comic_id);
CREATE INDEX idx_episodes_number ON public.episodes(comic_id, episode_number);