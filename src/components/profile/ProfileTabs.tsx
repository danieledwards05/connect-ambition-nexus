
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Post } from "@/components/post/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post/PostCard";
import ProjectCard, { Project } from "@/components/profile/ProjectCard";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ProfileTabsProps {
  profile: ProfileData;
  posts: Post[];
}

const ProfileTabs = ({ profile, posts }: ProfileTabsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Get projects from localStorage or use empty array if none exist
    const storedProjects = localStorage.getItem(`projects_${profile.id}`);
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      // Add sample projects only for the current user for demo purposes
      const isCurrentUser = localStorage.getItem('currentUser') && 
        JSON.parse(localStorage.getItem('currentUser') || '{}').id === profile.id;
      
      if (isCurrentUser && !profile.isStartup) {
        const sampleProjects: Project[] = [
          {
            id: "1",
            title: "Personal Portfolio Website",
            description: "A responsive portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            githubLink: "https://github.com/username/portfolio",
            link: "https://portfolio.example.com",
            date: "March 15, 2025"
          },
          {
            id: "2",
            title: "Task Management App",
            description: "A productivity application for managing daily tasks with features like drag-and-drop, reminders, and priority levels.",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop",
            technologies: ["React", "Redux", "Firebase"],
            githubLink: "https://github.com/username/task-app",
            date: "January 8, 2025"
          }
        ];
        setProjects(sampleProjects);
        localStorage.setItem(`projects_${profile.id}`, JSON.stringify(sampleProjects));
      }
    }
  }, [profile.id]);
  
  const handleAddProject = () => {
    // This would typically open a modal to add a new project
    // For demo purposes, we'll just add a placeholder project
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Click Edit to customize this project",
      technologies: ["Add", "Technologies"],
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem(`projects_${profile.id}`, JSON.stringify(updatedProjects));
  };
  
  // Determine if the current profile belongs to the logged-in user
  const isCurrentUser = localStorage.getItem('currentUser') && 
    JSON.parse(localStorage.getItem('currentUser') || '{}').id === profile.id;
  
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Projects</h3>
            {isCurrentUser && !profile.isStartup && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleAddProject}
              >
                <PlusCircle size={16} />
                <span>Add Project</span>
              </Button>
            )}
          </div>
          
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {isCurrentUser 
                  ? "Add your projects to showcase your work and skills" 
                  : "No projects available"}
              </p>
              {isCurrentUser && (
                <Button 
                  variant="default" 
                  className="mt-4"
                  onClick={handleAddProject}
                >
                  Add Your First Project
                </Button>
              )}
            </div>
          )}
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
