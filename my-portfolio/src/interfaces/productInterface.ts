// Mirrors app/recommendations/models.py response models (server serialises to camelCase).

export interface Shade {
  name: string;
  hex: string;
}

export interface ProductOut {
  id: string;
  brand: string;
  name: string;
  image: string;
  matchPercent: number;
  isTopPick: boolean;
  shades: Array<Shade>;
  price: string;
  darkBackground: boolean;
}

export interface CategoryOut {
  key: string;
  label: string;
  icon: string;
  products: Array<ProductOut>;
}

export interface RecommendationResponse {
  toneLabel: string;
  matchPercent: number;
  categories: Array<CategoryOut>;
  avoidColors: Array<string>;
  avoidLabel: string;
  avoidDescription: string;
}
