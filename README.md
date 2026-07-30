# ⚡ Spider-Verse Multiverse OS Portfolio

An award-winning inspired, production-quality interactive portfolio website designed like a futuristic Spider-Verse Operating System. Built with **Vanilla JavaScript (ES Modules)**, **HTML5 Canvas 2D Physics (Verlet Integration)**, **GSAP**, **Web Audio API**, **Supabase SDK**, **PostgreSQL**, and **Vite**.

> **Note**: This portfolio features 100% original spider web graphics, cyberpunk city skylines, glowing neon typography, comic dynamic panels, and synthesized audio. It does not use any copyrighted Marvel or Spider-Man artwork, logos, characters, or assets.

---

## 🌟 Key Features

- **Full-Screen Cinematic Loader**: Multiverse matrix particle loader (`0% -> 100%`) with audio feedback and exact step calibration (`INITIALIZING MULTIVERSE...`, `Loading Physics...`, `Loading Assets...`, `Loading Database...`, `Connecting Systems...`, `WELCOME`).
- **Verlet Rope Physics & Swinging Web Logo**: Physics engine with spring tension, damping, and interactive mouse dragging. Pull the logo and release to watch harmonic pendulum oscillations!
- **Interactive Web Shooter**: Click anywhere on the canvas to fire elastic sticky spider webs connecting your pointer to nearby building nodes.
- **Neon City Skyline & Cyber Rain Canvas**: Multi-layered parallax cityscape with moon, moving clouds, fog, and rain splash particles.
- **Custom Glowing Reticle Cursor**: Spider-Verse reticle cursor with particle trail and hover feedback.
- **Dynamic Supabase Integration**: Real-time DB querying for Projects, Skills, Experience, Achievements, Certificates, Statistics, and Messages. Includes an **Automatic Hybrid Mock Engine** that renders full data even before entering Supabase API keys!
- **Interactive Developer API Dashboard**: Recruiter/developer console featuring live JSON responses for 7 REST endpoints, latency counters (`ms`), HTTP status badges (`200 OK`), request history log, syntax highlighting, and instant cURL / JSON copy tools.
- **Complete Postman Collection**: Includes an exportable `postman_collection.json` v2.1 file containing all GET & POST endpoints with sample request/response payloads.
- **Achievements & Certificates**: Dynamic cards displaying hackathon awards, honors, cloud architecture degrees, and credential verification links.
- **Live GitHub REST API Telemetry**: Fetches live repositories, stars, forks, and programming language statistics.
- **Web Audio API Soundscape Synthesizer**: Procedural rain soundscape + synthesized action audio FX (thwips, clicks, glitch static, success chimes) with a Mute/Unmute toggle.
- **Multiverse CLI Terminal Easter Egg**: Press `` ` `` or `~` to launch an interactive developer CLI console.

---

## 📁 Project Directory Structure

```
spiderverse-portfolio/
├── index.html                  # Semantic HTML5, SEO metadata, JSON-LD, OpenGraph
├── package.json                # Dependencies (Vite, GSAP, @supabase/supabase-js)
├── vite.config.js              # Vite configuration
├── supabase-schema.sql         # Database SQL schema script & RLS policies (8 tables)
├── postman_collection.json     # Complete Postman Collection v2.1 export
├── public/
│   ├── favicon.svg             # Web icon
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # XML Sitemap
├── README.md                   # Comprehensive documentation
└── src/
    ├── style.css               # Spider-Verse Design System & Halftone CSS
    ├── main.js                 # App entry point & module orchestrator
    ├── modules/
    │   ├── audio/
    │   │   └── soundscape.js   # Synthesized Web Audio engine
    │   ├── canvas/
    │   │   ├── loaderCanvas.js     # Matrix particle loading canvas
    │   │   ├── rainSkylineCanvas.js# Parallax skyline, rain & clouds canvas
    │   │   └── verletWebCanvas.js  # Verlet rope physics & swinging web logo canvas
    │   ├── supabase/
    │   │   ├── supabaseClient.js   # Supabase client initializer with hybrid fallback
    │   │   └── dataService.js      # Data provider for all 8 entities with fallbacks
    │   ├── github/
    │   │   └── githubService.js    # Live GitHub REST API fetcher
    │   └── ui/
    │       ├── customCursor.js  # Glowing reticle cursor with particle trail
    │       ├── comicEffects.js  # Dynamic action bubbles ("THWIP!", "BAM!")
    │       ├── achievements.js  # Easter egg notification system
    │       └── terminal.js      # Multiverse CLI Terminal modal
    └── components/
        ├── loadingScreen.js     # Multiverse OS initializer screen
        ├── nav.js               # Web-hanging navbar with audio & CLI buttons
        ├── hero.js              # Interactive Hero section
        ├── stats.js             # Animated metric counters
        ├── about.js             # Character stats card & multiverse timeline
        ├── skills.js            # Skill matrix with web progress meters
        ├── projects.js          # 3D tilt project cards & web pull modal
        ├── achievements.js      # Dynamic honors & awards section
        ├── certificates.js      # Dynamic verified credentials section
        ├── githubSection.js     # Live GitHub telemetry panel
        ├── experience.js        # Multiverse career continuum timeline
        ├── apiConsole.js        # Developer API tester & JSON viewer
        ├── contact.js           # Signal transmitter contact form
        └── footer.js            # Multiverse OS status footer
```

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be created inside the `dist/` folder.

---

## ⚡ Supabase Setup Configuration

To connect live Supabase cloud database:

1. Create a project at [Supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Paste the contents of [`supabase-schema.sql`](./supabase-schema.sql) and click **Run**. This creates all 8 tables (`projects`, `skills`, `experience`, `achievements`, `certificates`, `statistics`, `social_links`, `messages`) and sets up public read/write RLS policies.
4. Copy your project credentials and create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```
5. Restart `npm run dev`. The top navigation badge will automatically flip to **`● SUPABASE REALTIME`**!

---

## 💻 Developer API & Postman Testing

The portfolio features an embedded interactive API Console and exportable Postman Collection:

### Available Endpoints
- `GET /api/v1/projects` - Returns list of active multiverse projects
- `GET /api/v1/skills` - Returns technology stack matrix & proficiency ratings
- `GET /api/v1/experience` - Returns multiverse career timeline entries
- `GET /api/v1/achievements` - Returns awards & hackathon achievements
- `GET /api/v1/certificates` - Returns verified certifications & credential links
- `GET /api/v1/statistics` - Returns system telemetry counts
- `GET /api/v1/github-stats` - Returns live GitHub repository metrics
- `POST /api/v1/messages` - Submits a message payload to Supabase `messages` table

### Postman Collection Import
Import [`postman_collection.json`](./postman_collection.json) directly into Postman to test all endpoints with sample request/response payloads!

### Sample cURL Command
```bash
curl -X POST "https://spiderverse-portfolio.vercel.app/api/v1/messages" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Miles Morales",
    "email": "miles@spider-verse.org",
    "subject": "Full Stack Lead Collaboration",
    "message": "Loved the Verlet physics canvas engine! Lets build something amazing."
  }'
```

---

## ⌨️ Easter Eggs & Keyboard Shortcuts

- **Developer CLI Terminal**: Press `` ` `` or `~` to launch the terminal console. Try commands: `help`, `projects`, `stats`, `thwip`, `dimension`, `clear`.
- **Audio Soundscape**: Click **`🔊 SOUND ON`** in the header to activate procedural ambient rain and synthesized action audio FX.
- **Web Shooter**: Click anywhere on the Hero canvas to shoot sticky spider webs!
