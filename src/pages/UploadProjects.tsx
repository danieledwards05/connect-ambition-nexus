
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Award, Plus } from "lucide-react";
import { toast } from "sonner";

const UploadProjects = () => {
  const [uploading, setUploading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast.success("Project uploaded successfully! Your Overall Score will be updated after review.");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Upload className="text-brand-purple" />
          Upload Projects
        </h1>
        
        <div className="mb-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How Project Reviews Work</CardTitle>
              <CardDescription>
                Upload your projects to increase your Overall Score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Projects you upload will be reviewed by the AmbitionNexus community. 
                Well-documented and impressive projects will contribute positively to your Overall Score.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <FileText size={24} className="mb-2" />
                  <h3 className="font-medium mb-1">Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your best work and projects
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <FileText size={24} className="mb-2" />
                  <h3 className="font-medium mb-1">Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Community members provide feedback
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <Award size={24} className="mb-2" />
                  <h3 className="font-medium mb-1">Earn</h3>
                  <p className="text-sm text-muted-foreground">
                    Gain points for your Overall Score
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Upload a New Project</CardTitle>
                <CardDescription>
                  Share your work with the community for review
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Enter your project title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project, its purpose, and technologies used" 
                    className="min-h-32"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Project Category</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business Plan</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Project Files</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      You can upload multiple files (PDF, images, ZIP, code files)
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link (Optional)</Label>
                  <Input id="link" placeholder="https://github.com/yourusername/project" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Add a link to GitHub, portfolio, or demo if available
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? "Uploading..." : "Submit Project for Review"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UploadProjects;
