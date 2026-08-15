import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FacePalette } from '../../src/components/facePalette';
import { makeFaceDetails } from '../fixtures';

describe('FacePalette', () => {
  const colorPalette = ['#E8C9B0', '#D9B896', '#B8895F', '#F2DCC8'];
  const faceDetails = makeFaceDetails({ colorPalette });

  it('renders all four labeled swatches with their hex codes', () => {
    render(<FacePalette {...faceDetails} />);
    ['Conceal', 'Base', 'Contour', 'Highlight'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    colorPalette.forEach((hex) => {
      expect(screen.getByText(hex)).toBeInTheDocument();
    });
  });

  it('renders a copy button for every swatch', () => {
    render(<FacePalette {...faceDetails} />);
    expect(screen.getAllByRole('button')).toHaveLength(colorPalette.length);
  });
});
