
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCoverProps {
  coverUrl?: string;
  avatarUrl?: string;
  name: string;
}

const ProfileCover = ({ coverUrl, avatarUrl, name }: ProfileCoverProps) => {
  return (
    <div 
      className="h-40 bg-gradient-to-r from-brand-blue to-brand-purple relative"
      style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute -bottom-12 left-6">
        <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} />
          <AvatarFallback className="text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileCover;
