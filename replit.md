# PortfolioHub - Developer Projects Showcase Platform

## Overview

PortfolioHub is a web application that showcases a curated collection of 51 web development projects. The platform allows users to browse, search, and filter projects by category, view detailed project information, and access source code and live demos. Built with a modern tech stack, it features a clean, developer-focused design inspired by GitHub, Linear, and Vercel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (single-page application)

**UI Component System**
- **Shadcn/UI** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CVA (Class Variance Authority)** for managing component variants

**State Management**
- **TanStack Query (React Query)** for server state management, data fetching, and caching
- Local component state with React hooks for UI interactions

**Design System**
- Custom color scheme with CSS variables supporting light/dark themes
- Consistent spacing system using Tailwind's spacing scale
- Typography hierarchy using Inter/IBM Plex Sans for UI and JetBrains Mono/Fira Code for code elements
- Elevation system using custom shadow utilities (`hover-elevate`, `active-elevate-2`)

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js for RESTful API endpoints
- **TypeScript** for type safety across the backend
- HTTP server created using Node's built-in `http` module

**API Structure**
- `/api/projects` - Fetch all projects, filter by category, or search by query
- `/api/projects/:id` - Fetch individual project details
- Query parameters: `category` and `search` for filtering/searching

**Data Layer**
- **In-memory storage** implementation via `server/storage.ts` with a defined `IStorage` interface
- Currently uses hardcoded project data in `projectsData` array
- Storage interface designed for easy migration to database (Drizzle ORM configuration present)

**Build Process**
- Client: Vite builds React application to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs` with selective dependency bundling
- Production serves static files from Express with SPA fallback routing

### Data Schema

**Project Model**
```typescript
{
  id: number
  name: string
  description: string
  category: ProjectCategory (enum)
  technologies: string[]
  features: string[]
  sourceCodeUrl: string
  liveDemoUrl: string
  htmlCode?: string    // Optional inline HTML source code
  cssCode?: string     // Optional inline CSS source code
  jsCode?: string      // Optional inline JavaScript source code
}
```

**Category Types**
- `all`, `html-css`, `javascript`, `animations`, `games`, `forms-ui`

**Validation**
- Zod schemas for runtime type validation (`shared/schema.ts`)
- Shared types between frontend and backend via `@shared` path alias

### Routing Strategy

**Client-Side**
- Wouter handles SPA routing
- Single main route (`/`) displays home page with all project browsing functionality
- 404 fallback for unmatched routes
- Smooth scroll navigation to sections via anchor links

**Server-Side**
- Development: Vite middleware handles all requests with HMR
- Production: Express serves static files with catch-all route serving `index.html`

### Development vs Production

**Development Mode**
- Vite dev server with HMR via WebSocket connection
- Source maps enabled for debugging
- Replit-specific plugins for error overlays and dev tooling

**Production Mode**
- Optimized client bundle served as static files
- Server bundle with external dependencies minimized
- Environment detection via `NODE_ENV`

## External Dependencies

### UI & Styling
- **Radix UI** - Unstyled, accessible component primitives (accordion, dialog, dropdown, etc.)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Utility for merging CSS classes

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod integration with React Hook Form

### Data Fetching
- **TanStack Query** - Async state management and data fetching
- **date-fns** - Date manipulation utilities

### Database (Configured but Not Active)
- **Drizzle ORM** - TypeScript ORM with PostgreSQL dialect
- **@neondatabase/serverless** - Serverless PostgreSQL driver
- Database configuration present in `drizzle.config.ts` but storage currently uses in-memory array

### Build Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Fast JavaScript bundler for server code
- **TypeScript** - Type checking and compilation
- **PostCSS** & **Autoprefixer** - CSS processing

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal** - Error overlay for development
- **@replit/vite-plugin-cartographer** - Development tooling
- **@replit/vite-plugin-dev-banner** - Development banner

### Theming
- Custom theme provider with localStorage persistence
- System preference detection via `prefers-color-scheme`
- CSS variables for color tokens supporting light/dark modes