
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatDetails, setChatDetails] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // Load chat details and messages for this conversation
    if (chatType === 'direct') {
      const directChats = JSON.parse(localStorage.getItem('directChats') || '[]');
      const chatData = directChats.find((chat: any) => chat.id === chatId);
      
      if (chatData) {
        setChatDetails(chatData);
        
        // Load or initialize messages for this chat
        const chatMessages = JSON.parse(localStorage.getItem(`messages_${chatId}`) || '[]');
        setMessages(chatMessages);
      } else {
        // If we don't have details (unlikely but possible), initialize with defaults
        setChatDetails({
          id: chatId,
          name: "User",
          avatar: "/placeholder.svg",
        });
        setMessages([]);
      }
    } else if (chatType === 'startups') {
      // For startup chats, use the mock data for now
      setChatDetails({
        id: chatId,
        name: chatId === "startup1" ? "TechNova" : "FinEdge",
        avatar: "/placeholder.svg",
        members: chatId === "startup1" ? 5 : 3,
      });
      
      // Initialize with mock messages
      setMessages([
        {
          id: "msg1",
          sender: chatId === "startup1" ? "TechNova Admin" : "FinEdge Admin",
          senderId: "admin",
          content: "Welcome to the team chat!",
          timestamp: "Yesterday at 2:30 PM",
          avatar: "/placeholder.svg",
          isCurrentUser: false,
        }
      ]);
    }
  }, [chatId, chatType]);
  
  const formatTimestamp = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: Message = {
        id: `msg_${Date.now()}`,
        sender: currentUser.name || "You",
        senderId: currentUser.id || "currentUser",
        content: newMessage.trim(),
        timestamp: formatTimestamp(),
        avatar: currentUser.avatarUrl || "/placeholder.svg",
        isCurrentUser: true,
      };
      
      const updatedMessages = [...messages, newMessageObj];
      setMessages(updatedMessages);
      
      // Update localStorage for persistence
      if (chatType === 'direct') {
        localStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
        
        // Update last message in chats list
        const directChats = JSON.parse(localStorage.getItem('directChats') || '[]');
        const updatedChats = directChats.map((chat: any) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              lastMessage: newMessage.trim(),
              time: 'Just now'
            };
          }
          return chat;
        });
        
        localStorage.setItem('directChats', JSON.stringify(updatedChats));
      }
      
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatDetails) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">Loading conversation...</div>;
  }

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
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message) => (
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
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            className="flex-1 min-h-[2.5rem] max-h-32 px-3 py-2 resize-none"
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
