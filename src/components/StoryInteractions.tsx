import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface StoryInteractionsProps {
  storyId: string;
}

interface Comment {
  id: string;
  content: string;
  author_name: string | null;
  user_id: string;
  created_at: string;
}

export function StoryInteractions({ storyId }: StoryInteractionsProps) {
  const [user, setUser] = useState<any>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [storyId, user]);

  const fetchLikes = async () => {
    // Get total likes count
    const { count } = await supabase
      .from("story_likes")
      .select("*", { count: "exact", head: true })
      .eq("story_id", storyId);
    
    setLikesCount(count || 0);

    // Check if current user has liked
    if (user) {
      const { data } = await supabase
        .from("story_likes")
        .select("id")
        .eq("story_id", storyId)
        .eq("user_id", user.id)
        .maybeSingle();
      
      setHasLiked(!!data);
    }
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("story_comments")
      .select("*")
      .eq("story_id", storyId)
      .order("created_at", { ascending: false });
    
    setComments(data || []);
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like stories");
      return;
    }

    setIsLiking(true);
    try {
      if (hasLiked) {
        await supabase
          .from("story_likes")
          .delete()
          .eq("story_id", storyId)
          .eq("user_id", user.id);
        
        setHasLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await supabase
          .from("story_likes")
          .insert({ story_id: storyId, user_id: user.id });
        
        setHasLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Failed to update like");
    } finally {
      setIsLiking(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("story_comments")
        .insert({
          story_id: storyId,
          user_id: user.id,
          content: newComment.trim(),
          author_name: user.email?.split("@")[0] || "Reader",
        });

      if (error) throw error;

      setNewComment("");
      fetchComments();
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await supabase
        .from("story_comments")
        .delete()
        .eq("id", commentId);
      
      fetchComments();
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="border-t border-border/30 pt-12 mt-12">
      {/* Like and Comment buttons */}
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 transition-colors ${
            hasLiked ? "text-rose" : "text-muted-foreground hover:text-rose"
          }`}
        >
          <Heart className={`w-5 h-5 ${hasLiked ? "fill-rose" : ""}`} />
          <span className="font-body text-sm">{likesCount} {likesCount === 1 ? "like" : "likes"}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-body text-sm">{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="space-y-6 animate-fade-in">
          {/* Comment form */}
          {user ? (
            <form onSubmit={handleSubmitComment} className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 px-4 py-3 bg-card/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose/50 font-body text-sm"
              />
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-rose hover:bg-rose/90 text-primary-foreground px-4"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          ) : (
            <p className="text-muted-foreground font-body text-sm italic">
              <a href="/auth" className="text-rose hover:text-rose/80">Sign in</a> to leave a comment
            </p>
          )}

          {/* Comments list */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground/60 font-body text-sm italic">
                No comments yet. Be the first to share your thoughts.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-card/30 border border-border/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-body text-sm text-foreground">
                          {comment.author_name || "Reader"}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                    
                    {user?.id === comment.user_id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-muted-foreground/50 hover:text-rose transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
