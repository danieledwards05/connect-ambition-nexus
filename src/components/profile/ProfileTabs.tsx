
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Post } from "@/components/post/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post/PostCard";

interface ProfileTabsProps {
  profile: ProfileData;
  posts: Post[];
}

const ProfileTabs = ({ profile, posts }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="posts" className="mt-6">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
        {profile.isStartup ? (
          <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
        ) : (
          <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
        )}
        {profile.isStartup && (
          <TabsTrigger value="roles" className="flex-1">Open Roles</TabsTrigger>
        )}
        <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-4">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Kinda empty in here</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="projects" className="mt-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          <p className="text-muted-foreground">Your projects will appear here</p>
        </div>
      </TabsContent>
      
      <TabsContent value="team" className="mt-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Team Members</h3>
          <p className="text-muted-foreground">Team members will appear here</p>
        </div>
      </TabsContent>
      
      <TabsContent value="roles" className="mt-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Open Positions</h3>
          {profile.rolesNeeded && profile.rolesNeeded.length > 0 ? (
            <ul className="space-y-2">
              {profile.rolesNeeded.map(role => (
                <li key={role} className="p-3 bg-background rounded-md border">
                  {role}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No open positions at the moment</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="about" className="mt-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          
          {profile.isStartup ? (
            <div className="space-y-4">
              {profile.mission && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Mission</h4>
                  <p>{profile.mission}</p>
                </div>
              )}
              
              {profile.industry && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Industry</h4>
                  <p>{profile.industry}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {profile.bio && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Bio</h4>
                  <p>{profile.bio}</p>
                </div>
              )}
              
              {profile.college && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Education</h4>
                  <p>{profile.college} • {profile.major} • {profile.year}</p>
                </div>
              )}
              
              {profile.mainSkill && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Main Skill</h4>
                  <p>{profile.mainSkill}</p>
                </div>
              )}
            </div>
          )}
          
          {profile.tags && profile.tags.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-muted-foreground mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
