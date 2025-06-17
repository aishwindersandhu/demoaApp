export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || '';
  const binary = atob(parts[1]);
  const array = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new Blob([array], { type: mime });
}
