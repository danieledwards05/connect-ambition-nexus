
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Award } from "lucide-react";
import { toast } from "sonner";
import ScoreCards from "@/components/overall/ScoreCards";
import OverallTabs from "@/components/overall/OverallTabs";

const Overall = () => {
  const [overallScore, setOverallScore] = useState(0);
  const [appTime, setAppTime] = useState(0); 
  const [projectsUploaded, setProjectsUploaded] = useState(0);
  const [projectsReviewed, setProjectsReviewed] = useState(0);
  
  // Calculate time contribution to overall score
  const timeContribution = Math.floor(appTime / 10);
  
  // Load user data from localStorage and simulate app time
  useEffect(() => {
    // Get the current user profile from localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    let currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    
    // Get or initialize app time from localStorage
    const savedAppTime = localStorage.getItem('appTime');
    const initialAppTime = savedAppTime ? parseInt(savedAppTime) : 0;
    setAppTime(initialAppTime);
    
    // Simulate time spent on app - increment every 30 seconds for demo purposes
    const interval = setInterval(() => {
      // Increment app time (simulating 1 hour per 30 seconds for demo)
      const newAppTime = initialAppTime + 1;
      setAppTime(newAppTime);
      localStorage.setItem('appTime', newAppTime.toString());
      
      // Calculate new score with time contribution
      const timePoints = Math.floor(newAppTime / 10);
      
      // If user exists, update their ambition score
      if (currentUser) {
        // Get the base score without time contribution
        const baseScore = currentUser.baseAmbitionScore || (currentUser.ambitionScore ? (currentUser.ambitionScore - timeContribution) : 75 - timeContribution);
        
        // Calculate new overall score with time contribution
        const newScore = Math.min(baseScore + timePoints, 100);
        setOverallScore(newScore);
        
        // Update user in localStorage with the new score
        currentUser = {
          ...currentUser,
          ambitionScore: newScore,
          baseAmbitionScore: baseScore
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update any posts by this user with the new ambition score
        updateUserPostsWithNewScore(currentUser.id, newScore);
      }
    }, 30000); // 30 seconds for demo purposes
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to update the user's ambition score in all their posts
  const updateUserPostsWithNewScore = (userId, newScore) => {
    const postsJson = localStorage.getItem('posts');
    if (postsJson) {
      const posts = JSON.parse(postsJson);
      let updated = false;
      
      // Update ambition score in all posts by this user
      Object.keys(posts).forEach(postId => {
        const post = posts[postId];
        if (post.author.id === userId && !post.author.isStartup) {
          post.author.ambitionScore = newScore;
          updated = true;
        }
      });
      
      // Save back to localStorage if any posts were updated
      if (updated) {
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    }
  };
  
  // Mock function to handle project upload
  const handleUploadProject = () => {
    toast.success("Project upload page opened");
    // In a real app, we would navigate to the upload page
  };
  
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Award className="text-brand-purple" />
          Overall Score
        </h1>
        
        <ScoreCards 
          overallScore={overallScore}
          appTime={appTime}
          timeContribution={timeContribution}
          projectsUploaded={projectsUploaded}
          projectsReviewed={projectsReviewed}
        />
        
        <OverallTabs 
          projectsUploaded={projectsUploaded}
          projectsReviewed={projectsReviewed}
          onUploadProject={handleUploadProject}
        />
      </div>
    </Layout>
  );
};

export default Overall;
