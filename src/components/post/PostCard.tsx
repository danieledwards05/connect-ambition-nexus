
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, MessageCircle, Share2, SendIcon,
  MoreHorizontal, Award, X
} from "lucide-react";

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    isStartup?: boolean;
    ambitionScore?: number;
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  tags?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  commentsList?: Comment[];
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.commentsList || []);
  const { toast } = useToast();
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const submitComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      authorId: "current-user", // In a real app, this would be the actual user ID
      authorName: "Current User", // In a real app, this would be the actual user name
      authorUsername: "currentuser",
      authorAvatar: "/placeholder.svg",
      content: commentText,
      createdAt: "Just now"
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    // Update localStorage to persist comments
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "{}");
    savedPosts[post.id] = {
      ...savedPosts[post.id],
      commentsList: updatedComments,
      comments: updatedComments.length
    };
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    
    setCommentText("");
    toast({
      title: "Comment added",
      description: "Your comment was successfully added to the post.",
    });
  };
  
  return (
    <Card className="mb-4 hover-scale">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.author.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Link to={`/profile/${post.author.id}`} className="font-semibold hover:underline">
                  {post.author.name}
                </Link>
                {post.author.isStartup && (
                  <Badge variant="outline" className="bg-brand-lightPurple text-brand-darkPurple">
                    Startup
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>@{post.author.username}</span>
                <span className="mx-1">•</span>
                <span>{post.createdAt}</span>
                {post.author.ambitionScore && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="ambition-score">
                      <Award size={14} />
                      {post.author.ambitionScore}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="whitespace-pre-line">{post.content}</p>
        {post.image && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-1 ${liked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} /> 
              {likeCount > 0 && <span>{likeCount}</span>}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={toggleComments}
            >
              <MessageCircle size={18} /> 
              {comments.length > 0 && <span>{comments.length}</span>}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Comments ({comments.length})</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleComments} 
                className="h-7 w-7 p-0"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {comment.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm">{comment.authorName}</span>
                          <span className="text-xs text-muted-foreground">@{comment.authorUsername}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{comment.createdAt}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea 
                  placeholder="Write a comment..." 
                  className="min-h-[80px] text-sm resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button 
                  size="sm" 
                  className="self-end"
                  disabled={!commentText.trim()}
                  onClick={submitComment}
                >
                  <SendIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
