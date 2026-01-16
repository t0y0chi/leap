# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `app/`; `layout.tsx` defines global chrome and `page.tsx` is the root landing view. Create feature routes as nested folders with their own `page.tsx` and, if needed, `layout.tsx`.
- Shared styling is in `app/globals.css`; static assets go in `public/`.
- Cross-cutting helpers sit in `lib/` (e.g., `lib/utils.ts`). Prefer small, pure utilities and import them where needed.
- Keep UI primitives/components colocated with their route when they are route-specific; promote to a shared folder only when reused across multiple routes.
- Keep the current screen map up to date in `screens.md` whenever you add or materially change routes or layouts.

## Build, Test, and Development Commands
- `npm install` — install dependencies (Node 18+ recommended for Next 16).
- `npm run dev` — start the local dev server with hot reload.
- `npm run build` — production build; use before release.
- `npm run start` — serve the built app.
- `npm run lint` — run ESLint (uses `eslint-config-next`).

## Coding Style & Naming Conventions
- Language: TypeScript by default; use `.tsx` for components.
- Formatting: follow ESLint; prefer 2-space indentation. Keep components functional and use hooks idiomatically.
- Styling: Tailwind CSS v4 is available; compose classes with `clsx` and `tailwind-merge` for conditional styling.
- Naming: kebab-case for routes/folders, camelCase for variables/functions, PascalCase for components.
- Keep components small and presentational; move non-trivial logic into hooks or utilities under `lib/`.

## Testing Guidelines
- No test harness is bundled yet; when adding tests, colocate them with the code (e.g., `component.test.tsx`) or under `__tests__/`.
- Use React Testing Library for component behavior and Playwright for E2E if you introduce them; document any new scripts in `package.json`.
- Cover edge cases for utilities in `lib/` and critical flows for new pages.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject lines (e.g., "Add dashboard progress cards"); group related changes.
- Pull Requests: include a summary of scope, testing performed (`npm run lint`/manual checks), and screenshots or GIFs for UI changes. Link to issues or task IDs when applicable.
- Keep PRs scoped and reviewable; prefer incremental follow-ups over large, multi-feature bundles.

## Security & Configuration Tips
- Keep secrets in `.env.local` and never commit them. Document any required environment variables in PR descriptions.
- Validate user input on both client and server boundaries; avoid trusting query params or form data without checks.
