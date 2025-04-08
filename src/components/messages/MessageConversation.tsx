
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Users } from "lucide-react";

interface MessageConversationProps {
  chatId: string;
  chatType: string;
}

type Message = {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: string;
  avatar: string;
  isCurrentUser: boolean;
};

const MessageConversation = ({ chatId, chatType }: MessageConversationProps) => {
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data for development - would be fetched from API in real app
  const chatDetails = {
    id: chatId,
    name: chatType === 'startups' ? "TechNova" : "Jane Smith",
    avatar: "/placeholder.svg",
    members: chatType === 'startups' ? 5 : undefined,
  };
  
  const messages: Message[] = [
    {
      id: "msg1",
      sender: "Jane Smith",
      senderId: "user1",
      content: "Hey there! How's the project coming along?",
      timestamp: "Yesterday at 2:30 PM",
      avatar: "/placeholder.svg",
      isCurrentUser: false,
    },
    {
      id: "msg2",
      sender: "You",
      senderId: "currentUser",
      content: "It's going well! I've completed the UI design for the dashboard.",
      timestamp: "Yesterday at 2:45 PM",
      avatar: "/placeholder.svg",
      isCurrentUser: true,
    },
    {
      id: "msg3",
      sender: "Jane Smith",
      senderId: "user1",
      content: "That's great to hear! Can you share the mockups with the team?",
      timestamp: "Yesterday at 3:00 PM",
      avatar: "/placeholder.svg",
      isCurrentUser: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, would send to backend API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={chatDetails.avatar} alt={chatDetails.name} />
            <AvatarFallback>{chatDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{chatDetails.name}</h3>
            {chatDetails.members && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users size={12} />
                <span>{chatDetails.members} members</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex ${message.isCurrentUser ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[80%]`}>
              {!message.isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"} items-center gap-2`}>
                  {!message.isCurrentUser && <span className="text-sm font-medium">{message.sender}</span>}
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <div className={`mt-1 p-3 rounded-lg ${
                  message.isCurrentUser 
                    ? "bg-brand-purple text-white rounded-tr-none" 
                    : "bg-muted rounded-tl-none"
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            className="flex-1 min-h-[2.5rem] max-h-32 px-3 py-2 resize-none rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <SendHorizontal size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageConversation;
