
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutScoreTab from "./AboutScoreTab";
import ProjectsTab from "./ProjectsTab";
import HistoryTab from "./HistoryTab";

interface OverallTabsProps {
  projectsUploaded: number;
  projectsReviewed: number;
  onUploadProject: () => void;
}

const OverallTabs = ({ projectsUploaded, projectsReviewed, onUploadProject }: OverallTabsProps) => {
  return (
    <Tabs defaultValue="about" className="mt-8">
      <TabsList className="w-full">
        <TabsTrigger value="about" className="flex-1">About Overall Score</TabsTrigger>
        <TabsTrigger value="projects" className="flex-1">Your Projects</TabsTrigger>
        <TabsTrigger value="history" className="flex-1">Score History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-4">
        <AboutScoreTab onUploadProject={onUploadProject} />
      </TabsContent>
      
      <TabsContent value="projects" className="mt-4">
        <ProjectsTab 
          projectsUploaded={projectsUploaded} 
          projectsReviewed={projectsReviewed} 
          onUploadProject={onUploadProject} 
        />
      </TabsContent>
      
      <TabsContent value="history" className="mt-4">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default OverallTabs;
