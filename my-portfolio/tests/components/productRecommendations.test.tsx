import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import { makeCategory, makeProduct, makeImageReducerState, makeFaceDetails } from '../fixtures';
import type { RecommendationResponse } from '../../src/interfaces/productInterface';

const mockTrigger = vi.fn();
const mockMutationState: { data: RecommendationResponse | undefined; isLoading: boolean; isError: boolean } = {
  data: undefined,
  isLoading: false,
  isError: false,
};

vi.mock('../../src/api/imageAPI', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/api/imageAPI')>();
  return {
    ...actual,
    useGetRecommendationsMutation: () => [mockTrigger, mockMutationState],
  };
});

import { ProductRecommendations } from '../../src/components/productRecommendations';

const makeResponse = (categories: RecommendationResponse['categories']): RecommendationResponse => ({
  toneLabel: 'Warm Beige',
  matchPercent: 91,
  categories,
  avoidColors: [],
  avoidLabel: '',
  avoidDescription: '',
});

describe('ProductRecommendations', () => {
  beforeEach(() => {
    mockTrigger.mockReset();
    mockMutationState.data = undefined;
    mockMutationState.isLoading = false;
    mockMutationState.isError = false;
  });

  it('shows a loading message while recommendations are being fetched', () => {
    mockMutationState.isLoading = true;
    renderWithProviders(<ProductRecommendations />, {
      preloadedState: { imageReducer: makeImageReducerState({ imageData: { data: makeFaceDetails() } }) },
    });
    expect(screen.getByText('Finding your matches')).toBeInTheDocument();
  });

  it('shows an error message when the request fails', () => {
    mockMutationState.isError = true;
    renderWithProviders(<ProductRecommendations />);
    expect(screen.getByText("Couldn't load product recommendations.")).toBeInTheDocument();
  });

  it('renders a filter pill and a shelf for every category once data loads', () => {
    mockMutationState.data = makeResponse([
      makeCategory({ key: 'foundation', label: 'Foundation', products: [makeProduct({ name: 'Silk Foundation' })] }),
      makeCategory({ key: 'lip', label: 'Lip', products: [makeProduct({ name: 'Velvet Lipstick' })] }),
    ]);
    renderWithProviders(<ProductRecommendations />);

    expect(screen.getByText('Warm Beige · 91% overall match')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Foundation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lip' })).toBeInTheDocument();
    expect(screen.getByText('Silk Foundation')).toBeInTheDocument();
    expect(screen.getByText('Velvet Lipstick')).toBeInTheDocument();
  });

  it('filters to a single category when a filter pill is clicked (uncontrolled mode)', async () => {
    const user = userEvent.setup();
    mockMutationState.data = makeResponse([
      makeCategory({ key: 'foundation', label: 'Foundation', products: [makeProduct({ name: 'Silk Foundation' })] }),
      makeCategory({ key: 'lip', label: 'Lip', products: [makeProduct({ name: 'Velvet Lipstick' })] }),
    ]);
    renderWithProviders(<ProductRecommendations />);

    await user.click(screen.getByRole('button', { name: 'Lip' }));

    expect(screen.getByText('Velvet Lipstick')).toBeInTheDocument();
    expect(screen.queryByText('Silk Foundation')).not.toBeInTheDocument();
  });

  it('notifies the parent with the loaded categories', () => {
    const categories = [makeCategory({ key: 'foundation', label: 'Foundation' })];
    mockMutationState.data = makeResponse(categories);
    const onCategoriesLoaded = vi.fn();
    renderWithProviders(<ProductRecommendations onCategoriesLoaded={onCategoriesLoaded} />);
    expect(onCategoriesLoaded).toHaveBeenCalledWith(categories);
  });

  it('supports an externally controlled filter', () => {
    mockMutationState.data = makeResponse([
      makeCategory({ key: 'foundation', label: 'Foundation', products: [makeProduct({ name: 'Silk Foundation' })] }),
      makeCategory({ key: 'lip', label: 'Lip', products: [makeProduct({ name: 'Velvet Lipstick' })] }),
    ]);
    renderWithProviders(<ProductRecommendations selectedFilter="Lip" onSelectedFilterChange={vi.fn()} />);
    expect(screen.getByText('Velvet Lipstick')).toBeInTheDocument();
    expect(screen.queryByText('Silk Foundation')).not.toBeInTheDocument();
  });

  it('fetches recommendations once on mount using the session id and analyzed face data', () => {
    const faceDetails = makeFaceDetails();
    renderWithProviders(<ProductRecommendations />, {
      preloadedState: {
        imageReducer: makeImageReducerState({ sessionId: 'session-abc', imageData: { data: faceDetails } }),
      },
    });
    expect(mockTrigger).toHaveBeenCalledWith({ userId: 'session-abc', body: faceDetails });
  });
});
