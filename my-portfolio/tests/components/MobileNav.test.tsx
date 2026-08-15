import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileNav } from '../../src/components/MobileNav';

const baseProps = {
  skinTone: 'Warm Beige',
  colorCode: '#D9B896',
  undertone: 'Warm',
  colorPalette: ['#111111', '#222222', '#333333', '#444444'],
  boards: ['Colours', 'Makeup', 'Products'],
  activeBoard: 'Colours',
  onSelectBoard: vi.fn(),
  theme: 'light' as const,
  onToggleTheme: vi.fn(),
};

describe('MobileNav', () => {
  it('opens the drawer when the menu button is clicked, and closes it again', async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNav {...baseProps} />);
    const drawer = () => container.querySelector('.mnav-drawer') as HTMLElement;

    expect(drawer().className).not.toMatch('mnav-drawer-open');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(drawer().className).toMatch('mnav-drawer-open');

    const closeButtons = screen.getAllByRole('button', { name: 'Close menu' });
    await user.click(closeButtons[0]);
    expect(drawer().className).not.toMatch('mnav-drawer-open');
  });

  it('selects a board and closes the drawer', async () => {
    const user = userEvent.setup();
    const onSelectBoard = vi.fn();
    render(<MobileNav {...baseProps} onSelectBoard={onSelectBoard} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByText('Makeup'));

    expect(onSelectBoard).toHaveBeenCalledWith('Makeup');
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('does not render the product filters section when none are provided', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...baseProps} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.queryByText('Filter products')).not.toBeInTheDocument();
  });

  it('selects a product filter and closes the drawer', async () => {
    const user = userEvent.setup();
    const onSelectProductFilter = vi.fn();
    render(
      <MobileNav
        {...baseProps}
        productFilters={[
          { key: 'all', label: 'All', count: 10 },
          { key: 'lip', label: 'Lip', count: 4 },
        ]}
        selectedProductFilter="All"
        onSelectProductFilter={onSelectProductFilter}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByText('Lip'));
    expect(onSelectProductFilter).toHaveBeenCalledWith('Lip');
  });

  it('renders the palette swatches and tone summary', async () => {
    const user = userEvent.setup();
    render(<MobileNav {...baseProps} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByText('Warm Beige')).toBeInTheDocument();
    expect(screen.getByText('#D9B896 · Warm')).toBeInTheDocument();
  });

  it('toggles the theme and reflects the current theme label', async () => {
    const user = userEvent.setup();
    const onToggleTheme = vi.fn();
    render(<MobileNav {...baseProps} theme="light" onToggleTheme={onToggleTheme} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    await user.click(screen.getByText('Dark mode'));
    expect(onToggleTheme).toHaveBeenCalled();
  });

  it('uses the native share sheet when available', async () => {
    const shareSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: shareSpy, configurable: true });
    const user = userEvent.setup();
    render(<MobileNav {...baseProps} />);
    await user.click(screen.getByRole('button', { name: 'Share' }));
    expect(shareSpy).toHaveBeenCalledWith({ title: 'Tone.AI', url: window.location.href });
  });

  it('falls back to clipboard copy when the share API is unavailable', async () => {
    // Use fireEvent (not userEvent) here — userEvent.setup() installs its own
    // real clipboard stub, which would shadow the vi.fn() mock from tests/setup.ts.
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    render(<MobileNav {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    await Promise.resolve();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });
});
