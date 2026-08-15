import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import { makeFaceDetails, makeImageReducerState, makeUtilsState } from '../fixtures';

const navigateSpy = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => navigateSpy };
});

vi.mock('../../src/api/imageAPI', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/api/imageAPI')>();
  return {
    ...actual,
    useGetRecommendationsMutation: () => [vi.fn(), { data: undefined, isLoading: true, isError: false }],
  };
});

import { ResultsPage } from '../../src/components/Results';

describe('ResultsPage', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
  });

  it('shows the loading screen while analysis is in flight', () => {
    renderWithProviders(<ResultsPage />, {
      preloadedState: { utilsReducer: makeUtilsState({ isLoading: true }) },
    });
    expect(screen.getByText('Analysing your palette')).toBeInTheDocument();
  });

  it('shows a fallback and navigates home when there is no analysis data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ResultsPage />, {
      preloadedState: {
        imageReducer: { ...makeImageReducerState(), imageData: null } as any,
      },
    });
    expect(screen.getByText('No analysis found')).toBeInTheDocument();
    await user.click(screen.getByText('Go Back'));
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('renders the skin detection dashboard once analysis data is available', () => {
    const faceDetails = makeFaceDetails({ skinTone: 'Warm Beige' });
    renderWithProviders(<ResultsPage />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });
    // "Warm Beige" appears both in the desktop UserDetails card and the (hidden) mobile drawer.
    expect(screen.getAllByText('Warm Beige').length).toBeGreaterThan(0);
  });
});
