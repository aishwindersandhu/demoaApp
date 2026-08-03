// Mirrors app/recommendations/models.py response models (server serialises to camelCase).

/** A single shade option for a product, e.g. `{ name: 'Warm Beige', hex: '#D9B896' }`. */
export interface Shade {
  name: string;
  hex: string;
}

/** A single recommended product returned by `/recommendations/{userId}`. */
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

/** A product category (e.g. foundation, blush) grouping its recommended products. */
export interface CategoryOut {
  key: string;
  label: string;
  icon: string;
  products: Array<ProductOut>;
}

/** Full response payload from `/recommendations/{userId}`. */
export interface RecommendationResponse {
  toneLabel: string;
  matchPercent: number;
  categories: Array<CategoryOut>;
  avoidColors: Array<string>;
  avoidLabel: string;
  avoidDescription: string;
}
