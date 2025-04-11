
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Post } from "@/components/post/PostCard";
import CreatePostCard from "@/components/feed/CreatePostCard";
import PostList from "@/components/feed/PostList";
import FeedTabs from "@/components/feed/FeedTabs";
import RightSidebar from "@/components/feed/RightSidebar";

// Initialize with sample comments
const sampleComments = [
  {
    id: "c1",
    authorId: "user3",
    authorName: "Alex Johnson",
    authorUsername: "alexj",
    authorAvatar: "/placeholder.svg",
    content: "This is really impressive! Would love to hear more about the ML model you used.",
    createdAt: "1h ago"
  },
  {
    id: "c2",
    authorId: "user4",
    authorName: "Jamie Smith",
    authorUsername: "jamies",
    authorAvatar: "/placeholder.svg",
    content: "Congrats on the launch! Have you considered integrating this with existing CRM tools?",
    createdAt: "45m ago"
  }
];

// Get posts from localStorage or use default ones
const getInitialPosts = () => {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    return JSON.parse(savedPosts);
  }
  
  // Default posts with sample comments for the first post
  const defaultPosts = [
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
      comments: 2,
      tags: ["AI", "MachineLearning", "Project"],
      isLiked: false,
      commentsList: sampleComments
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
      comments: 0,
      tags: ["Funding", "CleanTech", "Hiring"],
      isLiked: true,
      commentsList: []
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
      comments: 0,
      isLiked: false,
      commentsList: []
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
      comments: 0,
      tags: ["Healthcare", "MobileApp", "Milestone"],
      isLiked: false,
      commentsList: []
    }
  ];
  
  // Convert array to object with IDs as keys
  const postsObject = {};
  defaultPosts.forEach(post => {
    postsObject[post.id] = post;
  });
  
  localStorage.setItem("posts", JSON.stringify(postsObject));
  return postsObject;
};

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
  const [postsData, setPostsData] = useState(() => getInitialPosts());
  
  // Convert posts object to array for the PostList component
  const postsArray = Object.values(postsData) as Post[];
  
  // Update localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(postsData));
  }, [postsData]);
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 pl-16 md:pl-64 pt-4">
        <div className="container max-w-6xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FeedTabs>
                <CreatePostCard />
                <PostList initialPosts={postsArray} />
              </FeedTabs>
            </div>
            
            <RightSidebar 
              trendingTopics={trendingTopics} 
              suggestedStartups={suggestedStartups} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
