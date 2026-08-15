import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserDetails } from '../../src/components/userDetails';

describe('UserDetails', () => {
  it('renders the skin tone name, hex code, and undertone', () => {
    render(<UserDetails colorCode="#D9B896" skinTone="Warm Beige" undertone="Warm" />);
    expect(screen.getByText('Warm Beige')).toBeInTheDocument();
    expect(screen.getByText('#D9B896')).toBeInTheDocument();
    expect(screen.getByText('Warm')).toBeInTheDocument();
  });

  it('tints the avatar with the detected colour code', () => {
    const { container } = render(<UserDetails colorCode="#3B2417" skinTone="Deep" undertone="Cool" />);
    const avatar = container.querySelector('.ud-avatar');
    expect(avatar).toHaveStyle({ background: '#3B2417' });
  });
});
