
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Home, Search, MessageCircle, Bell, PlusSquare, UserCircle, 
  LogOut, Menu, X, Briefcase, Award
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navigationItems = [
    { 
      icon: Home, 
      label: "Feed", 
      path: "/feed" 
    },
    { 
      icon: Search, 
      label: "Search", 
      path: "/search" 
    },
    { 
      icon: PlusSquare, 
      label: "Create Post", 
      path: "/create" 
    },
    { 
      icon: MessageCircle, 
      label: "Messages", 
      path: "/messages",
      notifications: 3
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      path: "/notifications",
      notifications: 5
    },
    { 
      icon: Briefcase, 
      label: "Startups", 
      path: "/startups" 
    },
    { 
      icon: UserCircle, 
      label: "Profile", 
      path: "/profile" 
    },
  ];
  
  return (
    <div className={`
      h-screen fixed top-0 left-0 z-40 transition-all duration-300
      ${collapsed ? "w-16" : "w-64"} bg-background border-r
    `}>
      <div className="flex flex-col h-full px-2 py-4">
        <div className="flex items-center justify-between mb-6 px-2">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Award size={28} className="text-brand-purple" />
              <span className="font-bold text-lg">AmbitionNexus</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          {navigationItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={collapsed ? 300 : 10000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={`w-full justify-start relative ${collapsed ? "px-2" : "px-4"}`}
                    >
                      <item.icon className={collapsed ? "mx-auto" : "mr-2"} size={20} />
                      {!collapsed && <span>{item.label}</span>}
                      {item.notifications && !collapsed && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.notifications}
                        </span>
                      )}
                      {item.notifications && collapsed && (
                        <span className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {item.notifications}
                        </span>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <div className="mt-auto">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">John Doe</span>
                <span className="text-xs text-muted-foreground">@johndoe</span>
              </div>
            </div>
          )}
          
          <TooltipProvider delayDuration={collapsed ? 300 : 10000}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${collapsed ? "px-2" : "px-4"}`}
                  >
                    <LogOut className={collapsed ? "mx-auto" : "mr-2"} size={20} />
                    {!collapsed && <span>Log Out</span>}
                  </Button>
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Log Out</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
