import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, FileCode2, Layers, Gamepad2, Sparkles, FormInput, Check } from "lucide-react";
import type { Project, ProjectCategory } from "@shared/schema";
import { categoryLabels } from "@shared/schema";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  "all": Layers,
  "html-css": FileCode2,
  "javascript": Code,
  "animations": Sparkles,
  "games": Gamepad2,
  "forms-ui": FormInput,
};

const techBadgeColors: Record<string, string> = {
  "HTML": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "CSS": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  "Bootstrap": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const CategoryIcon = categoryIcons[project.category] || Layers;

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-project-detail">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="font-mono text-sm px-2.5 py-1"
            >
              #{String(project.id).padStart(2, "0")}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1.5"
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              {categoryLabels[project.category]}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold leading-tight" data-testid="text-modal-title">
            {project.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon className="w-24 h-24 text-muted-foreground/20" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-foreground leading-relaxed" data-testid="text-modal-description">
                {project.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className={`text-sm px-3 py-1 ${techBadgeColors[tech] || "bg-muted text-muted-foreground"}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => window.open(project.sourceCodeUrl, "_blank")}
              data-testid="button-modal-source-code"
            >
              <Code className="w-5 h-5 mr-2" />
              View Source Code
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => window.open(project.liveDemoUrl, "_blank")}
              data-testid="button-modal-live-demo"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Open Live Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
