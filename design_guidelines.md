# Design Guidelines: Developer Portfolio Projects Showcase

## Design Approach
**System-Based with Developer Aesthetic**: Clean, modern interface inspired by GitHub, Linear, and Vercel - prioritizing clarity, efficiency, and code-focused presentation. The design emphasizes content discoverability and quick access to project resources.

## Core Design Elements

### Typography
- **Primary Font**: Inter or IBM Plex Sans (Google Fonts)
- **Code Font**: JetBrains Mono or Fira Code for project titles/tags
- **Hierarchy**:
  - Hero Headline: text-5xl to text-6xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Project Titles: text-xl, font-medium
  - Body Text: text-base, font-normal
  - Code Labels/Tags: text-sm, font-mono

### Layout System
- **Spacing Units**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20 (p-4, m-6, gap-8, etc.)
- **Container**: max-w-7xl for main content areas
- **Grid**: 1 column mobile, 2 columns tablet (md:), 3-4 columns desktop (lg:) for project cards

### Component Library

**Hero Section**:
- Full-width with gradient or tech-themed background image (abstract code patterns, geometric shapes, or developer workspace)
- Centered content with prominent headline and subheadline
- Primary CTA button ("Browse Projects") and secondary CTA ("View by Category")
- Stats counter showing "51 Projects | Source Code Available | Live Demos"

**Project Cards** (Main Feature):
- Compact card design with consistent aspect ratio
- Project number badge (top-left corner)
- Project title with mono font treatment
- Technology tags (HTML, CSS, JavaScript badges)
- Hover state reveals: Quick description + two action buttons ("View Code" & "Live Demo")
- Grid layout: grid gap-6 with responsive columns

**Category Filter Section**:
- Horizontal pill-style filter buttons
- Categories: "All Projects", "HTML/CSS Only", "JavaScript Apps", "Animations", "Interactive Games", "Forms & UI"
- Active state indication with subtle background treatment

**Search Bar**:
- Prominent placement above project grid
- Icon prefix (search icon from Heroicons)
- Placeholder: "Search projects by name or technology..."
- Real-time filter capability

**Navigation**:
- Sticky header with minimal height
- Logo/site title (left)
- Main nav links: Home, All Projects, Categories, About
- Search icon (triggers search modal on mobile)

**Footer**:
- Three-column layout (desktop) / stacked (mobile)
- Column 1: Site description and tagline
- Column 2: Quick links to top categories
- Column 3: GitHub repository link, social links
- Bottom bar: Copyright and "Made for developers by developers"

**Individual Project Detail Modal/Page**:
- Large project title with number
- Technology stack badges
- Feature list (bullet points)
- Two prominent action buttons (View Source Code, Open Live Demo)
- "Related Projects" section at bottom

### Images
- **Hero Image**: Abstract tech/code-themed background (geometric patterns, gradient mesh, or minimalist developer workspace). Should be modern and professional without being busy.
- **Project Thumbnails**: Each project card should have a thumbnail screenshot or icon representing the project type
- **Fallback**: Use gradient backgrounds or icon-based placeholders for projects without images

### Icons
- **Library**: Heroicons (via CDN)
- **Usage**: Search icon, external link icons for live demos, code bracket icons for source code links, category icons, filter icons

### Interaction Patterns
- Card hover: Subtle lift effect (translate-y-1) with shadow increase
- Filter pills: Smooth transition on selection
- Button states: Clear hover and active states for all CTAs
- Search: Instant filter results as user types
- Smooth scroll-to-section behavior

### Accessibility
- Maintain consistent focus indicators across all interactive elements
- Clear contrast ratios for text and backgrounds
- Semantic HTML structure for screen readers
- Keyboard navigation support for filters and search

## Page Structure

**Homepage**:
1. Hero section with large background image
2. Quick stats/highlights bar
3. Category filter section
4. Search bar
5. Project grid (all 51 projects or filtered results)
6. Footer

**Key Design Principles**:
- **Information Density**: Pack value efficiently without clutter
- **Developer-First**: Clean, technical aesthetic that resonates with the target audience
- **Performance**: Fast loading, smooth interactions
- **Scannable**: Easy to browse and find specific projects quickly