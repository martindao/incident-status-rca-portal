import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComponentCard } from '../ComponentCard';
import type { Component } from '../../types/incident';

const mockComponent: Component = {
  id: 'api',
  name: 'API',
  description: 'REST API endpoints and GraphQL services',
  status: 'operational',
  uptime: 99.9,
};

describe('ComponentCard', () => {
  it('displays component name', () => {
    render(<ComponentCard component={mockComponent} />);
    expect(screen.getByText('API')).toBeInTheDocument();
  });

  it('displays component description', () => {
    render(<ComponentCard component={mockComponent} />);
    expect(screen.getByText('REST API endpoints and GraphQL services')).toBeInTheDocument();
  });

  it('displays uptime percentage', () => {
    render(<ComponentCard component={mockComponent} />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('uptime')).toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<ComponentCard component={mockComponent} />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });

  it('shows degraded badge for degraded component', () => {
    const degraded: Component = { ...mockComponent, status: 'degraded' };
    render(<ComponentCard component={degraded} />);
    expect(screen.getByText('Degraded Performance')).toBeInTheDocument();
  });
});
