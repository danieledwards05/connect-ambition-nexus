
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Startup {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  industry: string;
  isPublic: boolean;
}

interface SuggestedStartupsProps {
  startups: Startup[];
}

const SuggestedStartups = ({ startups }: SuggestedStartupsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Suggested Startups</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {startups.map((startup) => (
            <li key={startup.id} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={startup.avatarUrl} />
                <AvatarFallback>
                  {startup.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/profile/${startup.id}`}
                  className="font-medium text-sm hover:underline block truncate"
                >
                  {startup.name}
                </Link>
                <span className="text-xs text-muted-foreground block truncate">
                  {startup.industry} • {startup.isPublic ? "Public" : "Private"}
                </span>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="sm" className="w-full mt-3">
          See More
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedStartups;
