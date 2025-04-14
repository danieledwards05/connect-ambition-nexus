
import { useState, useEffect } from "react";
import { ProfileData } from "@/components/profile/ProfileHeader.types";
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
      // Only show posts where the author ID matches the current user's ID
      const currentUserPosts = currentUser.isStartup 
        ? startupPosts.filter(post => post.author.id === currentUser.id)
        : userPosts.filter(post => post.author.id === currentUser.id);
      
      setPosts(currentUserPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // If ID is provided, check if it matches current user
    if (id && currentUser && currentUser.id === id) {
      setProfile(currentUser);
      // Only show posts where the author ID matches the current user's ID
      const currentUserPosts = currentUser.isStartup 
        ? startupPosts.filter(post => post.author.id === currentUser.id)
        : userPosts.filter(post => post.author.id === currentUser.id);
      
      setPosts(currentUserPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, fetch the profile based on the ID
    setTimeout(() => {
      // Check if this user exists in registeredUsers
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      if (registeredUsersJson && id) {
        const registeredUsers = JSON.parse(registeredUsersJson);
        const registeredUser = registeredUsers.find((user: any) => user.id === id);
        
        if (registeredUser) {
          setProfile(registeredUser);
          // Set posts for this user (empty for now)
          setPosts([]);
          setIsCurrentUser(false);
          setIsLoading(false);
          return;
        }
      }
      
      // If user not found in registered users, use mock data
      const baseProfile = id?.includes("startup") ? mockStartupProfile : mockProfileData;
      
      // Set the profile data - ensure it has the same ambitionScore as currentUser if available
      setProfile({
        ...baseProfile,
        // Use 0 for all numeric placeholders
        followers: 0,
        following: 0,
        // Use currentUser's ambitionScore or fallback to 0 (not 75 as before)
        ambitionScore: currentUser?.ambitionScore || 0
      });
      
      // No posts for non-current users
      setPosts([]);
      
      setIsCurrentUser(false);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  return { profile, posts, isLoading, isCurrentUser };
};

// Function to join a startup - would normally be part of a context or service
export const joinStartup = (startupId: string, startupName: string) => {
  // Get current user's joined startups from localStorage or create empty array
  const joinedStartupsJson = localStorage.getItem('joinedStartups');
  const joinedStartups = joinedStartupsJson ? JSON.parse(joinedStartupsJson) : [];
  
  // Add this startup if not already joined
  if (!joinedStartups.some((startup: any) => startup.id === startupId)) {
    joinedStartups.push({
      id: startupId,
      name: startupName,
      joinedAt: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('joinedStartups', JSON.stringify(joinedStartups));
    return true;
  }
  
  return false;
};

// Function to get all startups the user has joined
export const getJoinedStartups = () => {
  const joinedStartupsJson = localStorage.getItem('joinedStartups');
  return joinedStartupsJson ? JSON.parse(joinedStartupsJson) : [];
};
