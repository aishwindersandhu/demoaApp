import { List } from "postcss/lib/list";

export interface FaceDetails {
  skinTone: string;
  faceShape: string;
  colorCode: string;
  colorPalette : Array<List>;
  profile: Object;
}
export interface ImageData {
  data: FaceDetails;
}
export interface ImageReducerState {
  imageLink: string;
  imageData: ImageData;
}