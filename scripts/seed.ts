import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

interface InitialProject {
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
    sourceCodeUrl: "https://codewithrandom.com/2022/12/19/simple-404-page-html-code-404-page-html-codewithrandom/",
    liveDemoUrl: "https://codewithrandom.com/2022/12/19/simple-404-page-html-code-404-page-html-codewithrandom/",
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
  { name: "Social Media Share Icon Animation", description: "Animated social media share icons with hover effects. Each icon expands and changes color on hover, creating an engaging user experience.", category: "animations", technologies: ["HTML", "CSS"], features: ["Hover animations", "Multiple social icons", "Color transitions", "Scale effects"], sourceCodeUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/" },
  { name: "Card With Hover Effect", description: "Beautiful card component with interactive hover effects. The card lifts up and reveals additional information with smooth transitions.", category: "html-css", technologies: ["HTML", "CSS"], features: ["3D hover effect", "Shadow transitions", "Content reveal", "Responsive layout"], sourceCodeUrl: "https://codewithrandom.com/2023/01/02/3d-card-effect-css-3d-card-hover-effect-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2023/01/02/3d-card-effect-css-3d-card-hover-effect-html-css-javascript/" },
  { name: "Button Hover Effect", description: "Collection of creative button hover effects using pure CSS. Includes sliding backgrounds, border animations, and text transformations.", category: "animations", technologies: ["HTML", "CSS"], features: ["Multiple button styles", "CSS transitions", "No JavaScript required", "Customizable colors"], sourceCodeUrl: "https://codewithrandom.com/2022/12/21/top-10-hover-effect-buttons-using-css-only-css-hover-effects/", liveDemoUrl: "https://codewithrandom.com/2022/12/21/top-10-hover-effect-buttons-using-css-only-css-hover-effects/" },
  { name: "Share Button Using CSS", description: "A stylish share button that expands to reveal social media icons. Built entirely with CSS for lightweight performance.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Expandable menu", "Social media icons", "Smooth animations", "Lightweight"], sourceCodeUrl: "https://codewithrandom.com/2022/12/15/share-button-using-css-share-button-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/15/share-button-using-css-share-button-html-css/" },
  { name: "Social Media Icons CSS", description: "Stylized social media icons with unique hover effects. Each icon has its brand color and custom animation.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Brand colors", "Unique hover effects", "Icon font integration", "Responsive sizing"], sourceCodeUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/" },
  { name: "Double-line CSS Button Hover Effects", description: "Creative double-line button animation effect. Two lines animate across the button on hover creating a unique visual effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["Double line animation", "Customizable timing", "Pure CSS solution", "Modern design"], sourceCodeUrl: "https://codewithrandom.com/2022/12/20/15-css-animation-buttons-css-button-hover-effects-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/20/15-css-animation-buttons-css-button-hover-effects-codewithrandom/" },
  { name: "Footer Using HTML & CSS", description: "A comprehensive footer design with multiple columns, social links, and newsletter signup. Fully responsive for all devices.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Multi-column layout", "Social media links", "Newsletter form", "Copyright section"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/footer-design-using-html-and-css-html-footer-template/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/footer-design-using-html-and-css-html-footer-template/" },
  { name: "Image Animation Using HTML CSS", description: "Creative image animations including zoom, rotate, and fade effects. Perfect for galleries and portfolios.", category: "animations", technologies: ["HTML", "CSS"], features: ["Multiple animation types", "Smooth transitions", "Gallery ready", "CSS keyframes"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/card-image-hover-effect-hover-on-image-effect-more-content-on-hover/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/card-image-hover-effect-hover-on-image-effect-more-content-on-hover/" },
  { name: "Dropdown Menu Using HTML CSS", description: "A multi-level dropdown navigation menu. Includes smooth animations and works on touch devices.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Multi-level menu", "Smooth transitions", "Touch friendly", "Accessible markup"], sourceCodeUrl: "https://codewithrandom.com/2022/11/02/dropdown-menu-css/", liveDemoUrl: "https://codewithrandom.com/2022/11/02/dropdown-menu-css/" },
  { name: "List Items Hover Effect", description: "Interactive list items with creative hover effects. Perfect for navigation menus and content lists.", category: "animations", technologies: ["HTML", "CSS"], features: ["Sliding indicators", "Background transitions", "Icon animations", "Clean design"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/dropdown-list-dropdown-list-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/dropdown-list-dropdown-list-html-css/" },
  { name: "Custom Checkbox Using HTML CSS", description: "Beautifully styled custom checkboxes that replace the default browser styles. Includes animated check marks.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Custom styling", "Animated check mark", "Accessible", "Multiple themes"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/custom-checkbox-css-code-custom-checkbox-using-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/custom-checkbox-css-code-custom-checkbox-using-html-css/" },
  { name: "Box Loading Animation CSS", description: "Creative box-based loading animation. Perfect for loading states in web applications.", category: "animations", technologies: ["HTML", "CSS"], features: ["CSS keyframes", "Infinite loop", "Customizable speed", "Multiple variations"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/css-loading-animation-name-animation-using-css-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/css-loading-animation-name-animation-using-css-codewithrandom/" },
  { name: "Glassmorphism Login Form", description: "Modern login form with glassmorphism design. Features frosted glass effect with backdrop blur.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Glassmorphism effect", "Backdrop blur", "Form validation ready", "Responsive design"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/glassmorphism-login-form-login-form-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/glassmorphism-login-form-login-form-html-css/" },
  { name: "Card Image Hover Effect", description: "Image cards with overlay and content reveal on hover. Great for portfolios and image galleries.", category: "animations", technologies: ["HTML", "CSS"], features: ["Overlay animation", "Content reveal", "Image zoom", "Gradient overlays"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/card-image-hover-effect-hover-on-image-effect-more-content-on-hover/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/card-image-hover-effect-hover-on-image-effect-more-content-on-hover/" },
  { name: "Dropdown List HTML CSS", description: "Simple and elegant dropdown list component. Easy to integrate into any navigation system.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Clean design", "Easy integration", "Hover activation", "Customizable styling"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/dropdown-list-dropdown-list-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/dropdown-list-dropdown-list-html-css/" },
  { name: "Custom Toggle Switch Using CSS", description: "iOS-style toggle switch built with pure CSS. Smooth animation and customizable colors.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["iOS-inspired design", "Smooth toggle animation", "Customizable", "Accessible"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/custom-toggle-switch-css-toggle-switch-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/custom-toggle-switch-css-toggle-switch-html-css/" },
  { name: "Card 3D Hover Effect", description: "3D card transformation on hover using CSS perspective. Creates an immersive depth effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["3D perspective", "Mouse tracking effect", "Depth illusion", "Smooth transitions"], sourceCodeUrl: "https://codewithrandom.com/2023/01/02/3d-card-effect-css-3d-card-hover-effect-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2023/01/02/3d-card-effect-css-3d-card-hover-effect-html-css-javascript/" },
  { name: "Name Animation Using CSS", description: "Animated text effect for displaying names or titles. Letters animate in sequence creating a typewriter-like effect.", category: "animations", technologies: ["HTML", "CSS"], features: ["Letter animation", "Typewriter effect", "Customizable timing", "Loop option"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/css-loading-animation-name-animation-using-css-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/css-loading-animation-name-animation-using-css-codewithrandom/" },
  { name: "Neon Light Text Effect CSS", description: "Glowing neon text effect with flicker animation. Perfect for creating retro or cyberpunk aesthetics.", category: "animations", technologies: ["HTML", "CSS"], features: ["Glow effect", "Flicker animation", "Multiple colors", "Text shadow layering"], sourceCodeUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/", liveDemoUrl: "https://codewithrandom.com/2022/12/22/glowing-neon-social-media-icons-pink-social-media-icons-codewithrandom/" },
  { name: "HTML Top Bar Slide Down Notification CSS", description: "Animated notification bar that slides down from the top. Includes close button and auto-dismiss option.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Slide animation", "Close button", "Multiple styles", "Auto-dismiss ready"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/notification-bar-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/notification-bar-html-css/" },
  { name: "A Custom Checkbox in the CSS", description: "Another creative custom checkbox design with unique animations. Features a bouncy check animation.", category: "forms-ui", technologies: ["HTML", "CSS"], features: ["Bouncy animation", "Custom design", "Multiple styles", "Form compatible"], sourceCodeUrl: "https://codewithrandom.com/2022/12/12/custom-checkbox-css-code-custom-checkbox-using-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/12/custom-checkbox-css-code-custom-checkbox-using-html-css/" },
  { name: "CSS Timeline Vertical", description: "Vertical timeline component for displaying chronological events. Perfect for about pages and history sections.", category: "html-css", technologies: ["HTML", "CSS"], features: ["Vertical layout", "Date markers", "Event cards", "Responsive design"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/timeline-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/timeline-html-css/" },
  { name: "Responsive Bootstrap Navbar", description: "Fully responsive navigation bar using Bootstrap. Includes hamburger menu for mobile devices.", category: "html-css", technologies: ["HTML", "CSS", "Bootstrap"], features: ["Bootstrap integration", "Mobile hamburger menu", "Dropdown support", "Responsive breakpoints"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/responsive-navbar-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/responsive-navbar-html-css/" },
  { name: "The Gift Using CSS", description: "Animated gift box that opens on hover revealing content inside. Great for promotional pages.", category: "animations", technologies: ["HTML", "CSS"], features: ["Box opening animation", "Content reveal", "3D effect", "Hover triggered"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/gift-box-animation-html-css/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/gift-box-animation-html-css/" },
  { name: "New Year Countdown 2022", description: "Countdown timer for New Year with animated digits. Displays days, hours, minutes, and seconds.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Real-time countdown", "Animated digits", "Customizable date", "Responsive layout"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/countdown-timer-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/countdown-timer-html-css-javascript/" },
  { name: "Drawing App JavaScript", description: "Canvas-based drawing application with brush tools, colors, and eraser. Supports save functionality.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Canvas drawing", "Brush sizes", "Color picker", "Save/Clear options"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/drawing-app-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/drawing-app-html-css-javascript/" },
  { name: "Screen Recorder with HTML CSS JavaScript", description: "Web-based screen recorder using the Screen Capture API. Record and download screen recordings.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Screen capture API", "Recording controls", "Download option", "Timer display"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/screen-recorder-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/screen-recorder-html-css-javascript/" },
  { name: "Image Color Picker Using HTML JavaScript", description: "Pick any color from an uploaded image. Displays HEX and RGB values with copy functionality.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Image upload", "Color sampling", "HEX/RGB display", "Copy to clipboard"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/color-picker-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/color-picker-html-css-javascript/" },
  { name: "Animated Tab Bar Using HTML CSS JavaScript", description: "Animated bottom navigation tab bar with sliding indicator. Perfect for mobile web apps.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Sliding indicator", "Icon animations", "Mobile-first design", "Smooth transitions"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/tab-bar-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/tab-bar-html-css-javascript/" },
  { name: "Notes App Using HTML CSS JavaScript", description: "Simple notes application with local storage. Create, edit, and delete notes that persist across sessions.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["CRUD operations", "Local storage", "Rich text", "Search functionality"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/notes-app-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/notes-app-html-css-javascript/" },
  { name: "Calendar Using HTML CSS JavaScript", description: "Interactive calendar with month navigation. Displays current date and allows date selection.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Month navigation", "Date selection", "Current date highlight", "Responsive grid"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/calendar-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/calendar-html-css-javascript/" },
  { name: "Add to Cart Button", description: "Animated add to cart button with success state. Shows visual feedback when item is added.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Click animation", "Success state", "Cart icon animation", "Visual feedback"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/add-to-cart-button-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/add-to-cart-button-html-css-javascript/" },
  { name: "Search Filter JavaScript", description: "Real-time search filter for lists. Filters items as you type with highlight matching.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Real-time filtering", "Highlight matches", "No results state", "Case insensitive"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/search-filter-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/search-filter-html-css-javascript/" },
  { name: "Progress Steps Using HTML CSS JavaScript", description: "Multi-step progress indicator with navigation. Perfect for checkout flows and onboarding.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Step navigation", "Progress line", "Active state", "Completed state"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/progress-steps-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/progress-steps-html-css-javascript/" },
  { name: "Hidden Search Bar", description: "Search bar that expands from an icon on click. Collapses back when not in use.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Toggle animation", "Focus state", "Click outside close", "Smooth expansion"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/hidden-search-bar-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/hidden-search-bar-html-css-javascript/" },
  { name: "Hamburger Menu CSS JavaScript", description: "Animated hamburger menu icon that transforms into an X. Includes mobile navigation panel.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Icon animation", "Mobile nav panel", "Overlay", "Smooth transitions"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/hamburger-menu-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/hamburger-menu-html-css-javascript/" },
  { name: "Increment Counter", description: "Animated counter that increments to a target number. Includes easing for natural feel.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Count animation", "Easing function", "Customizable speed", "Multiple counters"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/counter-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/counter-html-css-javascript/" },
  { name: "Toast Notification Code", description: "Toast notification system with different types. Success, error, warning, and info styles.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Multiple types", "Auto dismiss", "Progress bar", "Stack support"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/toast-notification-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/toast-notification-html-css-javascript/" },
  { name: "Music Player Using HTML CSS JavaScript", description: "Fully functional music player with playlist support. Includes progress bar and volume control.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Play/pause/skip", "Progress bar", "Volume control", "Playlist support"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/music-player-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/music-player-html-css-javascript/" },
  { name: "Speech to Text JavaScript", description: "Convert speech to text using the Web Speech API. Supports multiple languages.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Speech recognition", "Multiple languages", "Real-time display", "Copy text"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/speech-to-text-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/speech-to-text-html-css-javascript/" },
  { name: "Copy to Clipboard JavaScript", description: "Simple copy to clipboard functionality with visual feedback. Works with any text content.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Clipboard API", "Success feedback", "Fallback support", "Button animation"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/copy-to-clipboard-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/copy-to-clipboard-html-css-javascript/" },
  { name: "Programming Quote Generator", description: "Random programming quote generator with share functionality. Includes favorite quotes feature.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Random quotes", "Share buttons", "Copy quote", "New quote animation"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/quote-generator-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/quote-generator-html-css-javascript/" },
  { name: "GitHub Profile Search", description: "Search for GitHub users and display their profile information. Uses the GitHub API.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["GitHub API", "User search", "Profile display", "Repository list"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/github-profile-search-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/github-profile-search-html-css-javascript/" },
  { name: "Age Calculator JavaScript", description: "Calculate exact age from birth date. Shows years, months, and days with validation.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Date validation", "Exact calculation", "Years/months/days", "Responsive design"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/age-calculator-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/age-calculator-html-css-javascript/" },
  { name: "Tic Tac Toe JavaScript", description: "Classic Tic Tac Toe game with two-player mode. Includes win detection and game reset.", category: "games", technologies: ["HTML", "CSS", "JavaScript"], features: ["Two-player mode", "Win detection", "Game reset", "Score tracking"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/tic-tac-toe-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/tic-tac-toe-html-css-javascript/" },
  { name: "JavaScript Drum Kit", description: "Virtual drum kit with keyboard controls. Each key plays a different drum sound.", category: "games", technologies: ["HTML", "CSS", "JavaScript"], features: ["Keyboard controls", "Sound effects", "Visual feedback", "Multiple instruments"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/drum-kit-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/drum-kit-html-css-javascript/" },
  { name: "JavaScript Image Slider", description: "Responsive image slider with navigation controls. Includes auto-play and touch support.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Auto-play", "Navigation arrows", "Dot indicators", "Touch support"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/image-slider-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/image-slider-html-css-javascript/" },
  { name: "Random Jokes Generator JavaScript", description: "Fetch and display random programming jokes. Uses a jokes API with refresh button.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["API integration", "Random jokes", "Copy joke", "Share functionality"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/jokes-generator-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/jokes-generator-html-css-javascript/" },
  { name: "Number Guessing Game JavaScript", description: "Guess the random number game with hints. Shows if guess is too high or too low.", category: "games", technologies: ["HTML", "CSS", "JavaScript"], features: ["Random number", "Hint system", "Attempt counter", "Game reset"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/number-guessing-game-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/number-guessing-game-html-css-javascript/" },
  { name: "Speech Recognition JavaScript", description: "Voice command recognition using Web Speech API. Execute actions based on spoken commands.", category: "javascript", technologies: ["HTML", "CSS", "JavaScript"], features: ["Voice commands", "Command list", "Visual feedback", "Browser support check"], sourceCodeUrl: "https://codewithrandom.com/2022/12/11/speech-recognition-html-css-javascript/", liveDemoUrl: "https://codewithrandom.com/2022/12/11/speech-recognition-html-css-javascript/" }
];

async function seed() {
  console.log('Setting up database...');
  
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        technologies TEXT NOT NULL,
        features TEXT NOT NULL,
        source_code_url VARCHAR(500) NOT NULL,
        live_demo_url VARCHAR(500) NOT NULL,
        html_code TEXT,
        css_code TEXT,
        js_code TEXT
      )
    `;
    console.log('Table schema verified.');

    const existingProjects = await sql`SELECT COUNT(*) as count FROM projects`;
    const count = parseInt(existingProjects[0].count);
    
    if (count > 0) {
      console.log(`Database already has ${count} projects. Skipping seed.`);
      return;
    }
    
    console.log('Seeding database with projects...');
    
    for (const project of initialProjectsData) {
      await sql`
        INSERT INTO projects (name, description, category, technologies, features, source_code_url, live_demo_url, html_code, css_code, js_code)
        VALUES (
          ${project.name},
          ${project.description},
          ${project.category},
          ${JSON.stringify(project.technologies)},
          ${JSON.stringify(project.features)},
          ${project.sourceCodeUrl},
          ${project.liveDemoUrl},
          ${project.htmlCode || null},
          ${project.cssCode || null},
          ${project.jsCode || null}
        )
      `;
    }
    
    console.log(`Successfully seeded ${initialProjectsData.length} projects.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
