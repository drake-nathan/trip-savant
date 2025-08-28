# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trip Savant is a Next.js 15 application for trip planning with modern React features and a comprehensive UI component library.

## Development Commands

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build production app with Turbopack  
- `bun run start` - Start production server
- `bun run lint` - Run ESLint with caching
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Runtime**: React 19 with React Compiler enabled
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui with Radix UI primitives
- **Theming**: next-themes with dark mode support
- **Icons**: Lucide React
- **Package Manager**: Bun

### Key Features
- Typed routes enabled (`typedRoutes: true`)
- React Compiler for automatic optimization
- Dark/light theme switching with system preference detection
- Component-based architecture with shadcn/ui

### Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/
│   ├── providers/         # React context providers
│   │   └── theme-provider.tsx
│   ├── ui/               # shadcn/ui components
│   └── theme-toggle.tsx  # Theme switching component
└── lib/
    └── utils.ts          # Utility functions (tailwind-merge, clsx)
```

### Path Aliases
- `@/*` maps to `src/*`
- UI components accessible via `@/components/ui`
- Utils accessible via `@/lib/utils`

### Component Conventions
- shadcn/ui components follow "new-york" style
- Components use Tailwind CSS with CSS variables
- Theme provider wraps the entire app for consistent theming
- All UI components are RSC-compatible

### Configuration
- TypeScript with strict mode enabled
- ESLint configured with js-style-kit
- Prettier for code formatting
- Tailwind v4 with PostCSS integration