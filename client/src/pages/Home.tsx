import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, Code2, ExternalLink, FileCode2, AlertCircle, RefreshCw } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { ProjectModal } from "@/components/ProjectModal";
import { useToast } from "@/hooks/use-toast";
import type { Project, ProjectCategory } from "@shared/schema";

function HeroSection() {
  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Code2 className="w-4 h-4" />
            <span>51 Ready-to-Use Projects</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground" data-testid="text-hero-title">
            Build Your Portfolio with{" "}
            <span className="text-primary">Production-Ready</span>{" "}
            Code
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            Discover a curated collection of web development projects with complete source code and live demos. Perfect for learning, building, and showcasing your skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleScrollToProjects}
              data-testid="button-browse-projects"
            >
              Browse Projects
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                const element = document.getElementById("categories");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              data-testid="button-view-categories"
            >
              View by Category
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Source Code</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Live Demos</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">HTML, CSS, JS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const { data: projects = [], isLoading, isError, error, refetch } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Failed to load projects",
        description: "There was an error loading the projects. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const projectCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      "all": projects.length,
      "html-css": 0,
      "javascript": 0,
      "animations": 0,
      "games": 0,
      "forms-ui": 0,
    };

    projects.forEach((project) => {
      if (project.category !== "all") {
        counts[project.category]++;
      }
    });

    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "all" || project.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-projects-heading">
                Explore Projects
              </h2>
              <p className="text-muted-foreground mt-1">
                Filter by category or search for specific projects
              </p>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        <section id="projects" className="scroll-mt-20">
          {isLoading ? (
            <ProjectGridSkeleton />
          ) : isError ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-error">
                Failed to load projects
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Something went wrong while loading the projects. Please try again.
              </p>
              <Button
                onClick={() => refetch()}
                data-testid="button-retry"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <FileCode2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-no-results">
                No projects found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredProjects.length > 0 && (
            <div className="text-center mt-8 text-sm text-muted-foreground" data-testid="text-results-count">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          )}
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
