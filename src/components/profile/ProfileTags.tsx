
import { Badge } from "@/components/ui/badge";

interface ProfileTagsProps {
  tags: string[];
}

const ProfileTags = ({ tags }: ProfileTagsProps) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProfileTags;
