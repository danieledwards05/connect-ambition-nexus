
import { useState } from "react";
import { Award } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import CompleteProfileForm from "@/components/auth/CompleteProfileForm";

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-brand-blue to-brand-purple py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Award size={32} className="text-white" />
            <span className="text-white text-xl font-bold ml-2">AmbitionNexus</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-brand-blue to-brand-purple p-8 flex flex-col justify-center items-center text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-6">Connect with Ambitious Startups and Talent</h1>
            <p className="text-lg mb-6">
              AmbitionNexus is where college students with skills meet startups that need them.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-2">For Students</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Showcase your skills</li>
                  <li>• Increase your Ambition Score</li>
                  <li>• Join exciting startups</li>
                  <li>• Build your portfolio</li>
                </ul>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-2">For Startups</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Find talented students</li>
                  <li>• Recruit based on skills</li>
                  <li>• Build your team</li>
                  <li>• Share your progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {isAuthenticated ? (
              <CompleteProfileForm />
            ) : (
              <AuthForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
