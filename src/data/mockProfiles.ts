
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Post } from "@/components/post/PostCard";

// Mock data - would be fetched from API in a real application
export const mockProfileData: ProfileData = {
  id: "user1",
  name: "Your Profile",
  username: "yourprofile",
  avatarUrl: "/placeholder.svg",
  coverUrl: "",
  bio: "This is your profile. Complete your details to make it more personalized.",
  isStartup: false,
  location: "",
  email: "",
  joinDate: "Just joined",
  followers: 0,
  following: 0,
  ambitionScore: 75,
  tags: [],
  college: "",
  major: "",
  year: "",
  mainSkill: ""
};

export const mockStartupProfile: ProfileData = {
  id: "startup1",
  name: "Your Startup",
  username: "yourstartup",
  avatarUrl: "/placeholder.svg",
  coverUrl: "",
  bio: "",
  mission: "Your startup mission statement will appear here.",
  isStartup: true,
  location: "",
  email: "",
  joinDate: "Just joined",
  followers: 0,
  following: 0,
  industry: "",
  isPublic: false,
  rolesNeeded: [],
  tags: []
};

export const userPosts: Post[] = [
  // Empty array - we'll only show posts created by the current user
];

export const startupPosts: Post[] = [
  // Empty array - we'll only show posts created by the current user/startup
];

