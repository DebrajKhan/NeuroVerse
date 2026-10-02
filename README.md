## Neuroverse: Brain Explorer

Neuroverse is a hyper-premium, cinematic scrollytelling web experience that functions as a live biological dashboard. It features a hardware-accelerated 360-degree rotating 3D brain, seamlessly transitioning between an auto-playing hero sequence, scroll-driven interactive anatomy breakdowns, and a live telemetry dashboard.

## Tech Stack

Framework: Next.js 14 (App Router)

Styling: Tailwind CSS (Focus on glassmorphism, precise spacing, and dark-mode UI)

Animation & UI: Framer Motion (for staggered scroll transitions) and Recharts (for live focus volatility graphs)

Rendering Engine: HTML5 <canvas> (for high-performance, buttery-smooth image-sequence playback)

Deployment: Vercel


## Typography & Visual Identity

To achieve an  biotech aesthetic, the typography is a highly curated mix of elegant serifs and precise sans-serifs:

DM Serif Display (Bold): Used for the main "NeuroVerse" title (with negative tracking for an editorial feel) and Lobe titles.

Bodoni Moda: Used for elegant connective words like "To" in the hero heading.

Cormorant Garamond (400 Italic): Adds a high-contrast, classic touch to the word "Welcome" and specific anatomical names (e.g., "Frontal").

Inter: Ensures clean, modern readability for all dashboard analytics, numbers, chart axes, and live telemetry percentages.

Color Palette: Pure interstellar void black (#030305) to seamlessly blend the canvas boundaries, accented by translucent glassmorphic cards and bioluminescent UI glows (Magenta/Orange for the left hemisphere, Cyan/Blue for the right).


## How I Built This & Key Learnings

uilding this project involved stepping away from basic web layouts and solving complex frontend performance challenges to make the browser feel like a native software application.

The Hybrid Canvas Engine: I learned how to build a 3-phase rendering engine using the HTML5 <canvas>.

Phase 1 (Hero): Uses requestAnimationFrame to auto-play the 360-degree rotation indefinitely on load.

Phase 2 (Scrollytelling): Implements scroll-intercept logic that pauses the auto-play and maps the window's scroll progress directly to the image frame index. This allows the user to manually "scrub" through the Frontal, Temporal, Occipital, and Parietal lobes.

Phase 3 (Dashboard): Seamlessly resumes the auto-rotation loop once the user reaches the lower analytics grid.

Eliminating Animation Stutter: I solved the "loop seam" problem where animations get trapped at the end of an image array. By decoupling the playback speed from the monitor's 60Hz refresh rate using fractional frame increments and applying modulo (%) arithmetic, the 3D spin loops perfectly without micro-stutters.

Dynamic Data Generation: I wrote custom React useEffect hooks to simulate live telemetry, including an algorithm that generates four random fluctuating integers for the active lobe labels that always mathematically sum to exactly 100%.


## Running Locally

First, install dependencies:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Otherwise navigate to http://localhost:3000 to view the live dashboard.
