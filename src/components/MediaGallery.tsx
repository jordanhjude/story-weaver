import { StoryMedia } from "@/types/story";
import { Play } from "lucide-react";

interface MediaGalleryProps {
  media: StoryMedia[];
}

export function MediaGallery({ media }: MediaGalleryProps) {
  if (media.length === 0) return null;

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  return (
    <div className="space-y-8">
      {/* Images */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-muted-foreground">
            Gallery
          </h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {images.map((img, index) => (
              <figure
                key={index}
                className="group relative overflow-hidden rounded-xl animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Story image"}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {img.caption && (
                  <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-sm text-foreground/90">{img.caption}</p>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-muted-foreground flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            Videos
          </h3>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <figure
                key={index}
                className="overflow-hidden rounded-xl animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video">
                  <iframe
                    src={video.url}
                    title={video.caption || "Story video"}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {video.caption && (
                  <figcaption className="p-3 bg-card border border-t-0 border-border/50 rounded-b-xl">
                    <p className="text-sm text-muted-foreground">{video.caption}</p>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
