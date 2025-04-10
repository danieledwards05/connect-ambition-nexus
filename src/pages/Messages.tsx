
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageList from "@/components/messages/MessageList";
import MessageConversation from "@/components/messages/MessageConversation";
import StartupInvitations from "@/components/messages/StartupInvitations";
import { MessageCircle, Users, BellRing } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("direct");
  
  // Get current user data from localStorage
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, []);
  
  // Mock data for development - would be fetched from API in real app
  const userChats = [
    { id: "user1", name: "Jane Smith", avatar: "/placeholder.svg", lastMessage: "Let's discuss the UI design", time: "2h ago", unread: true },
    { id: "user2", name: "Alex Johnson", avatar: "/placeholder.svg", lastMessage: "When can we meet?", time: "1d ago", unread: false },
  ];
  
  const startupChats = [
    { id: "startup1", name: "TechNova", avatar: "/placeholder.svg", lastMessage: "Meeting tomorrow at 3pm", time: "4h ago", members: 5, unread: true },
    { id: "startup2", name: "FinEdge", avatar: "/placeholder.svg", lastMessage: "We need to update the roadmap", time: "2d ago", members: 3, unread: false },
  ];

  // Mock startup invitations
  const startupInvitations = [
    { id: "startup3", name: "CodeCraft", avatar: "/placeholder.svg", time: "1d ago", description: "A modern software development studio" },
    { id: "startup4", name: "DataVision", avatar: "/placeholder.svg", time: "3d ago", description: "AI-powered data analytics platform" },
  ];

  return (
    <Layout>
      <div className="container px-4 py-6 mx-auto max-w-6xl">
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          <h1 className="text-2xl font-bold mb-4">
            {currentUser?.name ? `${currentUser.name}'s Messages` : 'Messages'}
          </h1>
          
          <Card className="flex flex-col h-full overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b px-4 py-2">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="direct" className="flex items-center gap-2">
                    <MessageCircle size={16} /> Direct Messages
                  </TabsTrigger>
                  <TabsTrigger value="startups" className="flex items-center gap-2">
                    <Users size={16} /> Startup Chats
                  </TabsTrigger>
                  <TabsTrigger value="invitations" className="flex items-center gap-2">
                    <BellRing size={16} /> Invitations
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 border-r overflow-y-auto">
                  <TabsContent value="direct" className="m-0 h-full">
                    <MessageList 
                      chats={userChats} 
                      selectedChatId={selectedChat} 
                      onSelectChat={(id) => setSelectedChat(id)}
                      type="direct"
                    />
                  </TabsContent>
                  <TabsContent value="startups" className="m-0 h-full">
                    <MessageList 
                      chats={startupChats} 
                      selectedChatId={selectedChat} 
                      onSelectChat={(id) => setSelectedChat(id)}
                      type="startup"
                    />
                  </TabsContent>
                  <TabsContent value="invitations" className="m-0 h-full">
                    <StartupInvitations 
                      invitations={startupInvitations}
                    />
                  </TabsContent>
                </div>
                
                <div className="w-2/3 flex flex-col">
                  {selectedChat && (activeTab === "direct" || activeTab === "startups") ? (
                    <MessageConversation 
                      chatId={selectedChat} 
                      chatType={activeTab}
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      {activeTab === "invitations" 
                        ? "Select a startup invitation to respond" 
                        : "Select a conversation to start messaging"}
                    </div>
                  )}
                </div>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
