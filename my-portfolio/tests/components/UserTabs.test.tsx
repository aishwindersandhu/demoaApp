import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserTabs } from '../../src/components/UserTabs';
import { renderWithProviders } from '../testUtils';

describe('UserTabs', () => {
  it('renders all three board tabs with Colours selected by default', () => {
    renderWithProviders(<UserTabs />);
    expect(screen.getByText('Colours')).toHaveClass('tab-pill-selected');
    expect(screen.getByText('Makeup')).not.toHaveClass('tab-pill-selected');
    expect(screen.getByText('Products')).not.toHaveClass('tab-pill-selected');
  });

  it('selects a tab on click and dispatches the board change', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<UserTabs />);

    await user.click(screen.getByText('Products'));

    expect(screen.getByText('Products')).toHaveClass('tab-pill-selected');
    expect(screen.getByText('Colours')).not.toHaveClass('tab-pill-selected');
    expect(store.getState().utilsReducer.showBoard).toBe('Products');
  });
});
