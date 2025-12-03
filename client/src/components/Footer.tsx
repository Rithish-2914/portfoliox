import { Code2, Github, Heart } from "lucide-react";
import { Link } from "wouter";

const categories = [
  { label: "HTML/CSS Projects", href: "/#projects" },
  { label: "JavaScript Apps", href: "/#projects" },
  { label: "Animations", href: "/#projects" },
  { label: "Interactive Games", href: "/#projects" },
];

export function Footer() {
  const handleCategoryClick = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg" data-testid="text-footer-logo">
                PortfolioHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A curated collection of 51 web development projects with complete source code and live demos. Perfect for developers building their portfolios.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.label}>
                  <button
                    onClick={handleCategoryClick}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${category.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-github"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PortfolioHub. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for developers by developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
