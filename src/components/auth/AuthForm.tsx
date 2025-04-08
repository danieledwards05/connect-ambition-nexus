
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  accountType: string;
}

interface AuthFormProps {
  onComplete: (userData: any) => void;
}

const AuthForm = ({ onComplete }: AuthFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const signupForm = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      accountType: 'personal'
    }
  });
  
  const handleLogin = (data: LoginFormData) => {
    setIsLoading(true);
    
    // Try to get saved user data
    const savedUser = localStorage.getItem('currentUser');
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        toast.success("Successfully logged in!");
        // Set the current user
        localStorage.setItem('currentUser', JSON.stringify(userData));
        navigate('/feed');
      } else {
        // For demo purposes, we'll go through profile creation
        toast.success("First time login detected. Let's set up your profile!");
        onComplete({
          email: data.email,
          accountType: 'personal'
        });
      }
    }, 1000);
  };
  
  const handleSignup = (data: SignupFormData) => {
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      
      // Pass user data to parent component
      onComplete({
        username: data.username,
        email: data.email,
        accountType: data.accountType
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <CardHeader>
                <CardTitle>Login to AmbitionNexus</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@example.com" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="signup">
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignup)}>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Join AmbitionNexus to connect with startups and talented students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="username" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@example.com" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          defaultValue={field.value} 
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="personal" id="personal" />
                            <Label htmlFor="personal">Personal (Student)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="startup" id="startup" />
                            <Label htmlFor="startup">Startup / Business</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
