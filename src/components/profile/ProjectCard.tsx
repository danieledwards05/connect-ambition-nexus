
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Folder } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="mb-4 overflow-hidden">
      {project.image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={project.image} 
            alt={project.title}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Added {project.date}
            </CardDescription>
          </div>
          {!project.image && <Folder size={24} className="text-muted-foreground" />}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-2">
        {project.link && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink size={14} />
              <span>View</span>
            </a>
          </Button>
        )}
        
        {project.githubLink && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
