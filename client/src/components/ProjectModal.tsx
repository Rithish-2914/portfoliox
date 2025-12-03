import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, ExternalLink, FileCode2, Layers, Gamepad2, Sparkles, FormInput, Check, Copy, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "Code copied!",
        description: `${language} code has been copied to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 z-10"
        onClick={handleCopy}
        data-testid={`button-copy-${language.toLowerCase()}`}
      >
        {copied ? (
          <CheckCheck className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <ScrollArea className="h-[300px] rounded-md">
        <pre className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto whitespace-pre">
          <code className="text-foreground">{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const CategoryIcon = categoryIcons[project.category] || Layers;
  const hasCode = project.htmlCode || project.cssCode || project.jsCode;

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-project-detail">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
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
          <DialogDescription className="sr-only">
            Project details for {project.name} including description, technologies, features, and source code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Description
            </h4>
            <p className="text-foreground leading-relaxed" data-testid="text-modal-description">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
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

            <div className="flex-1 min-w-[200px]">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Features
              </h4>
              <ul className="space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {hasCode && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Source Code
              </h4>
              <Tabs defaultValue={project.htmlCode ? "html" : project.cssCode ? "css" : "js"} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {project.htmlCode && (
                    <TabsTrigger value="html" data-testid="tab-html">
                      <FileCode2 className="w-4 h-4 mr-2" />
                      HTML
                    </TabsTrigger>
                  )}
                  {project.cssCode && (
                    <TabsTrigger value="css" data-testid="tab-css">
                      <Code className="w-4 h-4 mr-2" />
                      CSS
                    </TabsTrigger>
                  )}
                  {project.jsCode && (
                    <TabsTrigger value="js" data-testid="tab-js">
                      <Code className="w-4 h-4 mr-2" />
                      JavaScript
                    </TabsTrigger>
                  )}
                </TabsList>
                {project.htmlCode && (
                  <TabsContent value="html">
                    <CodeBlock code={project.htmlCode} language="HTML" />
                  </TabsContent>
                )}
                {project.cssCode && (
                  <TabsContent value="css">
                    <CodeBlock code={project.cssCode} language="CSS" />
                  </TabsContent>
                )}
                {project.jsCode && (
                  <TabsContent value="js">
                    <CodeBlock code={project.jsCode} language="JavaScript" />
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
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
