
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import PostCard, { Post } from "@/components/post/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Image, Search, TrendingUp } from "lucide-react";

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Sarah Chen",
      username: "sarahc",
      avatarUrl: "/placeholder.svg",
      ambitionScore: 85
    },
    content: "Just launched my first AI project! After 3 months of hard work, I've built an ML model that predicts customer churn with 92% accuracy. Looking for feedback from anyone in the ML space! #MachineLearning #AI #StudentProject",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    createdAt: "2h ago",
    likes: 24,
    comments: 5,
    tags: ["AI", "MachineLearning", "Project"],
    isLiked: false
  },
  {
    id: "2",
    author: {
      id: "startup1",
      name: "EcoTech Solutions",
      username: "ecotech",
      isStartup: true
    },
    content: "We're excited to announce our seed funding round of $500K! 🚀 Thanks to all our supporters and mentors who believed in our mission to make renewable energy more accessible to everyone.\n\nWe're now looking to expand our team with passionate individuals. Check out our open roles in engineering and marketing!",
    createdAt: "5h ago",
    likes: 76,
    comments: 12,
    tags: ["Funding", "CleanTech", "Hiring"],
    isLiked: true
  },
  {
    id: "3",
    author: {
      id: "user2",
      name: "Carlos Rodriguez",
      username: "carlosr",
      ambitionScore: 72
    },
    content: "Just completed my summer internship at Microsoft! Learned so much about cloud architecture and deploying scalable solutions. Happy to share my experience with anyone looking for similar opportunities.",
    createdAt: "1d ago",
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: "4",
    author: {
      id: "startup2",
      name: "HealthSync",
      username: "healthsync",
      isStartup: true
    },
    content: "Our app just hit 10,000 users! 📱 We're revolutionizing how patients manage their healthcare appointments and records. Looking for mobile developers and UI/UX designers to join our journey!",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    createdAt: "1d ago",
    likes: 118,
    comments: 23,
    tags: ["Healthcare", "MobileApp", "Milestone"],
    isLiked: false
  }
];

const trendingTopics = [
  { name: "TechStartups", count: 1243 },
  { name: "StudentFounders", count: 856 },
  { name: "VentureCapital", count: 712 },
  { name: "AIProjects", count: 684 },
  { name: "RemoteWork", count: 521 }
];

const suggestedStartups = [
  {
    id: "s1",
    name: "Quantum Analytics",
    username: "quantumanalytics",
    avatarUrl: "/placeholder.svg",
    industry: "Data Analytics",
    isPublic: true
  },
  {
    id: "s2",
    name: "GreenMobility",
    username: "greenmobility",
    avatarUrl: "/placeholder.svg",
    industry: "Transportation",
    isPublic: false
  },
  {
    id: "s3",
    name: "EdTech Innovations",
    username: "edtechinnovate",
    avatarUrl: "/placeholder.svg",
    industry: "Education",
    isPublic: true
  }
];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 pl-16 md:pl-64 pt-4">
        <div className="container max-w-6xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Tabs defaultValue="feed">
                  <TabsList className="w-full">
                    <TabsTrigger value="feed" className="flex-1">For You</TabsTrigger>
                    <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
                    <TabsTrigger value="startups" className="flex-1">Startups</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link to="/create">
                        <Input 
                          placeholder="Share an update or achievement..." 
                          className="bg-muted/50 cursor-pointer"
                          readOnly
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex mt-4 justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/create" className="flex items-center gap-1">
                        <Image size={18} />
                        <span>Media</span>
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/create">Create Post</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {isLoading ? (
                // Skeleton loader for posts
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
              ) : (
                posts.map(post => <PostCard key={post.id} post={post} />)
              )}
            </div>
            
            <div className="hidden md:block">
              <div className="sticky top-4 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Search</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search people or startups..."
                        className="pl-8"
                      />
                    </div>
                    <Button asChild className="w-full mt-2">
                      <Link to="/search">Advanced Search</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Trending Topics</CardTitle>
                      <TrendingUp size={18} className="text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {trendingTopics.map((topic) => (
                        <li key={topic.name} className="flex items-center justify-between">
                          <Badge variant="secondary" className="hover:bg-secondary/80">
                            #{topic.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Suggested Startups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {suggestedStartups.map((startup) => (
                        <li key={startup.id} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={startup.avatarUrl} />
                            <AvatarFallback>
                              {startup.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/profile/${startup.id}`}
                              className="font-medium text-sm hover:underline block truncate"
                            >
                              {startup.name}
                            </Link>
                            <span className="text-xs text-muted-foreground block truncate">
                              {startup.industry} • {startup.isPublic ? "Public" : "Private"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">Follow</Button>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="w-full mt-3">
                      See More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
