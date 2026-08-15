import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JewelTones } from '../../../src/components/Cards/JewelTones';
import { makeColorStrip } from '../../fixtures';

describe('JewelTones', () => {
  it('renders nothing when the palette is empty', () => {
    const { container } = render(<JewelTones palette={[]} title="Jewel Tones" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a gem tile for each palette entry with its name, hex, and a copy button', () => {
    const palette = [makeColorStrip({ name: 'Emerald', hex: '#0F6B4C' }), makeColorStrip({ name: 'Sapphire', hex: '#1B4F91' })];
    render(<JewelTones palette={palette} title="Jewel Tones" />);

    expect(screen.getByText('Jewel Tones')).toBeInTheDocument();
    expect(screen.getByText('Emerald')).toBeInTheDocument();
    expect(screen.getByText('#0F6B4C')).toBeInTheDocument();
    expect(screen.getByText('Sapphire')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
