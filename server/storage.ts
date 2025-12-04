import { eq, ilike, or, sql } from "drizzle-orm";
import { db } from "./db";
import { projects, type Project, type ProjectCategory, type UpdateProjectCode } from "@shared/schema";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: ProjectCategory): Promise<Project[]>;
  searchProjects(query: string): Promise<Project[]>;
  updateProjectCode(id: number, code: UpdateProjectCode): Promise<Project | undefined>;
  seedProjects(): Promise<void>;
}

interface InitialProject {
  id?: number;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  sourceCodeUrl: string;
  liveDemoUrl: string;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
}

const initialProjectsData: InitialProject[] = [
  {
    name: "Simple 404 Page",
    description: "A clean and modern 404 error page built with HTML and CSS. Features a minimalist design with smooth animations and a call-to-action button to redirect users back to the homepage.",
    category: "html-css",
    technologies: ["HTML", "CSS"],
    features: ["Responsive design", "Smooth animations", "Clean typography", "Back to home button"],
    sourceCodeUrl: "https://github.com/example/404-page",
    liveDemoUrl: "https://example.com/404-page",
    htmlCode: `<h1>There's some issues</h1>
<p class="zoom-area">
    <b>Codewithrandom</b> Hope you understand our pain as our developer thank
    you visit again
</p>
<section class="error-container">
    <span><span>4</span></span> <span>0</span> <span><span>4</span></span>
</section>
<div class="link-container">
    <a target="_blank" href="https://www.codewithrandom.com/" class="more-link"
        >Visit the home page</a
    >
</div>`,
    cssCode: `@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");
@import url("https://fonts.googleapis.com/css?family=Catamaran:400,800");

.error-container {
    text-align: center;
    font-size: 180px;
    font-family: "Catamaran", sans-serif;
    font-weight: 800;
    margin: 20px 15px;
}

.error-container > span {
    display: inline-block;
    line-height: 0.7;
    position: relative;
    color: #FFB485;
}

.error-container > span > span {
    display: inline-block;
    position: relative;
}

.error-container > span:nth-of-type(1) {
    perspective: 1000px;
    perspective-origin: 500% 50%;
    color: #F0E395;
}

.error-container > span:nth-of-type(1) > span {
    transform-origin: 50% 100% 0px;
    transform: rotateX(0);
    animation: easyoutelastic 8s infinite;
}

.error-container > span:nth-of-type(3) {
    perspective: none;
    perspective-origin: 50% 50%;
    color: #D15C95;
}

.error-container > span:nth-of-type(3) > span {
    transform-origin: 100% 100% 0px;
    transform: rotate(0deg);
    animation: rotatedrop 8s infinite;
}

@keyframes easyoutelastic {
    0% { transform: rotateX(0); }
    9% { transform: rotateX(210deg); }
    13% { transform: rotateX(150deg); }
    16% { transform: rotateX(200deg); }
    18% { transform: rotateX(170deg); }
    20% { transform: rotateX(180deg); }
    60% { transform: rotateX(180deg); }
    80% { transform: rotateX(0); }
    100% { transform: rotateX(0); }
}

@keyframes rotatedrop {
    0% { transform: rotate(0); }
    10% { transform: rotate(30deg); }
    15% { transform: rotate(90deg); }
    70% { transform: rotate(90deg); }
    80% { transform: rotate(0); }
    100% { transform: rotateX(0); }
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    background-color: #f4f4f4;
    margin-bottom: 50px;
}

html, button, input, select, textarea {
    font-family: "Montserrat", Helvetica, sans-serif;
    color: #bbb;
}

h1 {
    text-align: center;
    margin: 30px 15px;
}

.zoom-area {
    max-width: 490px;
    margin: 30px auto 30px;
    font-size: 19px;
    text-align: center;
}

.link-container {
    text-align: center;
}

a.more-link {
    text-transform: uppercase;
    font-size: 13px;
    background-color: #bbb;
    padding: 10px 15px;
    border-radius: 0;
    color: #fff;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 50px;
    letter-spacing: 1px;
}`
  },
  { id: 2, name: "Social Media Share Icon Animation", description: "Animated social media share icons with hover effects. Each icon expands and changes color on hover, creating an engaging user experience.", category: "animations", technologies: ["HTML", "CSS"], features: ["Hover animations", "Multiple social icons", "Color transitions", "Scale effects"], sourceCodeUrl: "https://github.com/example/social-share-icons", liveDemoUrl: "https://example.com/social-share-icons" },
  { id: 3, name: "Card With Hover Effect", description: "Beautiful card component with interactive hover effects. The card lifts up and reveals additional information with smooth transitions.", category: "html-css", technologies: ["HTML", "CSS"], features: ["3D hover effect", "Shadow transitions", "Content reveal", "Responsive layout"], sourceCodeUrl: "https://github.com/example/hover-card", liveDemoUrl: "https://example.com/hover-card" },
  { id: 4, name: "Button Hover Effect", description: "Collection of creative button hover effects using pure CSS. Includes sliding backgrounds, border animations, and text transformations.", category: "animations", technologies: ["HTML", "CSS"], features: ["Multiple button styles", "CSS transitions", "No JavaScript required", "Customizable colors"], sourceCodeUrl: "https://github.com/example/button-hover", liveDemoUrl: "https://example.com/button-hover" },
  { id: 5, name: "Share Button Using CSS", description: "A stylish share button that expands to reveal social media icons. Built entirely with CSS for lightweight performance.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Expandable menu", "Social media icons", "Smooth animations", "Lightweight"], sourceCodeUrl: "https://github.com/example/share-button", liveDemoUrl: "https://example.com/share-button" },
  { id: 6, name: "Social Media Icons CSS", description: "Stylized social media icons with unique hover effects. Each icon has its brand color and custom animation.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Brand colors", "Unique hover effects", "Icon font integration", "Responsive sizing"], sourceCodeUrl: "https://github.com/example/social-icons", liveDemoUrl: "https://example.com/social-icons" },
  { id: 7, name: "Double-line CSS Button Hover Effects", description: "Creative double-line button animation effect. Two lines animate across the button on hover creating a unique visual effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["Double line animation", "Customizable timing", "Pure CSS solution", "Modern design"], sourceCodeUrl: "https://github.com/example/double-line-button", liveDemoUrl: "https://example.com/double-line-button" },
  { id: 8, name: "Footer Using HTML & CSS", description: "A comprehensive footer design with multiple columns, social links, and newsletter signup. Fully responsive for all devices.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Multi-column layout", "Social media links", "Newsletter form", "Copyright section"], sourceCodeUrl: "https://github.com/example/footer-design", liveDemoUrl: "https://example.com/footer-design" },
  { id: 9, name: "Image Animation Using HTML CSS", description: "Creative image animations including zoom, rotate, and fade effects. Perfect for galleries and portfolios.", category: "animations", technologies: ["HTML", "CSS"], features: ["Multiple animation types", "Smooth transitions", "Gallery ready", "CSS keyframes"], sourceCodeUrl: "https://github.com/example/image-animation", liveDemoUrl: "https://example.com/image-animation" },
  { id: 10, name: "Dropdown Menu Using HTML CSS", description: "A multi-level dropdown navigation menu. Includes smooth animations and works on touch devices.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Multi-level menu", "Smooth transitions", "Touch friendly", "Accessible markup"], sourceCodeUrl: "https://github.com/example/dropdown-menu", liveDemoUrl: "https://example.com/dropdown-menu" },
  { id: 11, name: "List Items Hover Effect", description: "Interactive list items with creative hover effects. Perfect for navigation menus and content lists.", category: "animations", technologies: ["HTML", "CSS"], features: ["Sliding indicators", "Background transitions", "Icon animations", "Clean design"], sourceCodeUrl: "https://github.com/example/list-hover", liveDemoUrl: "https://example.com/list-hover" },
  { id: 12, name: "Custom Checkbox Using HTML CSS", description: "Beautifully styled custom checkboxes that replace the default browser styles. Includes animated check marks.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Custom styling", "Animated check mark", "Accessible", "Multiple themes"], sourceCodeUrl: "https://github.com/example/custom-checkbox", liveDemoUrl: "https://example.com/custom-checkbox" },
  { id: 13, name: "Box Loading Animation CSS", description: "Creative box-based loading animation. Perfect for loading states in web applications.", category: "animations", technologies: ["HTML", "CSS"], features: ["CSS keyframes", "Infinite loop", "Customizable speed", "Multiple variations"], sourceCodeUrl: "https://github.com/example/box-loading", liveDemoUrl: "https://example.com/box-loading" },
  { id: 14, name: "Glassmorphism Login Form", description: "Modern login form with glassmorphism design. Features frosted glass effect with backdrop blur.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Glassmorphism effect", "Backdrop blur", "Form validation ready", "Responsive design"], sourceCodeUrl: "https://github.com/example/glass-login", liveDemoUrl: "https://example.com/glass-login" },
  { id: 15, name: "Card Image Hover Effect", description: "Image cards with overlay and content reveal on hover. Great for portfolios and image galleries.", category: "animations", technologies: ["HTML", "CSS"], features: ["Overlay animation", "Content reveal", "Image zoom", "Gradient overlays"], sourceCodeUrl: "https://github.com/example/card-image-hover", liveDemoUrl: "https://example.com/card-image-hover" },
  { id: 16, name: "Dropdown List HTML CSS", description: "Simple and elegant dropdown list component. Easy to integrate into any navigation system.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Clean design", "Easy integration", "Hover activation", "Customizable styling"], sourceCodeUrl: "https://github.com/example/dropdown-list", liveDemoUrl: "https://example.com/dropdown-list" },
  { id: 17, name: "Custom Toggle Switch Using CSS", description: "iOS-style toggle switch built with pure CSS. Smooth animation and customizable colors.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["iOS-inspired design", "Smooth toggle animation", "Customizable", "Accessible"], sourceCodeUrl: "https://github.com/example/toggle-switch", liveDemoUrl: "https://example.com/toggle-switch" },
  { id: 18, name: "Card 3D Hover Effect", description: "3D card transformation on hover using CSS perspective. Creates an immersive depth effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["3D perspective", "Mouse tracking effect", "Depth illusion", "Smooth transitions"], sourceCodeUrl: "https://github.com/example/3d-card", liveDemoUrl: "https://example.com/3d-card" },
  { id: 19, name: "Name Animation Using CSS", description: "Animated text effect for displaying names or titles. Letters animate in sequence creating a typewriter-like effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["Letter animation", "Typewriter effect", "Customizable timing", "Loop option"], sourceCodeUrl: "https://github.com/example/name-animation", liveDemoUrl: "https://example.com/name-animation" },
  { id: 20, name: "Neon Light Text Effect CSS", description: "Glowing neon text effect with flicker animation. Perfect for creating retro or cyberpunk aesthetics.", category: "animations", technologies: ["HTML", "CSS"], features: ["Glow effect", "Flicker animation", "Multiple colors", "Text shadow layering"], sourceCodeUrl: "https://github.com/example/neon-text", liveDemoUrl: "https://example.com/neon-text" },
  { id: 21, name: "HTML Top Bar Slide Down Notification CSS", description: "Animated notification bar that slides down from the top. Includes close button and auto-dismiss option.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Slide animation", "Close button", "Multiple styles", "Auto-dismiss ready"], sourceCodeUrl: "https://github.com/example/notification-bar", liveDemoUrl: "https://example.com/notification-bar" },
  { id: 22, name: "A Custom Checkbox in the CSS", description: "Another creative custom checkbox design with unique animations. Features a bouncy check animation.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Bouncy animation", "Custom design", "Multiple styles", "Form compatible"], sourceCodeUrl: "https://github.com/example/checkbox-v2", liveDemoUrl: "https://example.com/checkbox-v2" },
  { id: 23, name: "CSS Timeline Vertical", description: "Vertical timeline component for displaying chronological events. Perfect for about pages and history sections.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Vertical layout", "Date markers", "Event cards", "Responsive design"], sourceCodeUrl: "https://github.com/example/vertical-timeline", liveDemoUrl: "https://example.com/vertical-timeline" },
  { id: 24, name: "Responsive Bootstrap Navbar", description: "Fully responsive navigation bar using Bootstrap. Includes hamburger menu for mobile devices.", category: "html-css", technologies: ["HTML", "CSS", "Bootstrap"], features: ["Bootstrap integration", "Mobile hamburger menu", "Dropdown support", "Responsive breakpoints"], sourceCodeUrl: "https://github.com/example/bootstrap-navbar", liveDemoUrl: "https://example.com/bootstrap-navbar" },
  { id: 25, name: "The Gift Using CSS", description: "Animated gift box that opens on hover revealing content inside. Great for promotional pages.", category: "animations", technologies: ["HTML", "CSS"], features: ["Box opening animation", "Content reveal", "3D effect", "Hover triggered"], sourceCodeUrl: "https://github.com/example/css-gift", liveDemoUrl: "https://example.com/css-gift" },
  { id: 26, name: "New Year Countdown 2022", description: "Countdown timer for New Year with animated digits. Displays days, hours, minutes, and seconds.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Real-time countdown", "Animated digits", "Customizable date", "Responsive layout"], sourceCodeUrl: "https://github.com/example/countdown", liveDemoUrl: "https://example.com/countdown" },
  { id: 27, name: "Drawing App JavaScript", description: "Canvas-based drawing application with brush tools, colors, and eraser. Supports save functionality.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Canvas drawing", "Brush sizes", "Color picker", "Save/Clear options"], sourceCodeUrl: "https://github.com/example/drawing-app", liveDemoUrl: "https://example.com/drawing-app" },
  { id: 28, name: "Screen Recorder with HTML CSS JavaScript", description: "Web-based screen recorder using the Screen Capture API. Record and download screen recordings.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Screen capture API", "Recording controls", "Download option", "Timer display"], sourceCodeUrl: "https://github.com/example/screen-recorder", liveDemoUrl: "https://example.com/screen-recorder" },
  { id: 29, name: "Image Color Picker Using HTML JavaScript", description: "Pick any color from an uploaded image. Displays HEX and RGB values with copy functionality.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Image upload", "Color sampling", "HEX/RGB display", "Copy to clipboard"], sourceCodeUrl: "https://github.com/example/color-picker", liveDemoUrl: "https://example.com/color-picker" },
  { id: 30, name: "Animated Tab Bar Using HTML CSS JavaScript", description: "Animated bottom navigation tab bar with sliding indicator. Perfect for mobile web apps.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Sliding indicator", "Icon animations", "Mobile-first design", "Smooth transitions"], sourceCodeUrl: "https://github.com/example/tab-bar", liveDemoUrl: "https://example.com/tab-bar" },
  { id: 31, name: "Notes App Using HTML CSS JavaScript", description: "Simple notes application with local storage. Create, edit, and delete notes that persist across sessions.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["CRUD operations", "Local storage", "Rich text", "Search functionality"], sourceCodeUrl: "https://github.com/example/notes-app", liveDemoUrl: "https://example.com/notes-app" },
  { id: 32, name: "Calendar Using HTML CSS JavaScript", description: "Interactive calendar with month navigation. Displays current date and allows date selection.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Month navigation", "Date selection", "Current date highlight", "Responsive grid"], sourceCodeUrl: "https://github.com/example/calendar", liveDemoUrl: "https://example.com/calendar" },
  { id: 33, name: "Add to Cart Button", description: "Animated add to cart button with success state. Shows visual feedback when item is added.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Click animation", "Success state", "Cart icon animation", "Visual feedback"], sourceCodeUrl: "https://github.com/example/add-to-cart", liveDemoUrl: "https://example.com/add-to-cart" },
  { id: 34, name: "Search Filter JavaScript", description: "Real-time search filter for lists. Filters items as you type with highlight matching.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Real-time filtering", "Highlight matches", "No results state", "Case insensitive"], sourceCodeUrl: "https://github.com/example/search-filter", liveDemoUrl: "https://example.com/search-filter" },
  { id: 35, name: "Progress Steps Using HTML CSS JavaScript", description: "Multi-step progress indicator with navigation. Perfect for checkout flows and onboarding.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Step navigation", "Progress line", "Active state", "Completed state"], sourceCodeUrl: "https://github.com/example/progress-steps", liveDemoUrl: "https://example.com/progress-steps" },
  { id: 36, name: "Hidden Search Bar", description: "Search bar that expands from an icon on click. Collapses back when not in use.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Toggle animation", "Focus state", "Click outside close", "Smooth expansion"], sourceCodeUrl: "https://github.com/example/hidden-search", liveDemoUrl: "https://example.com/hidden-search" },
  { id: 37, name: "Hamburger Menu CSS JavaScript", description: "Animated hamburger menu icon that transforms into an X. Includes mobile navigation panel.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Icon animation", "Mobile nav panel", "Overlay", "Smooth transitions"], sourceCodeUrl: "https://github.com/example/hamburger-menu", liveDemoUrl: "https://example.com/hamburger-menu" },
  { id: 38, name: "Increment Counter", description: "Animated counter that increments to a target number. Includes easing for natural feel.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Count animation", "Easing function", "Customizable speed", "Multiple counters"], sourceCodeUrl: "https://github.com/example/counter", liveDemoUrl: "https://example.com/counter" },
  { id: 39, name: "Toast Notification Code", description: "Toast notification system with different types. Success, error, warning, and info styles.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Multiple types", "Auto dismiss", "Progress bar", "Stack support"], sourceCodeUrl: "https://github.com/example/toast", liveDemoUrl: "https://example.com/toast" },
  { id: 40, name: "Music Player Using HTML CSS JavaScript", description: "Fully functional music player with playlist support. Includes progress bar and volume control.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Play/pause/skip", "Progress bar", "Volume control", "Playlist support"], sourceCodeUrl: "https://github.com/example/music-player", liveDemoUrl: "https://example.com/music-player" },
  { id: 41, name: "Speech to Text JavaScript", description: "Convert speech to text using the Web Speech API. Supports multiple languages.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Speech recognition", "Multiple languages", "Real-time display", "Copy text"], sourceCodeUrl: "https://github.com/example/speech-to-text", liveDemoUrl: "https://example.com/speech-to-text" },
  { id: 42, name: "Copy to Clipboard JavaScript", description: "Simple copy to clipboard functionality with visual feedback. Works with any text content.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Clipboard API", "Success feedback", "Fallback support", "Button animation"], sourceCodeUrl: "https://github.com/example/copy-clipboard", liveDemoUrl: "https://example.com/copy-clipboard" },
  { id: 43, name: "Programming Quote Generator", description: "Random programming quote generator with share functionality. Includes favorite quotes feature.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Random quotes", "Share buttons", "Copy quote", "New quote animation"], sourceCodeUrl: "https://github.com/example/quote-generator", liveDemoUrl: "https://example.com/quote-generator" },
  { id: 44, name: "GitHub Profile Search", description: "Search for GitHub users and display their profile information. Uses the GitHub API.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["GitHub API", "User search", "Profile display", "Repository list"], sourceCodeUrl: "https://github.com/example/github-search", liveDemoUrl: "https://example.com/github-search" },
  { id: 45, name: "Speech Recognition JavaScript", description: "Voice command recognition using Web Speech API. Execute actions based on spoken commands.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Voice commands", "Command list", "Visual feedback", "Browser support check"], sourceCodeUrl: "https://github.com/example/speech-recognition", liveDemoUrl: "https://example.com/speech-recognition" }
];

