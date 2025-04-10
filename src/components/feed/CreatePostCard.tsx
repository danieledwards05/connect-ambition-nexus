
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "lucide-react";

const CreatePostCard = () => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link to="/create">
              <Input 
                placeholder="Share an update or achievement..." 
                className="bg-muted/50 cursor-pointer"
                readOnly
              />
            </Link>
          </div>
        </div>
        <div className="flex mt-4 justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/create" className="flex items-center gap-1">
              <Image size={18} />
              <span>Media</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/create">Create Post</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;
