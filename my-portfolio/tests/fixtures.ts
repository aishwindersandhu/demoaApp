import type { FaceDetails, Profile, ImageReducerState, colorStrip } from '../src/interfaces/imageDataInterface';
import type { ProductOut, CategoryOut } from '../src/interfaces/productInterface';

export const makeColorStrip = (overrides: Partial<colorStrip> = {}): colorStrip => ({
  name: 'Amber',
  hex: '#C97C3D',
  ...overrides,
});

export const makeProfile = (overrides: Partial<Profile> = {}): Profile => ({
  undertone: 'Warm',
  contrast: 'Medium',
  depth: 'Medium',
  warm_palette: [makeColorStrip({ name: 'Amber', hex: '#C97C3D' })],
  cool_palette: [makeColorStrip({ name: 'Rose', hex: '#C97C9D' })],
  dark_palette: [makeColorStrip({ name: 'Espresso', hex: '#3B2417' })],
  jewel_tones: [makeColorStrip({ name: 'Emerald', hex: '#0F6B4C' })],
  L: 60,
  a: 12,
  b: 20,
  ...overrides,
});

export const makeFaceDetails = (overrides: Partial<FaceDetails> = {}): FaceDetails => ({
  skinTone: 'Warm Beige',
  faceShape: 'Oval',
  colorCode: '#D9B896',
  colorPalette: ['#E8C9B0', '#D9B896', '#B8895F', '#F2DCC8'],
  profile: makeProfile(),
  ...overrides,
});

export const makeImageReducerState = (overrides: Partial<ImageReducerState> = {}): ImageReducerState => ({
  imageLink: '',
  imageData: { data: makeFaceDetails() },
  sessionId: 'test-session-id',
  ...overrides,
});

export interface UtilsState {
  isLoading: boolean;
  showCards: boolean;
  showBoard: string;
}

export const makeUtilsState = (overrides: Partial<UtilsState> = {}): UtilsState => ({
  isLoading: false,
  showCards: false,
  showBoard: '',
  ...overrides,
});

export const makeProduct = (overrides: Partial<ProductOut> = {}): ProductOut => ({
  id: overrides.id ?? `product-${Math.random().toString(36).slice(2)}`,
  brand: 'Test Brand',
  name: 'Test Product',
  image: 'https://cdn.example.com/product.jpg',
  matchPercent: 92,
  isTopPick: false,
  shades: [{ name: 'Warm Beige', hex: '#D9B896' }],
  price: '$24.00',
  darkBackground: false,
  ...overrides,
});

export const makeCategory = (overrides: Partial<CategoryOut> = {}): CategoryOut => ({
  key: 'foundation',
  label: 'Foundation',
  icon: '🧴',
  products: [makeProduct()],
  ...overrides,
});
