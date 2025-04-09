
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Post } from "@/components/post/PostCard";

// Mock data - would be fetched from API in a real application
export const mockProfileData: ProfileData = {
  id: "user1",
  name: "Sarah Chen",
  username: "sarahc",
  avatarUrl: "/placeholder.svg",
  coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  bio: "Computer Science student passionate about AI and machine learning. Currently working on projects that combine NLP with healthcare applications. Looking to join a startup in the AI space.",
  isStartup: false,
  location: "Boston, MA",
  email: "sarah.chen@example.edu",
  joinDate: "May 2023",
  followers: 248,
  following: 156,
  ambitionScore: 85,
  tags: ["MachineLearning", "AI", "Python", "Healthcare"],
  college: "Boston University",
  major: "Computer Science",
  year: "Junior",
  mainSkill: "Machine Learning"
};

export const mockStartupProfile: ProfileData = {
  id: "startup1",
  name: "EcoTech Solutions",
  username: "ecotech",
  avatarUrl: "/placeholder.svg",
  coverUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  bio: "",
  mission: "Developing innovative solutions to make renewable energy more accessible to everyone. Our IoT-based smart energy monitoring system helps businesses reduce their carbon footprint while saving costs.",
  isStartup: true,
  location: "San Francisco, CA",
  email: "info@ecotechsolutions.com",
  joinDate: "January 2022",
  followers: 1203,
  following: 89,
  industry: "CleanTech",
  isPublic: false,
  rolesNeeded: ["Full-Stack Developer", "IoT Engineer", "Marketing Specialist", "Business Development"],
  tags: ["CleanTech", "Renewable", "IoT", "Sustainability"]
};

export const userPosts: Post[] = [
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
    id: "3",
    author: {
      id: "user1",
      name: "Sarah Chen",
      username: "sarahc",
      avatarUrl: "/placeholder.svg",
      ambitionScore: 85
    },
    content: "Excited to share that my research paper on 'Neural Networks for Predicting Patient Outcomes' has been accepted at the upcoming AI in Healthcare Conference! #Achievement #Research #AI",
    createdAt: "3d ago",
    likes: 54,
    comments: 12,
    tags: ["Research", "Achievement", "AIinHealthcare"],
    isLiked: true
  }
];

export const startupPosts: Post[] = [
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
    id: "4",
    author: {
      id: "startup1",
      name: "EcoTech Solutions",
      username: "ecotech",
      isStartup: true
    },
    content: "Our team at the CleanTech Expo 2023! We had a great time showcasing our smart energy monitoring system and connecting with potential partners and customers.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    createdAt: "1w ago",
    likes: 43,
    comments: 7,
    tags: ["CleanTech", "TeamPhoto", "Expo"],
    isLiked: false
  }
];
