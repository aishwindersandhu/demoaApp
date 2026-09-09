# Face Analyser

- This project detects an uploaded or webcam-captured photo of a user's face and analyses their skin tone, undertone, and a matching colour palette.
- Results are shown across three boards: **Colours** (undertone, contrast, colour/jewel-tone palettes), **Makeup** (personalised product recommendations matched to the detected skin tone), and **Products** (placeholder — coming soon).
- Built with React 19, TypeScript, Redux Toolkit (incl. RTK Query for API calls), React Router, and plain CSS (light/dark theming via CSS custom properties). Uses `react-webcam` for in-browser photo capture.

# Installation
- Clone the repo: https://github.com/aishwindersandhu/demoaApp/tree/FaceCapture-Component
- Run `npm install` to install all dependencies and packages.

# Run locally
- Start the frontend with `npm run dev`.
- The frontend expects the face-analysis backend running at `http://127.0.0.1:8000` (see `src/api/imageAPI.ts` — swap in the production URL there when deploying). The backend is a separate FastAPI project and isn't part of this repo.

# Scripts
- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) and build for production
- `npm run lint` — run ESLint
- `npm run test` — run the test suite once (Vitest + Testing Library)
- `npm run test:watch` — run tests in watch mode
- `npm run preview` — preview the production build locally

# API connection
- The project talks to the backend via the RTK Query API slice in `src/api/imageAPI.ts`: `POST /analyze` (photo → skin tone/palette) and `POST /recommendations/{userId}` (analysis → matched products).
- The backend has no real face-detection step — it colour-samples a fixed center region of the photo — so it can't distinguish "no face," "wrong subject," or a group photo from a genuine single-face match. A failed detection (no usable skin tone found) still returns HTTP 200 with an "unknown" result rather than an error.
- The frontend now handles both request failures (network/5xx) and this "unknown" result as explicit error states with a retry prompt, rather than silently rendering empty/garbage data.

# Known limitations / TO DO
- Group photos and multi-face images aren't rejected — the backend picks whatever is in the center of the frame with no awareness of how many faces are present. Fixing this needs real face-detection support added on the backend.
- The Products board is a placeholder; only Makeup currently surfaces recommendations.
- Continue improving UI polish and performance.
- As part of future scope, stage this on a public server.
