
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProfileData } from "../profile/ProfileHeader";
import { toast } from "sonner";

interface StartupVettingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSubmit: (profile: ProfileData) => void;
}

const StartupVettingDialog = ({
  isOpen,
  onClose,
  profile,
  onSubmit,
}: StartupVettingDialogProps) => {
  const [answers, setAnswers] = useState({
    experience: "",
    commitment: "",
    motivation: "",
  });

  const isComplete = answers.experience && answers.commitment && answers.motivation;

  const handleSubmit = () => {
    if (isComplete) {
      // In a real app, we might send these answers to an API
      console.log("Vetting answers:", answers);
      onSubmit(profile);
      onClose();
    } else {
      toast.error("Please answer all questions before proceeding");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tell us about your interest in {profile.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="font-medium">What is your experience level in {profile.industry}?</h3>
            <RadioGroup
              value={answers.experience}
              onValueChange={(value) => setAnswers({ ...answers, experience: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="experience-beginner" />
                <Label htmlFor="experience-beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="experience-intermediate" />
                <Label htmlFor="experience-intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="experience-advanced" />
                <Label htmlFor="experience-advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">How much time can you commit weekly?</h3>
            <RadioGroup
              value={answers.commitment}
              onValueChange={(value) => setAnswers({ ...answers, commitment: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5-10" id="commitment-low" />
                <Label htmlFor="commitment-low">5-10 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10-20" id="commitment-medium" />
                <Label htmlFor="commitment-medium">10-20 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20+" id="commitment-high" />
                <Label htmlFor="commitment-high">20+ hours</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">What motivates you to join this startup?</h3>
            <RadioGroup
              value={answers.motivation}
              onValueChange={(value) => setAnswers({ ...answers, motivation: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="learning" id="motivation-learning" />
                <Label htmlFor="motivation-learning">Learning and growth</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="network" id="motivation-network" />
                <Label htmlFor="motivation-network">Building network</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="career" id="motivation-career" />
                <Label htmlFor="motivation-career">Career advancement</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isComplete}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartupVettingDialog;
