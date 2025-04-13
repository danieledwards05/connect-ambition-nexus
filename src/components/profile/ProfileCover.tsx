
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileImageUpload from "./ProfileImageUpload";

interface ProfileCoverProps {
  coverUrl?: string;
  avatarUrl?: string;
  name: string;
  isCurrentUser?: boolean;
}

const ProfileCover = ({ coverUrl, avatarUrl, name, isCurrentUser = false }: ProfileCoverProps) => {
  const [currentCover, setCurrentCover] = useState<string | undefined>(coverUrl);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(avatarUrl);

  const handleCoverChange = (imageUrl: string) => {
    setCurrentCover(imageUrl);
    
    // Update in localStorage if it's the current user
    if (isCurrentUser) {
      const currentUserJson = localStorage.getItem('currentUser');
      if (currentUserJson) {
        const currentUser = JSON.parse(currentUserJson);
        currentUser.coverUrl = imageUrl;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  };

  const handleAvatarChange = (imageUrl: string) => {
    setCurrentAvatar(imageUrl);
    
    // Update in localStorage if it's the current user
    if (isCurrentUser) {
      const currentUserJson = localStorage.getItem('currentUser');
      if (currentUserJson) {
        const currentUser = JSON.parse(currentUserJson);
        currentUser.avatarUrl = imageUrl;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  };

  return (
    <div 
      className="h-40 bg-gradient-to-r from-brand-blue to-brand-purple relative"
      style={currentCover ? { backgroundImage: `url(${currentCover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {isCurrentUser && (
        <ProfileImageUpload 
          type="cover" 
          onImageSelected={handleCoverChange} 
          currentImage={currentCover}
        />
      )}
      
      <div className="absolute -bottom-12 left-6 relative">
        <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
          <AvatarImage src={currentAvatar || "/placeholder.svg"} />
          <AvatarFallback className="text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        {isCurrentUser && (
          <ProfileImageUpload 
            type="avatar" 
            onImageSelected={handleAvatarChange} 
            currentImage={currentAvatar}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCover;
