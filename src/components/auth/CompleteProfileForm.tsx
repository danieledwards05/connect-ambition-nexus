
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface PersonalProfileProps {
  onSubmit: () => void;
}

const PersonalProfileForm = ({ onSubmit }: PersonalProfileProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="college">College / University</Label>
        <Input id="college" placeholder="University of Technology" required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select defaultValue="freshman">
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freshman">Freshman</SelectItem>
              <SelectItem value="sophomore">Sophomore</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="major">Major</Label>
          <Input id="major" placeholder="Computer Science" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="skill">Main Skill</Label>
        <Select defaultValue="coding">
          <SelectTrigger>
            <SelectValue placeholder="Select Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="coding">Coding</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself, your ambitions, and what you're looking for" />
      </div>
      
      <Button onClick={onSubmit} className="w-full">Complete Profile</Button>
    </div>
  );
};

interface StartupProfileProps {
  onSubmit: () => void;
}

const StartupProfileForm = ({ onSubmit }: StartupProfileProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="startupName">Startup Name</Label>
        <Input id="startupName" placeholder="Innovate AI" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mission">Mission Statement</Label>
        <Textarea id="mission" placeholder="What is your startup's mission?" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry / Field</Label>
        <Select defaultValue="tech">
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="health">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="ecommerce">E-Commerce</SelectItem>
            <SelectItem value="ai">Artificial Intelligence</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Startup Status</Label>
        <RadioGroup defaultValue="public">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Public (Anyone can join)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">Private (Users must be vetted)</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="roles">Roles Needed</Label>
        <Textarea 
          id="roles" 
          placeholder="List the roles you're looking to fill (e.g., 'Frontend Developer', 'Marketing Lead', etc.)" 
          required 
        />
      </div>
      
      <Button onClick={onSubmit} className="w-full">Complete Profile</Button>
    </div>
  );
};

const CompleteProfileForm = () => {
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState('personal');
  
  const handleCompleteProfile = () => {
    toast.success("Profile completed successfully!");
    navigate('/feed');
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us more about {profileType === 'personal' ? 'yourself' : 'your startup'}
        </CardDescription>
        <div className="flex items-center space-x-4 pt-2">
          <Button 
            variant={profileType === 'personal' ? "default" : "outline"}
            onClick={() => setProfileType('personal')}
          >
            Personal Profile
          </Button>
          <Button 
            variant={profileType === 'startup' ? "default" : "outline"}
            onClick={() => setProfileType('startup')}
          >
            Startup Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {profileType === 'personal' ? (
          <PersonalProfileForm onSubmit={handleCompleteProfile} />
        ) : (
          <StartupProfileForm onSubmit={handleCompleteProfile} />
        )}
      </CardContent>
    </Card>
  );
};

export default CompleteProfileForm;
