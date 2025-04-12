
import { LucideIcon } from "lucide-react";

interface ProfileMetadataItemProps {
  icon: LucideIcon;
  text: string;
}

const ProfileMetadataItem = ({ icon: Icon, text }: ProfileMetadataItemProps) => {
  return (
    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
      <Icon size={12} className="mr-1" />
      {text}
    </div>
  );
};

export default ProfileMetadataItem;
