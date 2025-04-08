
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  MoreHorizontal, Star, Award
} from "lucide-react";

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
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [saved, setSaved] = useState(post.isSaved || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
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
      <CardFooter>
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
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle size={18} /> 
              {post.comments > 0 && <span>{post.comments}</span>}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={18} />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSave}
          >
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
