
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsTabProps {
  projectsUploaded: number;
  projectsReviewed: number;
  onUploadProject: () => void;
}

const ProjectsTab = ({ projectsUploaded, projectsReviewed, onUploadProject }: ProjectsTabProps) => {
  return (
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
            <Button onClick={onUploadProject}>Upload Your First Project</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsTab;
