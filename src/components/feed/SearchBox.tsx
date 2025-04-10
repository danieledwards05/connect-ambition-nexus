
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search people or startups..."
            className="pl-8"
          />
        </div>
        <Button asChild className="w-full mt-2">
          <Link to="/search">Advanced Search</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
