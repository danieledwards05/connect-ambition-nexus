
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Clock, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Overall = () => {
  const [overallScore, setOverallScore] = useState(75);
  const [appTime, setAppTime] = useState(0); // Start with 0 hours
  const [projectsUploaded, setProjectsUploaded] = useState(0);
  const [projectsReviewed, setProjectsReviewed] = useState(0);
  
  // Calculate time contribution to overall score
  const timeContribution = Math.floor(appTime / 10);
  
  // Load user data from localStorage to get their ambition score
  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser.ambitionScore) {
        setOverallScore(currentUser.ambitionScore);
      } else {
        // If the user doesn't have an ambition score yet, set it in localStorage
        const updatedUser = {
          ...currentUser,
          ambitionScore: overallScore
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  }, []);
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Award size={18} />
                Overall Score
              </CardTitle>
              <CardDescription>Your current ambition rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-brand-purple">{overallScore}/100</div>
              <Progress value={overallScore} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock size={18} />
                Time on Platform
              </CardTitle>
              <CardDescription>1 point per 10 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{appTime} hours</div>
              <div className="text-sm text-muted-foreground mt-1">
                Contributing {timeContribution} points to your score
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText size={18} />
                Projects & Documents
              </CardTitle>
              <CardDescription>Reviewed content score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{projectsUploaded} uploaded</div>
              <div className="text-sm text-muted-foreground mt-1">
                {projectsReviewed} reviewed by peers
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="about" className="mt-8">
          <TabsList className="w-full">
            <TabsTrigger value="about" className="flex-1">About Overall Score</TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">Your Projects</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">Score History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>How Overall Score Works</CardTitle>
                <CardDescription>Understanding your ambition rating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Your Overall Score represents your ambition and activity level on AmbitionNexus. The score is calculated based on several factors:</p>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Platform Time:</strong> You earn 1 point for every 10 hours spent actively using the platform.</li>
                  <li><strong>Project Reviews:</strong> Upload your projects and documents to be reviewed by peers. Each positive review contributes to your score.</li>
                  <li><strong>Community Engagement:</strong> Participating in discussions and helping others improves your score.</li>
                  <li><strong>Startup Involvement:</strong> Being part of startups or founding your own adds to your ambition rating.</li>
                </ul>
                
                <div className="flex justify-center mt-6">
                  <Button onClick={handleUploadProject} className="flex items-center gap-2">
                    <Upload size={16} />
                    Upload a Project for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Uploaded Projects</CardTitle>
                <CardDescription>Projects and documents you've submitted for review</CardDescription>
              </CardHeader>
              <CardContent>
                {projectsUploaded > 0 ? (
                  <div className="space-y-4">
                    {[...Array(projectsUploaded)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Project {i + 1}</h3>
                          <p className="text-sm text-muted-foreground">
                            Uploaded {i === 0 ? "2 days ago" : i === 1 ? "1 week ago" : "3 weeks ago"}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{i < projectsReviewed ? "Reviewed" : "Pending Review"}</div>
                          {i < projectsReviewed && (
                            <div className="text-sm text-green-600">+5 points</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">You haven't uploaded any projects yet</p>
                    <Button onClick={handleUploadProject}>Upload Your First Project</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Score History</CardTitle>
                <CardDescription>See how your Overall Score has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Score history chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Overall;
