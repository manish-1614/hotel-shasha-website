# Hotel Shasha — Jibhi, Himachal Pradesh

> Something beautiful is taking root.

This is the official repository for the **Hotel Shasha** website. We are currently in the **Planning & Architecture** phase, crafting a boutique luxury homestay experience nestled in the cedar forests of Jibhi.

## 🌲 The Vision
Shasha is more than a homestay; it's a "Paused Perfect" experience. Our design language focuses on:
- **Forest:** Deep greens and natural textures.
- **Warm Wood:** Earthy tones and mountain craftsmanship.
- **Parchment:** Minimalist, clean backgrounds.
- **Midnight:** Sleek, modern accents.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack dev)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Cormorant Garamond, Playfair Display, DM Sans, Caveat

## 🚀 Getting Started

> [!IMPORTANT]  
> This project **requires `pnpm`**. Please do not use `npm` or `yarn` as it will cause dependency and lockfile conflicts.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manish-1614/hotel-shasha-website.git
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

   The dev server binds to **`127.0.0.1:3000`** (explicit IPv4 localhost), which avoids some Windows/`localhost` resolution issues.

4. **Visit:** `http://127.0.0.1:3000` or `http://localhost:3000`

### Dev server won’t start? (port / “already running”)

Next.js 16 keeps a lock file at **`.next/dev/lock`**. If a previous `pnpm dev` crashed or a terminal was closed without stopping the server, you may see:

- `Port 3000 is in use…`
- `Another next dev server is already running`

**Fix (pick one):**

1. **Stop the old process** — In PowerShell, find the PID on port 3000 and stop it, or use Task Manager to end the stray `node` process for this project.

2. **Clear a stale lock and start again:**
   ```bash
   pnpm dev:force
   ```

3. **Use another port** (if something else needs 3000):
   ```bash
   pnpm dev -- --port 3001
   ```

4. **Listen on all interfaces** (phone / LAN testing):
   ```bash
   pnpm dev:network
   ```
   Then open `http://<your-LAN-IP>:3000` (Windows Firewall may prompt you to allow Node).

## 📈 Project Status
- [x] Initial Setup & Design Tokens
- [x] "Project Started" Landing Page
- [ ] Planning Phase (Refining Content & UX)
- [ ] Core Site Architecture
- [ ] Room Booking Integration

## 🌐 Deployment

This project is configured for **GitHub Pages** using GitHub Actions.

1. **Push Changes**: Every push to the `main` branch will automatically trigger a build and deployment.
2. **GitHub Settings**:
   - Go to your repository on GitHub.
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. **Wait for Build**: Check the **Actions** tab to see the progress of the `Deploy to GitHub Pages` workflow.
4. **Access Site**: Once complete, your site will be live at:  
   `https://manish-1614.github.io/hotel-shasha-website/`

---
*Nestled in silence, crafted with soul.*
