import { useState, useEffect } from "react";
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Post } from "@/components/post/PostCard";
import { 
  mockProfileData, 
  mockStartupProfile, 
  userPosts, 
  startupPosts 
} from "@/data/mockProfiles";

export const useProfileData = (id: string | undefined) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  
  useEffect(() => {
    // Get the current user profile from localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    
    setIsLoading(true);
    
    // If no ID is provided, show the current user's profile
    if (!id && currentUser) {
      setProfile(currentUser);
      // Only show the current user's posts
      setPosts(currentUser.isStartup ? startupPosts : userPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // If ID is provided, check if it matches current user
    if (id && currentUser && currentUser.id === id) {
      setProfile(currentUser);
      // Only show the current user's posts
      setPosts(currentUser.isStartup ? startupPosts : userPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, fetch the profile based on the ID
    setTimeout(() => {
      // This is just for demo purposes - in a real app you'd fetch based on ID
      const isStartupProfile = id?.includes("startup");
      
      // Set the profile data
      setProfile(isStartupProfile ? mockStartupProfile : mockProfileData);
      
      // Filter posts to only include the ones from this specific profile
      if (isStartupProfile) {
        // Only show posts made by this startup
        setPosts(startupPosts.filter(post => post.author.id === "startup1"));
      } else {
        // Only show posts made by this user
        setPosts(userPosts.filter(post => post.author.id === "user1"));
      }
      
      setIsCurrentUser(false);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  return { profile, posts, isLoading, isCurrentUser };
};
