import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnalysisCard } from '../../src/components/AnalysisCard';

describe('AnalysisCard', () => {
  it('renders the value and title', () => {
    render(<AnalysisCard value={94} title="Color match" />);
    expect(screen.getByText('94')).toBeInTheDocument();
    expect(screen.getByText('Color match')).toBeInTheDocument();
  });

  it('renders a string value as-is', () => {
    render(<AnalysisCard value="N/A" title="Wear Colors" />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
