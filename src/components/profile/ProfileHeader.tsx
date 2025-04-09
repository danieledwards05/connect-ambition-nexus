
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
    toast.success("Message dialog opened");
  };
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div 
        className="h-40 bg-gradient-to-r from-brand-blue to-brand-purple relative"
        style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="absolute -bottom-12 left-6">
          <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
            <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} />
            <AvatarFallback className="text-xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <CardContent className="pt-14">
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {profile.isStartup ? (
                <Badge variant="outline" className="bg-brand-lightPurple text-brand-darkPurple">
                  Startup
                </Badge>
              ) : profile.ambitionScore && (
                <div className="flex items-center gap-1 bg-brand-lightPurple text-brand-darkPurple py-1 px-2 rounded-md">
                  <Award size={14} className="text-brand-purple" />
                  <span className="font-semibold">{profile.ambitionScore}</span>
                  <span className="text-xs">/100</span>
                </div>
              )}
            </div>
            
            <div className="text-muted-foreground">@{profile.username}</div>
            
            {profile.ambitionScore && (
              <div className="mt-2 max-w-xs">
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Overall Score</span>
                  <span className="font-semibold">{profile.ambitionScore}/100</span>
                </div>
                <Progress value={profile.ambitionScore} className="h-1.5" />
              </div>
            )}
            
            <div className="mt-3 text-sm">
              {profile.bio || profile.mission}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
              {profile.location && (
                <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                  <MapPin size={12} className="mr-1" />
                  {profile.location}
                </div>
              )}
              
              {profile.email && (
                <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                  <Mail size={12} className="mr-1" />
                  {profile.email}
                </div>
              )}
              
              <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                <Calendar size={12} className="mr-1" />
                Joined {profile.joinDate}
              </div>
              
              {profile.isStartup ? (
                <>
                  {profile.industry && (
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                      <Briefcase size={12} className="mr-1" />
                      {profile.industry}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {profile.college && (
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                      <BookOpen size={12} className="mr-1" />
                      {profile.college}
                      {profile.year ? ` • ${profile.year}` : ''}
                    </div>
                  )}
                  {profile.major && (
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                      <Code size={12} className="mr-1" />
                      {profile.major}
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="flex mt-4 gap-x-4">
              <div className="bg-secondary/50 px-3 py-1 rounded-md">
                <span className="font-semibold">{profile.followers.toLocaleString()}</span>{" "}
                <span className="text-xs text-muted-foreground">Followers</span>
              </div>
              <div className="bg-secondary/50 px-3 py-1 rounded-md">
                <span className="font-semibold">{profile.following.toLocaleString()}</span>{" "}
                <span className="text-xs text-muted-foreground">Following</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isCurrentUser ? (
              <Button variant="outline" size="sm">Edit Profile</Button>
            ) : (
              <>
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
                
                {!profile.isStartup && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleInvite}
                  >
                    <Send size={16} className="mr-1" />
                    Invite
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        
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
