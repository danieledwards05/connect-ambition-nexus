
import { useState, useEffect } from "react";
import PostCard, { Post } from "@/components/post/PostCard";
import { Card, CardContent } from "@/components/ui/card";

interface PostListProps {
  initialPosts: Post[];
}

const PostList = ({ initialPosts }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [initialPosts]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                  <div className="h-20 bg-muted rounded w-full"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded w-20"></div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
