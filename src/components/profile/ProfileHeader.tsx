
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, Award, Briefcase, UserPlus, Send, Calendar, 
  Mail, MapPin, BookOpen, Code
} from "lucide-react";
import { toast } from "sonner";

export interface ProfileData {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  isStartup: boolean;
  location?: string;
  email?: string;
  joinDate: string;
  followers: number;
  following: number;
  ambitionScore?: number;
  tags?: string[];
  
  // Personal user specific
  college?: string;
  major?: string;
  year?: string;
  mainSkill?: string;
  
  // Startup specific
  mission?: string;
  industry?: string;
  isPublic?: boolean;
  rolesNeeded?: string[];
}

interface ProfileHeaderProps {
  profile: ProfileData;
  isCurrentUser: boolean;
}

const ProfileHeader = ({ profile, isCurrentUser }: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`You are now following ${profile.name}`);
    }
  };
  
  const handleInvite = () => {
    toast.success("Invitation sent successfully!");
  };
  
  const handleMessage = () => {
    // Navigate to messages or open message dialog
    toast.success("Message dialog opened");
  };
  
  return (
    <Card className="mb-6 overflow-hidden">
      <div 
        className="h-48 bg-gradient-to-r from-brand-blue to-brand-purple relative"
        style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="absolute -bottom-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <CardContent className="pt-14">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {profile.isStartup ? (
                <Badge variant="outline" className="bg-brand-lightPurple text-brand-darkPurple">
                  Startup
                </Badge>
              ) : profile.ambitionScore && (
                <span className="ambition-score">
                  <Award size={14} />
                  {profile.ambitionScore}
                </span>
              )}
            </div>
            
            <div className="text-muted-foreground">@{profile.username}</div>
            
            <div className="mt-3 max-w-2xl">
              {profile.bio}
            </div>
            
            <div className="flex flex-wrap gap-y-2 mt-3 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center mr-4">
                  <MapPin size={14} className="mr-1" />
                  {profile.location}
                </div>
              )}
              
              {profile.email && (
                <div className="flex items-center mr-4">
                  <Mail size={14} className="mr-1" />
                  {profile.email}
                </div>
              )}
              
              <div className="flex items-center mr-4">
                <Calendar size={14} className="mr-1" />
                Joined {profile.joinDate}
              </div>
              
              {profile.isStartup ? (
                <>
                  {profile.industry && (
                    <div className="flex items-center mr-4">
                      <Briefcase size={14} className="mr-1" />
                      {profile.industry}
                    </div>
                  )}
                  <div className="flex items-center mr-4">
                    <UserPlus size={14} className="mr-1" />
                    {profile.isPublic ? "Public" : "Private"}
                  </div>
                </>
              ) : (
                <>
                  {profile.college && (
                    <div className="flex items-center mr-4">
                      <BookOpen size={14} className="mr-1" />
                      {`${profile.college}${profile.year ? ` • ${profile.year}` : ''}`}
                    </div>
                  )}
                  {profile.major && (
                    <div className="flex items-center mr-4">
                      <Code size={14} className="mr-1" />
                      {profile.major}
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="flex mt-4 gap-x-4">
              <div>
                <span className="font-semibold">{profile.followers.toLocaleString()}</span>{" "}
                <span className="text-muted-foreground">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{profile.following.toLocaleString()}</span>{" "}
                <span className="text-muted-foreground">Following</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isCurrentUser ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <>
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleMessage}
                >
                  <MessageCircle size={18} className="mr-1" />
                  Message
                </Button>
                
                {!profile.isStartup && (
                  <Button 
                    variant="outline"
                    onClick={handleInvite}
                  >
                    <Send size={18} className="mr-1" />
                    Invite
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        
        {profile.isStartup && profile.rolesNeeded && profile.rolesNeeded.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Roles Needed:</h3>
            <div className="flex flex-wrap gap-2">
              {profile.rolesNeeded.map(role => (
                <Badge key={role} variant="outline">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {profile.tags && profile.tags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {profile.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
