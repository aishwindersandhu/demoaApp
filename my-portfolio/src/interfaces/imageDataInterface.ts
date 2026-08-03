/** A single named colour swatch, e.g. `{ hex: '#8B6355', name: 'Cinnamon' }`. */
export interface colorStrip{
  hex: string;
  name: string;
}

/** Detailed colour profile derived from the analyzed face (undertone, contrast, palettes, Lab values). */
export interface Profile{
    undertone: string;
    contrast: string;
    depth: string;
    warm_palette: Array<colorStrip>;
    cool_palette: Array<colorStrip>;
    dark_palette: Array<colorStrip>;
    jewel_tones: Array<colorStrip>;
    // CIE Lab colour-space coordinates of the detected skin tone
    L: number;
    a: number;
    b: number;
}

/** Full face-analysis result returned by the `/analyze` backend endpoint. */
export interface FaceDetails {
  skinTone: string;
  faceShape: string;
  colorCode: string;
  // Ordered makeup swatches: [Conceal, Base, Contour, Highlight] — see facePalette.tsx
  colorPalette : Array<string>;
  profile: Profile;
}

/** Wrapper matching the shape of the backend response payload (`{ data: FaceDetails }`). */
export interface ImageData {
  data: FaceDetails;
}

/** Shape of the "image" Redux slice state. */
export interface ImageReducerState {
  imageLink: string;
  imageData: ImageData;
  sessionId: string;
}