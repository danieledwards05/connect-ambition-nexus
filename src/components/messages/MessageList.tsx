
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  members?: number;
};

interface MessageListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  type: 'direct' | 'startup';
}

const MessageList = ({ chats: propChats, selectedChatId, onSelectChat, type }: MessageListProps) => {
  const [chats, setChats] = useState<Chat[]>(propChats);
  
  useEffect(() => {
    // If this is a direct message list, check localStorage for additional chats
    if (type === 'direct') {
      const storedChats = JSON.parse(localStorage.getItem('directChats') || '[]');
      
      // Merge stored chats with prop chats, avoiding duplicates
      const existingIds = new Set(propChats.map(chat => chat.id));
      const newChats = storedChats.filter((chat: Chat) => !existingIds.has(chat.id));
      
      setChats([...propChats, ...newChats]);
    } else {
      setChats(propChats);
    }
  }, [propChats, type]);
  
  if (chats.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        {type === 'direct' 
          ? "No direct messages yet" 
          : "You haven't joined any startup chats yet"}
      </div>
    );
  }

  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={cn(
            "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
            selectedChatId === chat.id && "bg-muted"
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="font-medium truncate">{chat.name}</div>
              <div className="text-xs text-muted-foreground">{chat.time}</div>
            </div>
            <div className="text-sm truncate text-muted-foreground">
              {chat.lastMessage}
            </div>
            {type === 'startup' && chat.members && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Users size={12} />
                <span>{chat.members} members</span>
              </div>
            )}
          </div>
          {chat.unread && (
            <div className="w-2 h-2 rounded-full bg-brand-purple mt-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
