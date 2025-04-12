
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Clock, FileText } from "lucide-react";

interface ScoreCardsProps {
  overallScore: number;
  appTime: number;
  timeContribution: number;
  projectsUploaded: number;
  projectsReviewed: number;
}

const ScoreCards = ({
  overallScore,
  appTime,
  timeContribution,
  projectsUploaded,
  projectsReviewed
}: ScoreCardsProps) => {
  return (
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
  );
};

export default ScoreCards;
