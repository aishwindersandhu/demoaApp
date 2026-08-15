import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CopyButton } from '../../src/components/copyButton';

describe('CopyButton', () => {
  it('copies the hex value to the clipboard when clicked', () => {
    render(<CopyButton hex="#D9B896" />);
    fireEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#D9B896');
  });

  it('shows a "Copied!" confirmation after clicking, then hides it again', async () => {
    vi.useFakeTimers();
    render(<CopyButton hex="#D9B896" />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
      await Promise.resolve(); // flush the clipboard.writeText() microtask
    });
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  });

  it('stops the click from propagating to a parent handler', () => {
    const onParentClick = vi.fn();
    render(
      <div onClick={onParentClick}>
        <CopyButton hex="#D9B896" />
      </div>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onParentClick).not.toHaveBeenCalled();
  });
});
