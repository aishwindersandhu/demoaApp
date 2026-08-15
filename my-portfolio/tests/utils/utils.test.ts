import { describe, it, expect } from 'vitest';
import { base64ToBlob, hexToRgb, findClosestByHex } from '../../src/utils/utils';

describe('hexToRgb', () => {
  it('parses a standard hex color into its r/g/b components', () => {
    expect(hexToRgb('#D9B896')).toEqual({ r: 217, g: 184, b: 150 });
  });

  it('parses pure black and pure white', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('is case-insensitive', () => {
    expect(hexToRgb('#abcdef')).toEqual(hexToRgb('#ABCDEF'));
  });
});

describe('findClosestByHex', () => {
  const options = [
    { name: 'Warm Beige', hex: '#D9B896' },
    { name: 'Deep Espresso', hex: '#3B2417' },
    { name: 'Porcelain', hex: '#F5E1D3' },
  ];

  it('returns the option with the smallest Euclidean distance to the target', () => {
    // Very close to "Porcelain"
    expect(findClosestByHex(options, '#F5E0D2').name).toBe('Porcelain');
  });

  it('returns an exact match when one is present', () => {
    expect(findClosestByHex(options, '#3B2417').name).toBe('Deep Espresso');
  });

  it('returns the sole option when only one is given', () => {
    const single = [{ name: 'Only', hex: '#123456' }];
    expect(findClosestByHex(single, '#FFFFFF')).toBe(single[0]);
  });

  it('picks the first closest option when distances tie', () => {
    const tied = [
      { name: 'A', hex: '#000000' },
      { name: 'B', hex: '#FFFFFF' },
    ];
    // Equidistant from both black and white
    expect(findClosestByHex(tied, '#7F7F7F').name).toBe('A');
  });
});

describe('base64ToBlob', () => {
  it('converts a base64 data URL into a Blob with the correct MIME type', () => {
    // "hello" base64-encoded
    const dataUrl = 'data:text/plain;base64,aGVsbG8=';
    const blob = base64ToBlob(dataUrl);
    expect(blob.type).toBe('text/plain');
    expect(blob.size).toBe(5);
  });

  it('handles image MIME types such as those from webcam screenshots', () => {
    const dataUrl = 'data:image/png;base64,iVBORw0KGgo=';
    const blob = base64ToBlob(dataUrl);
    expect(blob.type).toBe('image/png');
  });

  it('produces content that round-trips back to the original string', async () => {
    const original = 'hello world';
    const dataUrl = `data:text/plain;base64,${btoa(original)}`;
    const blob = base64ToBlob(dataUrl);
    const text = await blob.text();
    expect(text).toBe(original);
  });
});
