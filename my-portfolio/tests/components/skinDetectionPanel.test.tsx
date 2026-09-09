import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import { makeFaceDetails, makeImageReducerState } from '../fixtures';

const mockTrigger = vi.fn();
const mockMutationState: { data: undefined; isLoading: boolean; isError: boolean } = {
  data: undefined,
  isLoading: true,
  isError: false,
};

vi.mock('../../src/api/imageAPI', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/api/imageAPI')>();
  return {
    ...actual,
    useGetRecommendationsMutation: () => [mockTrigger, mockMutationState],
  };
});

import { SkinDetection } from '../../src/components/skinDetectionPanel';

describe('SkinDetection', () => {
  beforeEach(() => {
    mockTrigger.mockReset();
    mockMutationState.data = undefined;
    mockMutationState.isLoading = true;
    mockMutationState.isError = false;
  });

  const faceDetails = makeFaceDetails({ skinTone: 'Warm Beige', colorCode: '#D9B896' });

  it('renders the detected tone details and defaults to the Colours board', () => {
    renderWithProviders(<SkinDetection />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });
    // "Warm Beige" appears both in the desktop UserDetails card and the (hidden) mobile drawer.
    expect(screen.getAllByText('Warm Beige').length).toBeGreaterThan(0);
    expect(screen.getByText('Colour analysis')).toBeInTheDocument();
  });

  it('switches to the Makeup board when its tab is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkinDetection />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });

    await user.click(screen.getAllByText('Makeup')[0]);

    expect(screen.getByText('Finding your matches')).toBeInTheDocument();
  });

  it('shows a placeholder on the Products board instead of recommendations', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkinDetection />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });

    await user.click(screen.getAllByText('Products')[0]);

    expect(screen.getByText('Products, coming soon')).toBeInTheDocument();
    expect(screen.queryByText('Finding your matches')).not.toBeInTheDocument();
  });

  it('toggles the theme mode label when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkinDetection />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: faceDetails } }) },
    });

    expect(screen.getAllByText('Dark mode').length).toBeGreaterThan(0);
    await user.click(screen.getAllByText('Dark mode')[0]);
    expect(screen.getAllByText('Light mode').length).toBeGreaterThan(0);
  });
});
