import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import CardComponent from '../../src/components/cardComponent';
import { renderWithProviders } from '../testUtils';
import { makeFaceDetails, makeImageReducerState } from '../fixtures';

describe('CardComponent', () => {
  it('renders the dominant skin tone card', () => {
    const faceDetails = makeFaceDetails({ skinTone: 'Warm Beige', colorCode: '#D9B896' });
    renderWithProviders(<CardComponent />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });
    expect(screen.getByText('Dominant Skin Tone')).toBeInTheDocument();
    expect(screen.getByText('Warm Beige')).toBeInTheDocument();
  });

  it('renders a colour palette dot for each palette entry', () => {
    const faceDetails = makeFaceDetails({ colorPalette: ['#111111', '#222222', '#333333'] });
    const { container } = renderWithProviders(<CardComponent />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });
    expect(screen.getByText('Color Palette')).toBeInTheDocument();
    expect(container.querySelectorAll('.rounded-full').length).toBeGreaterThanOrEqual(3);
  });
});
