
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface ProfileActionsProps {
  profileName: string;
  isCurrentUser: boolean;
  isStartup: boolean;
}

const ProfileActions = ({ profileName, isCurrentUser, isStartup }: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`You are now following ${profileName}`);
    }
  };
  
  const handleInvite = () => {
    toast.success("Invitation sent successfully!");
  };
  
  const handleMessage = () => {
    toast.success("Message dialog opened");
  };
  
  if (isCurrentUser) {
    return <Button variant="outline" size="sm">Edit Profile</Button>;
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
