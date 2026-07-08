<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Customizations and Rules for Hotel Shasha Website

## Context Preservation & Navigation
- **Bootstrap Rule**: At the start of every session or conversation, you MUST first read [gemini.md](file:///c:/Luminary/Projects/hotel-shasha-website/gemini.md) at the root of the project to load the active project roadmap, tech stack details, and current context. Do not run search/find commands if the information is already documented in `gemini.md`.

## Planning & Execution
- **Planning Style**: Follow the **GSD (Get Shit Done)** planning style:
  1. Research files directly related to the task before changing them.
  2. Maintain a clear, atomic list of TODOs in [task.md](file:///c:/Luminary/Projects/hotel-shasha-website/task.md) and update them as you complete each task.
  3. Never make assumptions; focus on writing clean, functional code, and verify builds using compiler check commands.
- **Package Manager**: Use `pnpm` exclusively (never `npm` or `yarn`). Use `pnpm run dev`, `pnpm build`, etc.

## Character Encoding Constraints
- **ASCII Only**: All text content, brand copy, code comments, and source files must use **only standard ASCII characters** (printable ASCII, codes 32-126). Avoid unicode quotes (`’`, `“`, `”`), hyphens/dashes (`–`, `—`), emojis, or other non-ASCII characters in HTML/JSX text and code, to ensure error-free rendering across all user devices.

## Terminal and Command Rules
- **Default Shell**: The default terminal is Windows Command Prompt (`cmd.exe`). Do not write powershell-specific commands (like `$env:PATH`, `Get-ChildItem`, or powershell piping) unless executing standard cross-platform CLI tools (e.g., `git`, `pnpm`, `next`).
- **Command Pre-Authorization**: Standard read-only and local operations are pre-approved. You are authorized to run read-only commands (`git status`, `git diff`, `git log`, `dir`, `grep`) and local dev scripts (`pnpm build`, `pnpm run dev`, etc.) as needed without redundant permission checks.
