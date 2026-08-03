/**
 * Converts a base64 data URL (e.g. a webcam screenshot from react-webcam)
 * into a Blob, so it can be sent as file upload body to the backend.
 */
export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(','); // parts[0] = "data:<mime>;base64", parts[1] = the encoded data
  const mime = parts[0].match(/:(.*?);/)?.[1] || '';
  const binary = atob(parts[1]);
  const array = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new Blob([array], { type: mime });
}

/** Parses a "#rrggbb" hex string into its {r,g,b} components. */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/**
 * Picks the entry from `options` whose `hex` is closest to `targetHex`,
 * using Euclidean distance in RGB space. Used to find the product shade
 * that best matches the user's detected skin tone.
 */
export function findClosestByHex<T extends { hex: string }>(options: Array<T>, targetHex: string): T {
  const target = hexToRgb(targetHex);
  return options.reduce((closest, option) => {
    const a = hexToRgb(option.hex);
    const b = hexToRgb(closest.hex);
    const distA = (a.r - target.r) ** 2 + (a.g - target.g) ** 2 + (a.b - target.b) ** 2;
    const distB = (b.r - target.r) ** 2 + (b.g - target.g) ** 2 + (b.b - target.b) ** 2;
    return distA < distB ? option : closest;
  });
}
