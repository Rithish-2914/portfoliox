import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, ExternalLink, FileCode2, Layers, Gamepad2, Sparkles, FormInput } from "lucide-react";
import type { Project, ProjectCategory } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  "all": Layers,
  "html-css": FileCode2,
  "javascript": Code,
  "animations": Sparkles,
  "games": Gamepad2,
  "forms-ui": FormInput,
};

const categoryColors: Record<ProjectCategory, string> = {
  "all": "bg-muted text-muted-foreground",
  "html-css": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "javascript": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "animations": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "games": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "forms-ui": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const techBadgeColors: Record<string, string> = {
  "HTML": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "CSS": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "JavaScript": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Bootstrap": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category] || Layers;

  return (
    <Card
      className="group relative overflow-visible hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
      onClick={() => onViewDetails(project)}
      data-testid={`card-project-${project.id}`}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/50 to-muted overflow-hidden rounded-t-md">
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryIcon className="w-16 h-16 text-muted-foreground/30" />
          </div>
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="font-mono text-xs px-2 py-0.5 bg-background/90 backdrop-blur-sm"
              data-testid={`badge-project-number-${project.id}`}
            >
              #{String(project.id).padStart(2, "0")}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-background/90 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(project);
              }}
              data-testid={`button-source-code-${project.id}`}
            >
              <Code className="w-4 h-4 mr-1" />
              View Code
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveDemoUrl, "_blank");
              }}
              data-testid={`button-live-demo-${project.id}`}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Demo
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
              {project.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`text-xs px-2 py-0 ${techBadgeColors[tech] || "bg-muted text-muted-foreground"}`}
                data-testid={`badge-tech-${project.id}-${tech.toLowerCase()}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
