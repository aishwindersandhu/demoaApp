export interface colorStrip{
  hex: string;
  name: string;
}
export interface Profile{
    undertone: string;
    contrast: string;
    depth: string;
    warm_palette: Array<colorStrip>;
    cool_palette: Array<colorStrip>;
    dark_palette: Array<colorStrip>;
    jewel_tones: Array<colorStrip>;
    L: number;
    a: number;
    b: number;
}
export interface FaceDetails {
  skinTone: string;
  faceShape: string;
  colorCode: string;
  colorPalette : Array<string>;
  profile: Profile;
}
export interface ImageData {
  data: FaceDetails;
}
export interface ImageReducerState {
  imageLink: string;
  imageData: ImageData;
  sessionId: string;
}