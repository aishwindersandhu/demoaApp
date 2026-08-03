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
