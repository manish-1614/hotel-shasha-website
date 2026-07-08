# 🏔️ Hotel Shasha Website Context & Map

This file preserves the project context, layout, and conventions to ensure development remains fast, organized, and aligned across sessions.

## 🛠️ Project Stack & Setup
- **Core Framework**: Next.js 16.2.0 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4 (with `@tailwindcss/postcss`), Framer Motion, Lucide React.
- **Package Manager**: `pnpm@10.10.0` (exclusively).
- **Scripts**:
  - `pnpm run dev`: Start Next.js development server on `127.0.0.1:3000`
  - `pnpm build`: Compile production bundle
  - `pnpm start`: Run production build
  - `pnpm run lint`: Run ESLint check

## 📂 Project Navigation Map
All main application code resides inside `src/`:
- `src/app/`: File-system routing and page endpoints.
  - `page.tsx` & `LandingClient.tsx`: Landing page
  - `stay/`: Room options & listings
  - `cuisine/`: Dining experience details
  - `experiences/`: Local excursions & things to do
  - `about/`: Brand story ("Paused Perfect")
  - `contact/`: Reservation inquiry form & location
  - `rates/`: Staying rates & tariffs
  - `gallery/`: Curated mountain photography
  - `privacy/`: Privacy policy
- `src/components/`: Reusable components (e.g., `src/components/ui/` for buttons, cards, wrappers).
- `src/data/`: Static configuration data (room listings, menu details, experiences).
- `src/lib/`: Helper utilities and shared functions.

## ⚠️ Core Development Rules
1. **ASCII Only**: All client-visible copy, text files, and source code must use **only standard ASCII characters** (printable ASCII, codes 32-126). Avoid smart quotes (`’`, `“`, `”`), em-dashes (`—`), and emojis in page text or metadata, to ensure rendering compatibility across all client devices.
2. **Terminal Shell**: The host system's default terminal is **Windows Command Prompt (`cmd.exe`)**. Never use powershell-specific syntax/aliases (e.g., `$env:VAR`, or powershell piping) in `run_command` blocks unless it is compatible with CMD.
3. **Planning & TODOs**: Follow the GSD (Get Shit Done) style. Maintain active tasks in `task.md` and high-level phases in `PLAN.md`.
4. **Context Bootstrap**: At the start of a new session/conversation, always read `gemini.md` first to understand the workspace layout, current progress, and stack features.
