# 🏛️ The Odyssey — Departmental Events Experience
### *Data Dive 5.0 | Departmental Curriculum & Symposium Roster*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**The Odyssey** is an immersive, cinematic departmental events portal engineered for modern university symposiums and technical fests. Built with a rich dark-mode aesthetic, classical typography, and dynamic micro-animations, the platform presents academic challenges, startup pitch arenas, and cultural galas through a chronological Homeric 5-Act structure.

---

## 🎭 The 5 Acts (Event Roster)

All events are scheduled for **September 10, 2026** across campus venues:

| Act | Event | Track / Category | Key Highlights & Awards |
|---|---|---|---|
| **Act I** | **DataVerse** | *Data Science & ML* | Python & ML fundamentals quiz followed by live model-building challenge. Prize pool: **₹2,000 / ₹1,000**. |
| **Act II** | **VizMinds** | *Data Visualization* | Beginner-friendly Power BI & BI challenge designed for 1st/2nd year students. Prize pool: **₹3,000**. |
| **Act III** | **Founders Gone Wild** | *Entrepreneurship* | Fast-paced Shark Tank-style startup ideation challenge with wild industry-technology combinations. |
| **Act IV** | **Game of Bids 2026** | *Sports & Strategy* | Ultimate IPL live auction experience with **₹80 Crore virtual purse** and 2026 IPL player pools. |
| **Act V** | **The Mythic Frame Gala** | *Keynote & 70mm Screen* | Annual keynote symposium & 70mm archival screening celebrating Homeric epics and cinema history. |

---

## ✨ Key Features

### 🎬 Responsive Cinematic Hero Video
- **Mobile & Desktop Optimized**: Uses responsive `16:9` widescreen framing on mobile (`aspect-video`) with ambient backdrop glow, preventing horizontal cropping on smartphone portrait screens.
- **Audio Control**: Built-in sound toggle with touch gesture fallback for iOS Safari and Android media policies.

### 🎴 3D Interactive Event Cards
- **Thematic Visuals**: Custom-curated hero graphics tailored to each event track (Matrix code rain for DataVerse, analytics dashboards for VizMinds, live cricket stadium for Game of Bids).
- **Quick QR Scanner**: Instant access to event registration links with dynamic SVG QR codes.
- **Category Accents**: Color-coded category badges with subtle ambient glow effects.

### 📋 Full Event Dossier & Interactive Modals
- **Multi-Format Video Trailers**: Seamless support for direct MP4 videos as well as embedded YouTube tutorials with autoplay.
- **Interactive Program Agenda**: Detailed multi-round schedules with presenters and time blocks.
- **Archival Galleries**: Verified high-resolution production stills and event photo galleries.
- **Add to Calendar**: Instant one-click **`.ics` calendar export** for Google Calendar, Apple Calendar, and Outlook.
- **Direct Registration**: Fast links to official registration forms with deadline tracking.

### 🏏 Dedicated IPL Auction Theme Experience
- Custom-built stats panel for **Game of Bids 2026** inside the dossier displaying:
  - 💰 **₹80Cr** Virtual Purse
  - 🏏 **100+** IPL Player Pool
  - ⚡ **2** Auction Rounds
  - 🏆 **Best Franchise Trophy**
  - Live animated event status badge

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom typography tokens
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Code Generation**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Calendar & Utility**: [file-saver](https://www.npmjs.com/package/file-saver)
- **Typography**: Google Fonts — *Cinzel*, *Cormorant Garamond*, *Plus Jakarta Sans*

---

## 📁 Project Structure

```text
the-odyssey---departmental-events-experience/
├── public/
│   ├── ODY.THEME.mp4           # Main cinematic hero background video
│   ├── odyssey_warrior_bg.jpg  # Fallback video poster & background layer
│   └── odyssey_bg.png          # Background parallax texture
├── src/
│   ├── components/
│   │   ├── EventCard3D.tsx     # 3D event card with QR & trailer trigger
│   │   ├── EventModal.tsx      # Comprehensive event dossier & media player
│   │   ├── Hero.tsx            # Responsive video hero section
│   │   ├── FixedBackground.tsx # Cinematic multi-layer vignette background
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── MediaShowcase.tsx   # Curated media reel showcase
│   │   ├── VoyageTimeline.tsx  # Chronological milestone view
│   │   ├── RegistrationModal.tsx # Pass generation & registration modal
│   │   ├── EventManagerDrawer.tsx # In-browser event management tool
│   │   └── Footer.tsx          # Campus & departmental footer
│   ├── data/
│   │   └── events.ts           # Departmental events database (Acts I to V)
│   ├── types.ts                # TypeScript interfaces & event data models
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Design system & Tailwind styling
│   └── main.tsx                # Application entry point
├── index.html                  # HTML entry point with Google Fonts
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vinitcharde/dep-event.git
   cd dep-event
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Build & Deployment

To generate a production-ready optimized build:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

The output files will be located in the `dist/` directory, ready to deploy on **Vercel**, **Netlify**, **GitHub Pages**, or any static hosting service.

---

## ⚙️ Configuration & Customization

To edit event details, dates, trailers, or add new acts:
1. Open [`src/data/events.ts`](src/data/events.ts).
2. Modify or add event objects matching the `DepartmentEvent` interface defined in [`src/types.ts`](src/types.ts).
3. The UI will automatically update with hot reload.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Developed for the Department of Data Science & Media Arts • Data Dive 5.0</sub>
</div>