function parseDbProject(row: typeof projects.$inferSelect): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category as ProjectCategory,
    technologies: JSON.parse(row.technologies),
    features: JSON.parse(row.features),
    sourceCodeUrl: row.sourceCodeUrl,
    liveDemoUrl: row.liveDemoUrl,
    htmlCode: row.htmlCode,
    cssCode: row.cssCode,
    jsCode: row.jsCode,
  };
}

export class DatabaseStorage implements IStorage {
  async seedProjects(): Promise<void> {
    const existingProjects = await db.select().from(projects).limit(1);
    if (existingProjects.length > 0) {
      return;
    }

    for (const project of initialProjectsData) {
      await db.insert(projects).values({
        name: project.name,
        description: project.description,
        category: project.category,
        technologies: JSON.stringify(project.technologies),
        features: JSON.stringify(project.features),
        sourceCodeUrl: project.sourceCodeUrl,
        liveDemoUrl: project.liveDemoUrl,
        htmlCode: project.htmlCode || null,
        cssCode: project.cssCode || null,
        jsCode: project.jsCode || null,
      });
    }
  }

  async getAllProjects(): Promise<Project[]> {
    const rows = await db.select().from(projects).orderBy(projects.id);
    return rows.map(parseDbProject);
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const rows = await db.select().from(projects).where(eq(projects.id, id));
    if (rows.length === 0) return undefined;
    return parseDbProject(rows[0]);
  }

  async getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
    if (category === "all") {
      return this.getAllProjects();
    }
    const rows = await db.select().from(projects).where(eq(projects.category, category)).orderBy(projects.id);
    return rows.map(parseDbProject);
  }

  async searchProjects(query: string): Promise<Project[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;
    const rows = await db.select().from(projects).where(
      or(
        ilike(projects.name, lowerQuery),
        ilike(projects.description, lowerQuery),
        ilike(projects.technologies, lowerQuery)
      )
    ).orderBy(projects.id);
    return rows.map(parseDbProject);
  }

  async updateProjectCode(id: number, code: UpdateProjectCode): Promise<Project | undefined> {
    const updateData: Partial<typeof projects.$inferInsert> = {};
    if (code.htmlCode !== undefined) updateData.htmlCode = code.htmlCode;
    if (code.cssCode !== undefined) updateData.cssCode = code.cssCode;
    if (code.jsCode !== undefined) updateData.jsCode = code.jsCode;

    await db.update(projects).set(updateData).where(eq(projects.id, id));
    return this.getProjectById(id);
  }
}

export const storage = new DatabaseStorage();
