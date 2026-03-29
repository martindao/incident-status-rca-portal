import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('renders correct label for operational status', () => {
    render(<StatusBadge status="operational" type="component" />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });

  it('renders correct label for major_outage status', () => {
    render(<StatusBadge status="major_outage" type="component" />);
    expect(screen.getByText('Major Outage')).toBeInTheDocument();
  });

  it('renders correct label for degraded status', () => {
    render(<StatusBadge status="degraded" type="component" />);
    expect(screen.getByText('Degraded Performance')).toBeInTheDocument();
  });

  it('renders correct label for incident investigating status', () => {
    render(<StatusBadge status="investigating" type="incident" />);
    expect(screen.getByText('Investigating')).toBeInTheDocument();
  });

  it('renders correct label for incident resolved status', () => {
    render(<StatusBadge status="resolved" type="incident" />);
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(
      <StatusBadge status="operational" type="component" size="sm" />
    );
    const badge = container.querySelector('span');
    expect(badge?.className).toContain('text-xs');
  });
});
