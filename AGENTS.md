# Agent Guidelines for pintiproperti

## Core Principles

- **Prioritize readability over cleverness** - Write clear, maintainable code
- **Work atomically** - Complete one focused task at a time and confirm before proceeding
- **Stay on scope** - Do not add features or changes that weren't requested

## Workflow Guidelines

- **Before changes**: Ask clarifying questions if requirements are unclear
- **After changes**: Summarize what was modified and why
- **When uncertain**: Stop and ask rather than making assumptions

## Commands

- **Dev**: `pnpm dev` (starts Astro dev server)
- **Build**: `pnpm build` (builds the project)
- **Lint**: `pnpm lint` (runs ESLint on src/)
- **Format**: `pnpm format` (formats code with Prettier)
- **Preview**: `pnpm preview` (previews production build)

## Code Style

- **Framework**: Astro 5 with React 19 integration
- **Styling**: Tailwind CSS v4 (use utility classes)
- **Types**: TypeScript strict mode, always use explicit types
- **Imports**: Use `@/*` path alias for src/ (e.g., `import { cn } from "@/lib/utils"`)
- **React**: No JSX runtime imports needed (React 19), functional components only
- **Components**: Use class-variance-authority for variants, Radix UI primitives for accessibility
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for files
- **Formatting**: Prettier with astro + tailwindcss plugins (auto-sorts classes)
- **Linting**: ESLint with TypeScript, React, Astro, and jsx-a11y rules enabled
- **Error Handling**: TypeScript strict mode enforced

## TypeScript Rules

- **Package management**: Always use `pnpm` for all Node.js operations
- **Build commands**: Do not run `pnpm dev` or `pnpm build` unless explicitly requested
- **Code consistency**: Review existing codebase patterns before implementing new features
- **Type safety**: Ensure TypeScript strict mode compliance

## Commit Rules

- **Convention**: Always use conventional commits (e.g., `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, etc)
- **Case**: All lowercase for commit messages
- **Format**: Title/subject only (no body or footer)

## Pre-commit

Husky runs lint-staged: auto-fixes ESLint issues and formats code before commits.
