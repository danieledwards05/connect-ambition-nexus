
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Define form data types
interface PersonalProfileFormData {
  firstName: string;
  lastName: string;
  college: string;
  year: string;
  major: string;
  mainSkill: string;
  bio: string;
}

interface StartupProfileFormData {
  startupName: string;
  mission: string;
  industry: string;
  status: string;
  roles: string;
}

interface PersonalProfileProps {
  onSubmit: (data: PersonalProfileFormData) => void;
}

const PersonalProfileForm = ({ onSubmit }: PersonalProfileProps) => {
  const form = useForm<PersonalProfileFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      college: '',
      year: 'freshman',
      major: '',
      mainSkill: 'coding',
      bio: ''
    }
  });

  const handleSubmit = (data: PersonalProfileFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" required />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe" required />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>College / University</FormLabel>
              <FormControl>
                <Input {...field} placeholder="University of Technology" required />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Year</FormLabel>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Computer Science" required />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="mainSkill"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Main Skill</FormLabel>
              <Select 
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Skill" />
                  </SelectTrigger>
                </FormControl>
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
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about yourself, your ambitions, and what you're looking for" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Complete Profile</Button>
      </form>
    </Form>
  );
};

interface StartupProfileProps {
  onSubmit: (data: StartupProfileFormData) => void;
}

const StartupProfileForm = ({ onSubmit }: StartupProfileProps) => {
  const form = useForm<StartupProfileFormData>({
    defaultValues: {
      startupName: '',
      mission: '',
      industry: 'tech',
      status: 'public',
      roles: ''
    }
  });

  const handleSubmit = (data: StartupProfileFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="startupName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Startup Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Innovate AI" required />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Mission Statement</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="What is your startup's mission?" required />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Industry / Field</FormLabel>
              <Select 
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                </FormControl>
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
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Startup Status</FormLabel>
              <FormControl>
                <RadioGroup 
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public (Anyone can join)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private (Users must be vetted)</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Roles Needed</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List the roles you're looking to fill (e.g., 'Frontend Developer', 'Marketing Lead', etc.)" 
                  required 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Complete Profile</Button>
      </form>
    </Form>
  );
};

const CompleteProfileForm = ({ userData, onComplete }) => {
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState(userData?.accountType || 'personal');
  
  // Function to save user to registered users
  const saveUserToRegisteredUsers = (profileData) => {
    // Get existing registered users or initialize empty array
    const existingUsersJson = localStorage.getItem('registeredUsers');
    const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    
    // Check if user with this email already exists
    const userExists = existingUsers.some(user => user.email === profileData.email);
    
    if (!userExists) {
      // Add new user to the array
      existingUsers.push(profileData);
      // Save updated array back to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    }
  };
  
  const handleCompletePersonalProfile = (data: PersonalProfileFormData) => {
    // Create the user profile data
    const profileData = {
      ...userData,
      id: `user-${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`,
      username: userData.username || `${data.firstName.toLowerCase()}${data.lastName.toLowerCase()[0]}`,
      avatarUrl: "/placeholder.svg",
      bio: data.bio,
      isStartup: false,
      location: "",
      email: userData.email,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      followers: 0,
      following: 0,
      ambitionScore: 0,
      college: data.college,
      major: data.major,
      year: data.year,
      mainSkill: data.mainSkill,
      tags: [data.mainSkill, data.major]
    };
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(profileData));
    
    // Save to registeredUsers
    saveUserToRegisteredUsers(profileData);
    
    toast.success("Profile completed successfully!");
    if (onComplete) onComplete(profileData);
    navigate('/feed');
  };
  
  const handleCompleteStartupProfile = (data: StartupProfileFormData) => {
    // Create the startup profile data
    const rolesArray = data.roles
      .split(',')
      .map(role => role.trim())
      .filter(role => role.length > 0);
    
    const profileData = {
      ...userData,
      id: `startup-${Date.now()}`,
      name: data.startupName,
      username: userData.username || data.startupName.toLowerCase().replace(/\s+/g, ''),
      avatarUrl: "/placeholder.svg",
      isStartup: true,
      mission: data.mission,
      location: "",
      email: userData.email,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      followers: 0,
      following: 0,
      ambitionScore: 0,
      industry: data.industry,
      isPublic: data.status === 'public',
      rolesNeeded: rolesArray,
      tags: [data.industry]
    };
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(profileData));
    
    // Save to registeredUsers
    saveUserToRegisteredUsers(profileData);
    
    toast.success("Profile completed successfully!");
    if (onComplete) onComplete(profileData);
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
          <PersonalProfileForm onSubmit={handleCompletePersonalProfile} />
        ) : (
          <StartupProfileForm onSubmit={handleCompleteStartupProfile} />
        )}
      </CardContent>
    </Card>
  );
};

export default CompleteProfileForm;
