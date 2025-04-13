
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  appliedDate: string;
  university?: string;
  major?: string;
  status: "pending" | "accepted" | "declined";
}

interface ApplicantsListProps {
  startupName?: string;
}

const ApplicantsList = ({ startupName = "Your Startup" }: ApplicantsListProps) => {
  // Mock data for applicants - would be fetched from API in a real implementation
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "a1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      skills: ["React", "TypeScript", "UI/UX"],
      appliedDate: "2 days ago",
      university: "Stanford University",
      major: "Computer Science",
      status: "pending"
    },
    {
      id: "a2",
      name: "Samantha Chen",
      avatar: "/placeholder.svg",
      skills: ["Product Management", "Data Analysis"],
      appliedDate: "1 week ago",
      university: "MIT",
      major: "Business Analytics",
      status: "pending"
    },
    {
      id: "a3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg",
      skills: ["Flutter", "Firebase", "Mobile Development"],
      appliedDate: "3 days ago",
      university: "UC Berkeley",
      major: "Software Engineering",
      status: "pending"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applicants.length / itemsPerPage);

  const handleAccept = (applicant: Applicant) => {
    setApplicants(currentApplicants => 
      currentApplicants.map(app => 
        app.id === applicant.id 
          ? { ...app, status: "accepted" } 
          : app
      )
    );
    
    toast.success(`${applicant.name} has been accepted to join ${startupName}`);
  };

  const handleDecline = (applicant: Applicant) => {
    setApplicants(currentApplicants => 
      currentApplicants.map(app => 
        app.id === applicant.id 
          ? { ...app, status: "declined" } 
          : app
      )
    );
    
    toast.error(`${applicant.name}'s application was declined`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const paginatedApplicants = applicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pendingCount = applicants.filter(app => app.status === "pending").length;

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Applicants</span>
          {pendingCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {pendingCount} pending
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applicants.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No applicants yet
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={applicant.avatar} alt={applicant.name} />
                          <AvatarFallback>{applicant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          {applicant.university && (
                            <div className="text-xs text-muted-foreground">
                              {applicant.university}{applicant.major ? ` • ${applicant.major}` : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {applicant.appliedDate}
                    </TableCell>
                    <TableCell className="text-right">
                      {applicant.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleAccept(applicant)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check size={16} />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDecline(applicant)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <Badge 
                          variant={applicant.status === "accepted" ? "default" : "outline"}
                          className={applicant.status === "accepted" ? "bg-green-600" : "text-muted-foreground"}
                        >
                          {applicant.status === "accepted" ? "Accepted" : "Declined"}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicantsList;
