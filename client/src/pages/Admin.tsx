import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save, FileCode2, Code, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Admin() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  const updateCodeMutation = useMutation({
    mutationFn: async ({ id, htmlCode, cssCode, jsCode }: { id: number; htmlCode?: string | null; cssCode?: string | null; jsCode?: string | null }) => {
      const response = await fetch(`/api/projects/${id}/code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlCode, cssCode, jsCode }),
      });
      if (!response.ok) throw new Error("Failed to update project code");
      return response.json();
    },
    onSuccess: (updatedProject: Project) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setSelectedProject(updatedProject);
      toast({
        title: "Code saved!",
        description: `${updatedProject.name} code has been updated successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Failed to save",
        description: "Could not save the project code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setHtmlCode(project.htmlCode || "");
    setCssCode(project.cssCode || "");
    setJsCode(project.jsCode || "");
  };

  const handleSave = () => {
    if (!selectedProject) return;
    updateCodeMutation.mutate({
      id: selectedProject.id,
      htmlCode: htmlCode || null,
      cssCode: cssCode || null,
      jsCode: jsCode || null,
    });
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrevProject = () => {
    if (currentIndex > 0) {
      handleSelectProject(filteredProjects[currentIndex - 1]);
    }
  };

  const handleNextProject = () => {
    if (currentIndex < filteredProjects.length - 1) {
      handleSelectProject(filteredProjects[currentIndex + 1]);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portfolio Code Manager</h1>
        <p className="text-muted-foreground">
          Select a project and update its HTML, CSS, and JavaScript code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Projects</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-1 p-2">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleSelectProject(project)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedProject?.id === project.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm line-clamp-1">
                          {project.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            selectedProject?.id === project.id
                              ? "border-primary-foreground/50"
                              : ""
                          }`}
                        >
                          #{project.id}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        {(project.htmlCode || project.cssCode || project.jsCode) && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Has Code
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedProject ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevProject}
                      disabled={currentIndex <= 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {currentIndex + 1} / {filteredProjects.length}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextProject}
                      disabled={currentIndex >= filteredProjects.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={updateCodeMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateCodeMutation.isPending ? "Saving..." : "Save Code"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="html" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="html">
                      <FileCode2 className="w-4 h-4 mr-2" />
                      HTML
                    </TabsTrigger>
                    <TabsTrigger value="css">
                      <Code className="w-4 h-4 mr-2" />
                      CSS
                    </TabsTrigger>
                    <TabsTrigger value="js">
                      <Code className="w-4 h-4 mr-2" />
                      JavaScript
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="html">
                    <Textarea
                      placeholder="Paste HTML code here..."
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] resize-none"
                    />
                  </TabsContent>
                  <TabsContent value="css">
                    <Textarea
                      placeholder="Paste CSS code here..."
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] resize-none"
                    />
                  </TabsContent>
                  <TabsContent value="js">
                    <Textarea
                      placeholder="Paste JavaScript code here..."
                      value={jsCode}
                      onChange={(e) => setJsCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] resize-none"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <FileCode2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Project Selected</h3>
                <p className="text-muted-foreground">
                  Select a project from the list to edit its code.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
