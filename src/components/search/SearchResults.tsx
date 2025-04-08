
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, MessageCircle, Send, Briefcase, UserPlus } from "lucide-react";
import { ProfileData } from "../profile/ProfileHeader";
import { toast } from "sonner";

interface SearchResultsProps {
  results: ProfileData[];
  isLoading: boolean;
}

const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  const handleInvite = (profile: ProfileData) => {
    toast.success(`Invitation sent to ${profile.name}`);
  };
  
  const handleJoinOrPursue = (profile: ProfileData) => {
    if (profile.isPublic) {
      toast.success(`You have joined ${profile.name}`);
    } else {
      toast.success(`Request sent to join ${profile.name}`);
    }
  };
  
  const handleMessage = (profile: ProfileData) => {
    toast.success(`Opening messages with ${profile.name}`);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded w-24"></div>
                    <div className="h-8 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {results.map((profile) => (
        <Card key={profile.id} className="hover-scale">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} />
                <AvatarFallback>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/profile/${profile.id}`}
                    className="font-semibold hover:underline text-lg"
                  >
                    {profile.name}
                  </Link>
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
                
                {profile.isStartup ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Briefcase size={14} /> {profile.industry}
                    <span className="mx-1">•</span>
                    <span>{profile.isPublic ? "Public" : "Private"}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    {profile.college && <span>{profile.college}</span>}
                    {profile.major && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{profile.major}</span>
                      </>
                    )}
                    {profile.mainSkill && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{profile.mainSkill}</span>
                      </>
                    )}
                  </div>
                )}
                
                <p className="mt-2 text-sm line-clamp-2">
                  {profile.bio || (profile.isStartup ? profile.mission : "")}
                </p>
                
                {profile.isStartup && profile.rolesNeeded && profile.rolesNeeded.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm">Looking for:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.rolesNeeded.map(role => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMessage(profile)}
                  >
                    <MessageCircle size={14} className="mr-1" />
                    Message
                  </Button>
                  
                  {profile.isStartup ? (
                    <Button 
                      size="sm"
                      onClick={() => handleJoinOrPursue(profile)}
                    >
                      <UserPlus size={14} className="mr-1" />
                      {profile.isPublic ? "Join" : "Pursue"}
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleInvite(profile)}
                    >
                      <Send size={14} className="mr-1" />
                      Invite
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
