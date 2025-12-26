# $MAX Token Presale

## Overview

This is a static frontend application for a cryptocurrency token presale landing page. The project is a Christmas-themed community coin ($MAX) presale website built on Solana. It's a single-page application that allows users to view token information, tokenomics, FAQs, and participate in the presale by sending SOL to a designated wallet address.

The application is designed for static deployment (GitHub Pages compatible) with no backend server required. All functionality runs client-side.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter (lightweight React router) for client-side navigation
- **State Management**: TanStack React Query for async state (though minimal server calls in static mode)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactive elements

### Design System
- Custom Christmas theme with deep navy background, gold primary, red secondary, and green accent colors
- CSS variables defined in `src/index.css` for consistent theming
- Custom fonts: DM Sans for body text, Outfit for display headings
- Responsive design with mobile-first approach

### Project Structure
- `/src` - Main source directory (aliased as `@/`)
  - `/components` - Reusable React components
  - `/components/ui` - shadcn/ui components
  - `/pages` - Page-level components (Home, Buy, 404)
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions and configurations
- `/public` - Static assets served directly
- `/attached_assets` - Additional assets (aliased as `@assets`)

### Key Pages
1. **Home** (`/`) - Main landing page with hero, tokenomics, FAQ sections
2. **Buy** (`/buy`) - Presale purchase flow with amount selection and wallet integration
3. **404** - Not found error page

### Static Deployment Strategy
- GitHub Pages SPA routing handled via custom 404.html redirect script
- Relative base paths configured in Vite (`base: "./"`)
- No server-side rendering or API calls required
- Analytics hooks are no-ops for static deployment

## External Dependencies

### UI Framework Dependencies
- **Radix UI**: Full suite of accessible, unstyled primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-styled component library configured via `components.json`
- **Lucide React**: Icon library
- **class-variance-authority**: For component variant styling
- **tailwind-merge/clsx**: Utility class management

### Animation & Interactivity
- **Framer Motion**: Animation library for transitions
- **canvas-confetti**: Celebration effects
- **Embla Carousel**: Touch-enabled carousel component

### Form & Data
- **React Hook Form** with Zod resolvers: Form handling and validation
- **TanStack React Query**: Async state management (configured but minimal use in static mode)

### Crypto Integration
- Solana wallet integration via `solana:` URL scheme for payments
- Hardcoded wallet address for presale: `DTc8PRT3e3KUAbq1vHrnKm8t2EtNmVjgjThD7t2wdm25`

### Development Tools
- **TypeScript**: Full type coverage
- **Vite plugins**: Replit-specific plugins for development (error overlay, cartographer, dev banner)
- **PostCSS/Autoprefixer**: CSS processing

### Deployment Target
- Static hosting (GitHub Pages, Vercel, Netlify)
- No database or backend server required
- All configuration is client-side