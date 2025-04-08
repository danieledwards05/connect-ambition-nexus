
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import SearchFilters, { SearchFilters as Filters } from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { ProfileData } from "@/components/profile/ProfileHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

// Mock search results - would be fetched from API in a real application
const mockSearchResults: ProfileData[] = [
  {
    id: "user1",
    name: "Sarah Chen",
    username: "sarahc",
    avatarUrl: "/placeholder.svg",
    bio: "Computer Science student passionate about AI and machine learning.",
    isStartup: false,
    joinDate: "May 2023",
    followers: 248,
    following: 156,
    ambitionScore: 85,
    college: "Boston University",
    major: "Computer Science",
    mainSkill: "Machine Learning"
  },
  {
    id: "startup1",
    name: "EcoTech Solutions",
    username: "ecotech",
    avatarUrl: "/placeholder.svg",
    bio: "",
    mission: "Developing innovative solutions to make renewable energy more accessible to everyone.",
    isStartup: true,
    joinDate: "January 2022",
    followers: 1203,
    following: 89,
    industry: "CleanTech",
    isPublic: false,
    rolesNeeded: ["Full-Stack Developer", "IoT Engineer", "Marketing Specialist"]
  },
  {
    id: "user2",
    name: "Carlos Rodriguez",
    username: "carlosr",
    avatarUrl: "/placeholder.svg",
    bio: "Software engineering student specializing in cloud architecture and DevOps.",
    isStartup: false,
    joinDate: "August 2023",
    followers: 156,
    following: 203,
    ambitionScore: 72,
    college: "Stanford University",
    major: "Software Engineering",
    mainSkill: "Cloud Architecture"
  },
  {
    id: "startup2",
    name: "HealthSync",
    username: "healthsync",
    avatarUrl: "/placeholder.svg",
    bio: "",
    mission: "Revolutionizing how patients manage their healthcare appointments and records.",
    isStartup: true,
    joinDate: "March 2022",
    followers: 985,
    following: 124,
    industry: "Healthcare",
    isPublic: true,
    rolesNeeded: ["Mobile Developer", "UI/UX Designer", "Health Data Specialist"]
  },
  {
    id: "user3",
    name: "Mia Johnson",
    username: "miaj",
    avatarUrl: "/placeholder.svg",
    bio: "Marketing student with a passion for digital branding and content creation.",
    isStartup: false,
    joinDate: "October 2023",
    followers: 183,
    following: 217,
    ambitionScore: 68,
    college: "NYU",
    major: "Marketing",
    mainSkill: "Digital Marketing"
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    minAmbitionScore: 0,
    isPublicOnly: false,
    roles: []
  });
  const [results, setResults] = useState<ProfileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Filter the mock results based on search term and filters
      // This is just for demo purposes - in a real app this would be done by the backend
      let filtered = [...mockSearchResults];
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(profile => 
          profile.name.toLowerCase().includes(term) || 
          profile.username.toLowerCase().includes(term) ||
          (profile.bio && profile.bio.toLowerCase().includes(term)) ||
          (profile.mission && profile.mission.toLowerCase().includes(term))
        );
      }
      
      if (filters.type !== "all") {
        filtered = filtered.filter(profile => 
          (filters.type === "people" && !profile.isStartup) ||
          (filters.type === "startups" && profile.isStartup)
        );
      }
      
      if (filters.industry) {
        filtered = filtered.filter(profile => 
          profile.isStartup && profile.industry === filters.industry
        );
      }
      
      if (filters.skill) {
        filtered = filtered.filter(profile => 
          !profile.isStartup && profile.mainSkill === filters.skill
        );
      }
      
      if (filters.minAmbitionScore > 0) {
        filtered = filtered.filter(profile => 
          !profile.isStartup && 
          (profile.ambitionScore || 0) >= filters.minAmbitionScore
        );
      }
      
      if (filters.isPublicOnly) {
        filtered = filtered.filter(profile => 
          !profile.isStartup || (profile.isStartup && profile.isPublic)
        );
      }
      
      if (filters.roles.length > 0) {
        filtered = filtered.filter(profile => 
          profile.isStartup && profile.rolesNeeded && 
          filters.roles.some(role => 
            profile.rolesNeeded?.some(r => 
              r.toLowerCase().includes(role.toLowerCase())
            )
          )
        );
      }
      
      setResults(filtered);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    // Initial search on component mount
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 pl-16 md:pl-64 pt-4">
        <div className="container max-w-6xl mx-auto px-4 pb-8">
          <h1 className="text-2xl font-bold mb-6">Search</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for people or startups..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <SearchFilters onFilterChange={handleFilterChange} />
            </div>
            
            <div className="md:col-span-3">
              <SearchResults 
                results={results} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
