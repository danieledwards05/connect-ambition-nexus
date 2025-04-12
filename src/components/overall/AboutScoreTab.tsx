
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface AboutScoreTabProps {
  onUploadProject: () => void;
}

const AboutScoreTab = ({ onUploadProject }: AboutScoreTabProps) => {
  return (
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
          <Button onClick={onUploadProject} className="flex items-center gap-2">
            <Upload size={16} />
            Upload a Project for Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutScoreTab;
