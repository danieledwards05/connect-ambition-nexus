
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface StartupInvitation {
  id: string;
  name: string;
  avatar: string;
  time: string;
  description: string;
}

interface StartupInvitationsProps {
  invitations: StartupInvitation[];
}

const StartupInvitations = ({ invitations }: StartupInvitationsProps) => {
  const [pendingInvitations, setPendingInvitations] = useState<StartupInvitation[]>(invitations);

  const handleAcceptInvitation = (invitation: StartupInvitation) => {
    // In a real implementation, this would call an API to accept the invitation
    setPendingInvitations(currentInvitations => 
      currentInvitations.filter(inv => inv.id !== invitation.id)
    );
    
    toast({
      title: "Invitation Accepted",
      description: `You've joined ${invitation.name}!`,
    });
    
    // Would save to localStorage or backend in a real implementation
    console.log(`Accepted invitation from ${invitation.name}`);
  };

  const handleDeclineInvitation = (invitation: StartupInvitation) => {
    // In a real implementation, this would call an API to decline the invitation
    setPendingInvitations(currentInvitations => 
      currentInvitations.filter(inv => inv.id !== invitation.id)
    );
    
    toast({
      title: "Invitation Declined",
      description: `You've declined the invitation from ${invitation.name}.`,
    });
    
    // Would save to localStorage or backend in a real implementation
    console.log(`Declined invitation from ${invitation.name}`);
  };

  if (pendingInvitations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No pending startup invitations
      </div>
    );
  }

  return (
    <div className="divide-y">
      {pendingInvitations.map((invitation) => (
        <div
          key={invitation.id}
          className="p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={invitation.avatar} alt={invitation.name} />
              <AvatarFallback>{invitation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{invitation.name}</div>
                <div className="text-xs text-muted-foreground">{invitation.time}</div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                {invitation.description}
              </p>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={() => handleAcceptInvitation(invitation)}
                >
                  <Check size={16} />
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1"
                  onClick={() => handleDeclineInvitation(invitation)}
                >
                  <X size={16} />
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StartupInvitations;
