import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, UserPlus, Settings } from "lucide-react";
import { toast } from "sonner";
import EditProfileDialog from "./EditProfileDialog";
import { useNavigate } from "react-router-dom";

interface ProfileActionsProps {
  profileName: string;
  profileId: string;
  isCurrentUser: boolean;
  isStartup: boolean;
}

const ProfileActions = ({ profileName, profileId, isCurrentUser, isStartup }: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get the current profile data
  const getCurrentProfile = () => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      return JSON.parse(currentUserJson);
    }
    return null;
  };
  
  // Check if current user is following this profile
  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson && profileId) {
      const currentUser = JSON.parse(currentUserJson);
      
      // Get following list or initialize empty array
      const followingList = currentUser.followingList || [];
      
      // Check if profile is in the following list
      setIsFollowing(followingList.some((id: string) => id === profileId));
    }
  }, [profileId]);
  
  const handleFollow = () => {
    // Get current user from localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) {
      toast.error("You must be logged in to follow users");
      return;
    }
    
    const currentUser = JSON.parse(currentUserJson);
    
    // Initialize followingList if it doesn't exist
    if (!currentUser.followingList) {
      currentUser.followingList = [];
    }
    
    // Toggle following status
    if (isFollowing) {
      // Remove from following list
      currentUser.followingList = currentUser.followingList.filter((id: string) => id !== profileId);
      currentUser.following = Math.max(0, (currentUser.following || 0) - 1);
      setIsFollowing(false);
      toast.success(`You are no longer following ${profileName}`);
    } else {
      // Add to following list
      currentUser.followingList.push(profileId);
      currentUser.following = (currentUser.following || 0) + 1;
      setIsFollowing(true);
      toast.success(`You are now following ${profileName}`);
      
      // Also update the followed user's followers count
      updateFollowersCount(profileId, true);
    }
    
    // Save updated user data
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  };
  
  // Function to update followers count for the profile being followed/unfollowed
  const updateFollowersCount = (id: string, isIncrement: boolean) => {
    // Get all registered users
    const registeredUsersJson = localStorage.getItem('registeredUsers');
    if (!registeredUsersJson) return;
    
    const registeredUsers = JSON.parse(registeredUsersJson);
    
    // Find the user being followed
    const userIndex = registeredUsers.findIndex((user: any) => user.id === id);
    if (userIndex === -1) return;
    
    // Update followers count
    if (isIncrement) {
      registeredUsers[userIndex].followers = (registeredUsers[userIndex].followers || 0) + 1;
    } else {
      registeredUsers[userIndex].followers = Math.max(0, (registeredUsers[userIndex].followers || 0) - 1);
    }
    
    // Save updated users list
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // If this is the currently viewed profile, update currentUser as well
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser.id === id) {
        currentUser.followers = registeredUsers[userIndex].followers;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  };
  
  const handleInvite = () => {
    toast.success("Invitation sent successfully!");
  };
  
  const handleMessage = () => {
    toast.success("Message dialog opened");
  };
  
  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };
  
  const handleCloseEditProfile = (saved: boolean = false) => {
    setIsEditProfileOpen(false);
    if (saved) {
      // Force refresh the profile page to show the updated data
      navigate(0);
    }
  };
  
  if (isCurrentUser) {
    return (
      <>
        <Button variant="outline" size="sm" onClick={handleEditProfile}>
          <Settings size={16} className="mr-1" />
          Edit Profile
        </Button>
        
        <EditProfileDialog 
          isOpen={isEditProfileOpen}
          onClose={handleCloseEditProfile}
          profile={getCurrentProfile()}
        />
      </>
    );
  }
  
  return (
    <div className="flex gap-2">
      <Button 
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={handleFollow}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
      
      <Button 
        variant="outline"
        size="sm"
        onClick={handleMessage}
      >
        <MessageCircle size={16} className="mr-1" />
        Message
      </Button>
      
      {!isStartup && (
        <Button 
          variant="outline"
          size="sm"
          onClick={handleInvite}
        >
          <Send size={16} className="mr-1" />
          Invite
        </Button>
      )}
    </div>
  );
};

export default ProfileActions;
