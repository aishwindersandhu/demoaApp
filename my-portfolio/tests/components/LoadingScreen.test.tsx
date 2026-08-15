import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../../src/components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders the heading and progress step labels', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Analysing your palette')).toBeInTheDocument();
    ['Detecting skin regions', 'Classifying undertone', 'Building your colour palette'].forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('renders the decorative tone-strip swatches', () => {
    const { container } = render(<LoadingScreen />);
    expect(container.querySelectorAll('.loading-tone-strip__swatch')).toHaveLength(7);
  });
});
