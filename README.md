 # Teacher's Day Gift & Interactive Keepsake

An interactive digital Teacher's Day gift built with React and Vite. The experience starts as a wrapped gift and unfolds into a series of personalized keepsakes: a golden apple, a handwritten letter, an animated thank-you celebration, and a gratitude garden.

## Experience

- A DISTROBYTEZ-inspired boot screen introduces the keepsake.
- Unwrap the animated gift box to enter the keepsake collection.
- Explore the golden apple, handwritten letter, thank-you animation, and gratitude garden.
- Personalize the teacher, sender, subject, and school details from the settings control.
- Play the music-box melody or mute sound effects independently.
- Rewrap the gift and replay the boot screen at any time.
- Enjoy a responsive layout designed for desktop and mobile screens.

## Tech Stack

- React 19 with TypeScript
- Vite 6
- Tailwind CSS 4
- Motion for React animations
- Lucide React icons
- HTML audio and browser APIs for the sound experience

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:3000`.

No API key or external service is required for the current experience.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run the TypeScript compiler without emitting files. |
| `npm run clean` | Remove generated build and server files. |

Before sharing a change, run:

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
├── App.tsx                         # Main experience and keepsake navigation
├── index.css                       # Global styles and design tokens
├── types.ts                        # Shared TypeScript types
├── components/
│   ├── AnimatedThanks.tsx           # Thank-you celebration
│   ├── AppleKeepsake.tsx            # Golden apple keepsake
│   ├── DistroBytezBootScreen.tsx   # Intro boot animation
│   ├── GiftBoxIntro.tsx             # Wrapped gift and unwrap flow
│   ├── GratitudeGarden.tsx          # Gratitude garden
│   ├── HandwrittenLetter.tsx        # Personalized letter
│   ├── PastelBackgroundShapes.tsx   # Decorative background shapes
│   └── PersonalizeModal.tsx         # Recipient and sender settings
├── assets/images/                  # Image assets used by the experience
└── utils/
    ├── audio.ts                     # Music and sound controls
    └── confetti.ts                  # Celebration effects
```

## Personalization

Use the **Personalize** control in the top-right app bar to update the recipient and sender details. The defaults are defined in the `profile` state in [src/App.tsx](src/App.tsx). The modal and individual keepsakes consume that shared profile so the changes remain consistent throughout the experience.

## Production Build

Build the app with:

```bash
npm run build
```

The generated `dist/` directory is static and can be deployed to any static hosting provider that supports single-page applications. For a local production preview:

```bash
npm run preview
```

## License

This project does not currently declare a license. Add one before distributing it publicly.
