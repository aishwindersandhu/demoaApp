# Frontend — Skin Tone & Colour Analysis

A React + TypeScript web app for AI-powered skin tone analysis. Upload or capture a photo to receive your skin tone, undertone, and a full personalised colour palette.

> UI/UX design inspired by Pinterest's masonry layout and aesthetic.

---

## Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** — global state for image and analysis result
- **Vite** — build tooling
- **TailwindCSS** — utility-first styling
- **react-webcam** — in-browser camera capture

---

## Getting Started

**Clone the repo**
```bash
git clone https://github.com/aishwindersandhu/demoaApp
cd my-portfolio
git checkout SkinDetection-Panel
```

**Install dependencies**
```bash
npm install
```

**Run locally**
```bash
npm run dev
```


---

## Features

- Upload a photo or capture one via webcam
- Displays detected skin tone hex and depth label
- Displays undertone of the individual
- Colour palette tabs: warm, cool, dark, jewel tones
- Dual theme: Parchment (light) and Slate & Bone (dark)
- Playfair Display + DM Sans typography

---

## Current Limitations

- Desktop-only layout — mobile responsive version is under development
- Error handling is minimal — edge cases not fully covered
- The app is under active development
- The app generates hex color codes and not a proper naming convention.
---

## Current Implementation

>Upload Screen
Upload a photo or capture one directly via webcam. The image is previewed before analysis is triggered. 

- **Uploading an Image**

  ![alt text](uploadScren.jpg)

- **Screen Loading**
  ![alt text](loading-screen.jpg)


## Analysis Result - Sidebar
After analysis, the sidebar displays your detected skin tone hex, depth label, undertone classification, and your personalised makeup palette: Conceal, Base, Contour, and Highlight — each shade derived mathematically from your skin's LAB values.
- **Slate & Bone (Dark theme)**

  ![Dark Theme](image.png) 

- **Parchment (Light theme)**

  ![Light Theme](light-1.jpg)

- **Toggle button**
  <img width="286" height="63" alt="image" src="https://github.com/user-attachments/assets/ccb87b89-dbaf-4a08-a54e-7d055f0cab31" />

  <img width="297" height="52" alt="toggle-btn-dark" src="https://github.com/user-attachments/assets/a8307f6c-398e-4e2c-9166-3f2a310446da" />





The app ships with two themes switchable from the sidebar. Both use the same underlying CSS token system — only the token values change between themes.

## Array of user skin tones**
  - **Deep Skin tone**
 
 <img width="340" height="565" alt="deep-color-analysis" src="https://github.com/user-attachments/assets/def7d403-ce00-4606-b761-0f0d354c32b6" />

  - **Rich Deep Skin tone**
  <img width="357" height="541" alt="rich-deep" src="https://github.com/user-attachments/assets/e76ed64c-cd01-4bb0-a862-df7996eb5440" />

  - **Fair Skin tone**
 <img width="351" height="628" alt="Fair-1" src="https://github.com/user-attachments/assets/e5ed0dcc-aeb4-40ca-b173-f480b17d4031" />

  - **Medium Skin tone**
  <img width="341" height="570" alt="image" src="https://github.com/user-attachments/assets/ada822b7-bf2e-450b-be42-e1177ed520d0" />
  
  **Light Skin tone**
  <img width="352" height="592" alt="light-1" src="https://github.com/user-attachments/assets/998fb98d-7b81-4097-979c-410a627993fa" />

## Colour Palettes
Three palette categories are displayed in the Colours tab: Warm Colors, Cool Colors, and Dark Colors. Each palette contains 6 shades derived from the person's skin L value, with hues adjusted for their undertone.

![alt text](Dark-color-strips.jpg)

- Warm Colors — earthy tones: camel, rust, burnt orange, mustard, warm olive
- Cool Colors — cool-leaning tones: navy, slate blue, emerald, plum, lavender
- Dark Colors — deep universal wearables: wine, burgundy, forest green, midnight blue, deep plum

## Color Swatch interaction
![alt text](color-strip-UX.jpg)

Hovering a swatch reveals the colour name and hex code with a copy button.

## Roadmap

- [ ] Mobile responsive layout
- [ ] Improved upload and webcam capture UI
- [ ] Proper error handling with fallback UI
- [ ] Additional colour palette categories
- [ ] More UI animations for smoother UX
- [ ] Unit tests for key components
- [ ] Performance optimisation
