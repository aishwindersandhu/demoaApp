import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { UserImage } from '../../src/components/userUpload';
import { renderWithProviders } from '../testUtils';
import { makeImageReducerState, makeUtilsState } from '../fixtures';

describe('UserImage', () => {
  it('renders nothing extra when there is no image and it is not loading', () => {
    const { container } = renderWithProviders(<UserImage />, {
      preloadedState: {
        imageReducer: makeImageReducerState({ imageLink: '' }),
        utilsReducer: makeUtilsState({ isLoading: false }),
      },
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
  });

  it('renders the image preview when an image link is present', () => {
    renderWithProviders(<UserImage />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageLink: 'blob:mock-url' }) },
    });
    expect(screen.getByAltText('Image Preview')).toHaveAttribute('src', 'blob:mock-url');
  });

  it('shows the loading overlay and spinner while loading', () => {
    const { container } = renderWithProviders(<UserImage />, {
      preloadedState: { utilsReducer: makeUtilsState({ isLoading: true }) },
    });
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });
});
