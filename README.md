# Pinti Properti

> A modern landing page for real estate investment services in Germany, helping international professionals invest in property with structured financing solutions.

## Overview

Pinti Properti is a specialized platform targeting international professionals working in Germany who want to invest in real estate — even with limited equity. The landing page showcases investment opportunities, tax benefits, and provides educational resources through an engaging, accessible interface.

## Tech Stack

- **[Astro 5](https://astro.build/)** - Modern web framework for content-focused websites
- **[React 19](https://react.dev/)** - UI library for interactive components
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Strict mode enabled for type safety
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Component architecture (New York style)
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variant management

## Prerequisites

- **Node.js** 18+ (tested with v24.11.1)
- **pnpm** - Required package manager for this project

Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

### Building for Production

Build the project:

```bash
pnpm build
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm start
```

## Project Structure

```
pintiproperti/
├── public/
│   ├── fonts/              # Montserrat & Open Sans variable fonts
│   ├── videos/             # Hero section video assets (.mp4, .vtt)
│   └── favicon.svg         # Site favicon
├── src/
│   ├── assets/             # Images (invest-properties, tax-savings, etc.)
│   ├── components/
│   │   ├── ui/             # Reusable UI components (button, accordion)
│   │   ├── hero.astro      # Hero section with video
│   │   ├── problems.astro  # Pain points section
│   │   ├── benefits.astro  # Value propositions
│   │   ├── tax-savings.astro
│   │   ├── testimonials.astro
│   │   ├── faq.astro       # FAQ section
│   │   ├── build-wealth.astro
│   │   ├── navbar.astro    # Navigation
│   │   └── footer.astro    # Footer
│   ├── layouts/
│   │   └── main.astro      # Main layout template
│   ├── lib/
│   │   └── utils.ts        # Utility functions (cn helper)
│   ├── pages/
│   │   └── index.astro     # Homepage
│   └── styles/
│       └── global.css      # Global styles & Tailwind directives
├── .husky/                 # Git hooks
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json
```

## Landing Page Sections

The homepage is composed of the following sections:

1. **Hero** - Video player with key statistics (2,500+ investors, €250M+ properties)
2. **Problems** - Pain points the service addresses
3. **Benefits** - Value propositions for investors
4. **Tax Savings** - Investment tax benefits in Germany
5. **Testimonials** - Social proof from satisfied investors
6. **FAQ** - Common questions with accordion interface
7. **Build Wealth** - Call-to-action section
8. **Footer** - Site footer with navigation links

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

The project uses ESLint with:

- TypeScript support (`@typescript-eslint`)
- React 19 rules (`eslint-plugin-react`, `eslint-plugin-react-hooks`)
- Astro-specific rules (`eslint-plugin-astro`)
- Accessibility checks (`eslint-plugin-jsx-a11y`)

### Formatting

Format code with Prettier:

```bash
pnpm format
```

Prettier is configured with:

- `prettier-plugin-astro` - Astro component formatting
- `prettier-plugin-tailwindcss` - Automatic Tailwind class sorting

### Pre-commit Hooks

The project uses Husky with lint-staged to automatically:

- Fix ESLint issues
- Format code with Prettier

This runs automatically before every commit, ensuring code quality and consistency.

## Code Style Guidelines

### Framework Conventions

- **Astro Components**: Use `.astro` files for content-focused components
- **React Components**: Use `.tsx` files for interactive components
- **React 19**: No JSX runtime imports needed (automatic JSX transform)
- **Functional Components**: Use functional components only, no class components

### Styling

- **Tailwind CSS v4**: Use utility classes for styling
- **Custom Components**: Use `class-variance-authority` for variant management
- **Class Helper**: Use `cn()` utility from `@/lib/utils` to merge classes

### TypeScript

- **Strict Mode**: Always enabled
- **Explicit Types**: Required for function parameters and return values
- **No Any**: Avoid using `any` type

### Imports

- **Path Alias**: Use `@/*` for all src imports
  ```typescript
  import { cn } from "@/lib/utils";
  import Button from "@/components/ui/button";
  ```

### Naming Conventions

- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **Files**: `kebab-case` (e.g., `video-player.tsx`, `faq-accordion.tsx`)

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- **Format**: `type: description` (all lowercase, title only)
- **Types**: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, `test`, `perf`
- **Examples**:
  ```
  feat: add testimonials section
  fix: resolve video player autoplay issue
  docs: update readme with setup instructions
  refactor: simplify button variant logic
  chore: update dependencies
  ```

## UI Components

### Custom Components

Built with Radix UI primitives and styled with Tailwind CSS:

- **Button** (`@/components/ui/button.tsx`)
  - Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
  - Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

- **Accordion** (`@/components/ui/accordion.tsx`)
  - Used in FAQ section
  - Fully accessible with keyboard navigation

### React Components

- **VideoPlayer** (`@/components/video-player.tsx`)
  - Uses `react-player` for video playback
  - Custom controls and styling

- **FAQAccordion** (`@/components/faq-accordion.tsx`)
  - Interactive FAQ interface
  - Radix UI Accordion primitive

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

| Alias          | Path                |
| -------------- | ------------------- |
| `@/*`          | `src/*`             |
| `@/components` | `src/components`    |
| `@/lib`        | `src/lib`           |
| `@/ui`         | `src/components/ui` |

## Package Management

**Important**: This project exclusively uses `pnpm` for all Node.js operations.

- ✅ Use: `pnpm install`, `pnpm add`, `pnpm remove`
- ❌ Don't use: `npm` or `yarn`

## Contributing

1. Follow the code style guidelines above
2. Ensure all lint checks pass: `pnpm lint`
3. Format code before committing: `pnpm format`
4. Use conventional commit messages
5. Pre-commit hooks will automatically fix issues

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` to check for issues
4. Run `pnpm format` to format code
5. Commit with conventional commit message
6. Pre-commit hooks will auto-fix any remaining issues

## Architecture Decisions

### Why Astro?

- **Performance**: Ships zero JavaScript by default
- **Island Architecture**: Hydrate interactive components only when needed
- **Developer Experience**: Familiar component syntax, great TypeScript support

### Why React 19?

- **Interactive Components**: Video player, accordions, dialogs
- **New JSX Transform**: No need to import React
- **Modern Features**: Automatic batching, improved hooks

### Why Tailwind CSS v4?

- **Performance**: Lightning-fast builds with Vite plugin
- **Developer Experience**: New CSS-first configuration
- **Utility-First**: Rapid UI development

### Why shadcn/ui?

- **Copy-Paste Components**: Own your components, no package lock-in
- **Radix UI**: Accessible primitives out of the box
- **Customizable**: Full control over styling and behavior

## License

[Add license information]

## Contact

[Add contact information]
