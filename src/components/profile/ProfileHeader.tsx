
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Mail, Calendar, BookOpen, Code, Briefcase
} from "lucide-react";
import { ProfileData } from "./ProfileHeader.types";
import ProfileCover from "./ProfileCover";
import UserScoreDisplay from "./UserScoreDisplay";
import ProfileMetadataItem from "./ProfileMetadataItem";
import FollowStats from "./FollowStats";
import ProfileActions from "./ProfileActions";
import ProfileTags from "./ProfileTags";

// Move the ProfileData interface to a separate file to reduce the size of this file
export * from "./ProfileHeader.types";

interface ProfileHeaderProps {
  profile: ProfileData;
  isCurrentUser: boolean;
}

const ProfileHeader = ({ profile, isCurrentUser }: ProfileHeaderProps) => {
  // Get the current user's ambition score for consistency
  const currentUserJson = localStorage.getItem('currentUser');
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
  
  // Use the profile's ambition score, but ensure it's consistent with currentUser for the logged-in user
  const ambitionScore = isCurrentUser && currentUser ? 
    currentUser.ambitionScore : profile.ambitionScore || 0;
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <ProfileCover 
        coverUrl={profile.coverUrl}
        avatarUrl={profile.avatarUrl}
        name={profile.name}
        isCurrentUser={isCurrentUser}
      />
      
      <CardContent className="pt-14">
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {profile.isStartup ? (
                <Badge variant="outline" className="bg-brand-lightPurple text-brand-darkPurple">
                  Startup
                </Badge>
              ) : (
                <UserScoreDisplay score={ambitionScore} showBadgeOnly={true} />
              )}
            </div>
            
            <div className="text-muted-foreground">@{profile.username}</div>
            
            {!profile.isStartup && <UserScoreDisplay score={ambitionScore} />}
            
            <div className="mt-3 text-sm">
              {profile.bio || profile.mission}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
              {profile.location && (
                <ProfileMetadataItem icon={MapPin} text={profile.location} />
              )}
              
              {profile.email && (
                <ProfileMetadataItem icon={Mail} text={profile.email} />
              )}
              
              <ProfileMetadataItem icon={Calendar} text={`Joined ${profile.joinDate}`} />
              
              {profile.isStartup ? (
                <>
                  {profile.industry && (
                    <ProfileMetadataItem icon={Briefcase} text={profile.industry} />
                  )}
                </>
              ) : (
                <>
                  {profile.college && (
                    <ProfileMetadataItem 
                      icon={BookOpen} 
                      text={`${profile.college}${profile.year ? ` • ${profile.year}` : ''}`} 
                    />
                  )}
                  {profile.major && (
                    <ProfileMetadataItem icon={Code} text={profile.major} />
                  )}
                </>
              )}
            </div>
            
            <FollowStats followers={profile.followers} following={profile.following} />
          </div>
          
          <ProfileActions 
            profileName={profile.name}
            profileId={profile.id} // Added the missing profileId prop
            isCurrentUser={isCurrentUser} 
            isStartup={profile.isStartup} 
          />
        </div>
        
        <ProfileTags tags={profile.tags} />
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
