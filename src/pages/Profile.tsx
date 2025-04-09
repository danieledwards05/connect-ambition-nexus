import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProfileHeader, { ProfileData } from "@/components/profile/ProfileHeader";
import PostCard, { Post } from "@/components/post/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - would be fetched from API in a real application
const mockProfileData: ProfileData = {
  id: "user1",
  name: "Sarah Chen",
  username: "sarahc",
  avatarUrl: "/placeholder.svg",
  coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  bio: "Computer Science student passionate about AI and machine learning. Currently working on projects that combine NLP with healthcare applications. Looking to join a startup in the AI space.",
  isStartup: false,
  location: "Boston, MA",
  email: "sarah.chen@example.edu",
  joinDate: "May 2023",
  followers: 248,
  following: 156,
  ambitionScore: 85,
  tags: ["MachineLearning", "AI", "Python", "Healthcare"],
  college: "Boston University",
  major: "Computer Science",
  year: "Junior",
  mainSkill: "Machine Learning"
};

const mockStartupProfile: ProfileData = {
  id: "startup1",
  name: "EcoTech Solutions",
  username: "ecotech",
  avatarUrl: "/placeholder.svg",
  coverUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  bio: "",
  mission: "Developing innovative solutions to make renewable energy more accessible to everyone. Our IoT-based smart energy monitoring system helps businesses reduce their carbon footprint while saving costs.",
  isStartup: true,
  location: "San Francisco, CA",
  email: "info@ecotechsolutions.com",
  joinDate: "January 2022",
  followers: 1203,
  following: 89,
  industry: "CleanTech",
  isPublic: false,
  rolesNeeded: ["Full-Stack Developer", "IoT Engineer", "Marketing Specialist", "Business Development"],
  tags: ["CleanTech", "Renewable", "IoT", "Sustainability"]
};

const userPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Sarah Chen",
      username: "sarahc",
      avatarUrl: "/placeholder.svg",
      ambitionScore: 85
    },
    content: "Just launched my first AI project! After 3 months of hard work, I've built an ML model that predicts customer churn with 92% accuracy. Looking for feedback from anyone in the ML space! #MachineLearning #AI #StudentProject",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    createdAt: "2h ago",
    likes: 24,
    comments: 5,
    tags: ["AI", "MachineLearning", "Project"],
    isLiked: false
  },
  {
    id: "3",
    author: {
      id: "user1",
      name: "Sarah Chen",
      username: "sarahc",
      avatarUrl: "/placeholder.svg",
      ambitionScore: 85
    },
    content: "Excited to share that my research paper on 'Neural Networks for Predicting Patient Outcomes' has been accepted at the upcoming AI in Healthcare Conference! #Achievement #Research #AI",
    createdAt: "3d ago",
    likes: 54,
    comments: 12,
    tags: ["Research", "Achievement", "AIinHealthcare"],
    isLiked: true
  }
];

const startupPosts: Post[] = [
  {
    id: "2",
    author: {
      id: "startup1",
      name: "EcoTech Solutions",
      username: "ecotech",
      isStartup: true
    },
    content: "We're excited to announce our seed funding round of $500K! 🚀 Thanks to all our supporters and mentors who believed in our mission to make renewable energy more accessible to everyone.\n\nWe're now looking to expand our team with passionate individuals. Check out our open roles in engineering and marketing!",
    createdAt: "5h ago",
    likes: 76,
    comments: 12,
    tags: ["Funding", "CleanTech", "Hiring"],
    isLiked: true
  },
  {
    id: "4",
    author: {
      id: "startup1",
      name: "EcoTech Solutions",
      username: "ecotech",
      isStartup: true
    },
    content: "Our team at the CleanTech Expo 2023! We had a great time showcasing our smart energy monitoring system and connecting with potential partners and customers.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    createdAt: "1w ago",
    likes: 43,
    comments: 7,
    tags: ["CleanTech", "TeamPhoto", "Expo"],
    isLiked: false
  }
];

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      // Only show the current user's posts
      setPosts(currentUser.isStartup ? startupPosts : userPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // If ID is provided, check if it matches current user
    if (id && currentUser && currentUser.id === id) {
      setProfile(currentUser);
      // Only show the current user's posts
      setPosts(currentUser.isStartup ? startupPosts : userPosts);
      setIsCurrentUser(true);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, fetch the profile based on the ID
    setTimeout(() => {
      // This is just for demo purposes - in a real app you'd fetch based on ID
      const isStartupProfile = id?.includes("startup");
      
      // Set the profile data
      setProfile(isStartupProfile ? mockStartupProfile : mockProfileData);
      
      // Only show posts made by this user/startup
      if (isStartupProfile) {
        // Only show posts made by this startup
        setPosts(startupPosts);
      } else {
        // Only show posts made by this user
        setPosts(userPosts);
      }
      
      setIsCurrentUser(false);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  // If no ID was provided and no current user exists, redirect to auth
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!id && !currentUser) {
      navigate('/');
    }
  }, [id, navigate]);
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-40 bg-muted rounded-t-lg animate-pulse"></div>
            <div className="h-60 bg-muted rounded-lg animate-pulse"></div>
          </div>
        ) : profile ? (
          <>
            <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
            
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
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Profile not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
