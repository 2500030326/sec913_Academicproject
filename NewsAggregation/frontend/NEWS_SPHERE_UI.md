# NewsSphere AI — UI Design Overview

NewsSphere AI is a premium, futuristic news aggregation and reading platform UI built with React, Tailwind CSS, and Framer Motion. This document outlines the visual style, components, pages, and architecture to present a polished demo-ready frontend called "NewsSphere AI".

## Key Screens
- Homepage: Full-width hero, trending slider, breaking ticker, featured headlines, startup spotlight.
- Article Page: Large hero image, AI summary, sentiment badge, reading progress bar, related carousel.
- AI Semantic Search: Glowing search UI, semantic network visualization, trending keywords.
- User Dashboard: Recommendations, saved articles, reading streak, personalized feed.
- Admin Dashboard: Analytics charts, moderation queue, content management.
- Mobile Responsive: Hamburger menu, bottom navigation, swipeable cards.

## Visual Style
- Theme: Futuristic dark with glassmorphism and neon accents.
- Background: #050816, #0B1026 radial & linear gradients.
- Primary Gradient: Purple → Blue → Cyan (Tailwind `gradient-neon`).
- Accent: Neon Cyan (#00d4ff), Electric Purple (#b833ff), Hot Pink (#ff006e).
- Typography: System UI (Segoe UI / Roboto) with bold headings and soft body text.
- Effects: Soft shadows, floating particles, smooth transitions, typing animations, skeleton loading.

## Components
- `Navbar`, `HeroSection`, `BreakingNewsTicker`, `TrendingSlider`, `NewsCard`, `Sidebar`, `ParticleBackground`, `SearchVisualization`, `AnimatedTicker`, `Footer`.
- Utility styles: `glass-morphism`, `gradient-text`, `btn-gradient`, `shadow-neon-*` for glow effects.

## Architecture Diagram
```mermaid
graph TD
  A[User Browser] -->|REST/GraphQL| B(React Frontend)
  B --> C{AI Layer}
  C --> D[Semantic Vector DB (MongoDB/Vector)]
  C --> E[Embedding Service (Transformer)]
  C --> F[Prompt/LLM Gateway]
  B --> G[Spring Boot API]
  G --> H[PostgreSQL]
  G --> I[Authentication / Users]
  G --> J[Article Storage Service]
  subgraph "AI Search"
    E --> D
    F --> E
  end
```

## Running the Frontend (dev)
- Ensure Node.js is installed.
- From `frontend/`:

```bash
npm install
npm run dev
```

## Notes and Next Steps
- The project is styled with Tailwind; tweak `tailwind.config.js` for new tokens.
- The frontend components include placeholders and mock data; connect to the Spring Boot backend REST API for live content and AI-powered endpoints.
- Consider adding database-backed migrations and seeders for demo content.

---

Designed for demo and presentation. Ask me to wire up sample API mocks, add screenshots, or generate a Figma-style spec.