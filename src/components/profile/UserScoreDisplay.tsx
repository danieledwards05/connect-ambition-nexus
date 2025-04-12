
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserScoreDisplayProps {
  score: number;
  showBadgeOnly?: boolean;
}

const UserScoreDisplay = ({ score, showBadgeOnly = false }: UserScoreDisplayProps) => {
  return (
    <>
      <div className="flex items-center gap-1 bg-brand-lightPurple text-brand-darkPurple py-1 px-2 rounded-md">
        <Award size={14} className="text-brand-purple" />
        <span className="font-semibold">{score}</span>
        <span className="text-xs">/100</span>
      </div>
      
      {!showBadgeOnly && (
        <div className="mt-2 max-w-xs">
          <div className="flex items-center justify-between mb-1 text-sm">
            <span>Overall Score</span>
            <span className="font-semibold">{score}/100</span>
          </div>
          <Progress value={score} className="h-1.5" />
        </div>
      )}
    </>
  );
};

export default UserScoreDisplay;
