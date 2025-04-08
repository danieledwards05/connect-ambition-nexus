
import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  type: "all" | "people" | "startups";
  industry?: string;
  skill?: string;
  minAmbitionScore: number;
  isPublicOnly: boolean;
  roles: string[];
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    type: "all",
    minAmbitionScore: 0,
    isPublicOnly: false,
    roles: []
  });
  
  const [currentRole, setCurrentRole] = useState("");
  
  const handleFilterChange = <K extends keyof SearchFilters>(
    key: K, 
    value: SearchFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleAddRole = () => {
    if (currentRole.trim() !== "" && !filters.roles.includes(currentRole.trim())) {
      const newRoles = [...filters.roles, currentRole.trim()];
      handleFilterChange("roles", newRoles);
      setCurrentRole("");
    }
  };
  
  const handleRemoveRole = (role: string) => {
    const newRoles = filters.roles.filter(r => r !== role);
    handleFilterChange("roles", newRoles);
  };
  
  const handleRoleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRole();
    }
  };
  
  const clearFilters = () => {
    const resetFilters: SearchFilters = {
      type: "all",
      minAmbitionScore: 0,
      isPublicOnly: false,
      roles: []
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="type">Search Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value as SearchFilters["type"])}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="people">People</SelectItem>
              <SelectItem value="startups">Startups</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(filters.type === "all" || filters.type === "startups") && (
          <div className="space-y-1.5">
            <Label htmlFor="industry">Industry</Label>
            <Select
              value={filters.industry || ""}
              onValueChange={(value) => handleFilterChange("industry", value || undefined)}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="">Any Industry</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {(filters.type === "all" || filters.type === "people") && (
          <div className="space-y-1.5">
            <Label htmlFor="skill">Main Skill</Label>
            <Select
              value={filters.skill || ""}
              onValueChange={(value) => handleFilterChange("skill", value || undefined)}
            >
              <SelectTrigger id="skill">
                <SelectValue placeholder="Select Skill" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="">Any Skill</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {(filters.type === "all" || filters.type === "people") && (
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label htmlFor="ambition-score">Minimum Ambition Score: {filters.minAmbitionScore}</Label>
            </div>
            <Slider
              id="ambition-score"
              max={100}
              step={5}
              value={[filters.minAmbitionScore]}
              onValueChange={(value) => handleFilterChange("minAmbitionScore", value[0])}
              className="py-4"
            />
          </div>
        )}
        
        {(filters.type === "all" || filters.type === "startups") && (
          <div className="flex items-center space-x-2">
            <Switch
              id="public-only"
              checked={filters.isPublicOnly}
              onCheckedChange={(checked) => handleFilterChange("isPublicOnly", checked)}
            />
            <Label htmlFor="public-only">Public Startups Only</Label>
          </div>
        )}
        
        {(filters.type === "all" || filters.type === "startups") && (
          <div className="space-y-1.5">
            <Label htmlFor="roles">Roles Needed</Label>
            <div className="flex">
              <Input
                id="roles"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="Add role (e.g. Developer)"
                onKeyDown={handleRoleKeyDown}
                className="rounded-r-none"
              />
              <Button 
                onClick={handleAddRole} 
                type="button"
                variant="secondary"
                className="rounded-l-none"
              >
                Add
              </Button>
            </div>
            {filters.roles.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.roles.map(role => (
                  <Badge key={role} variant="outline" className="flex items-center gap-1">
                    {role}
                    <button 
                      onClick={() => handleRemoveRole(role)}
                      className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-background/80"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
