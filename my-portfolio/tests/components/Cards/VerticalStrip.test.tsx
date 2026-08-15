import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VerticalStrips } from '../../../src/components/Cards/VerticalStrip';
import { makeColorStrip } from '../../fixtures';

describe('VerticalStrips', () => {
  it('renders nothing when the palette is empty', () => {
    const { container } = render(<VerticalStrips palette={[]} title="Warm Colors" />);
    expect(container.querySelector('.dashboard-card')).toBeEmptyDOMElement();
  });

  it('renders a titled strip for each palette entry with its name, hex, and a copy button', () => {
    const palette = [makeColorStrip({ name: 'Amber', hex: '#C97C3D' }), makeColorStrip({ name: 'Rust', hex: '#B5541A' })];
    render(<VerticalStrips palette={palette} title="Warm Colors" />);

    expect(screen.getByText('Warm Colors')).toBeInTheDocument();
    expect(screen.getByText('Amber')).toBeInTheDocument();
    expect(screen.getByText('#C97C3D')).toBeInTheDocument();
    expect(screen.getByText('Rust')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
