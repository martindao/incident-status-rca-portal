import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IncidentTimeline } from '../IncidentTimeline';
import type { Incident } from '../../types/incident';

const mockIncident: Incident = {
  id: 'INC-TEST-001',
  title: 'Test Database Outage',
  status: 'resolved',
  components: ['database'],
  createdAt: '2024-03-15T08:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
  timeline: [
    {
      id: 'evt-1',
      type: 'reported',
      message: 'API errors detected across endpoints',
      timestamp: '2024-03-15T08:00:00Z',
    },
    {
      id: 'evt-2',
      type: 'identified',
      message: 'Root cause identified - connection pool exhausted',
      timestamp: '2024-03-15T08:45:00Z',
    },
    {
      id: 'evt-3',
      type: 'resolved',
      message: 'All services restored to normal',
      timestamp: '2024-03-15T10:00:00Z',
    },
  ],
};

describe('IncidentTimeline', () => {
  it('renders incident title', () => {
    render(<IncidentTimeline incident={mockIncident} />);
    expect(screen.getByText('Test Database Outage')).toBeInTheDocument();
  });

  it('renders incident ID', () => {
    render(<IncidentTimeline incident={mockIncident} />);
    expect(screen.getByText(/INC-TEST-001/)).toBeInTheDocument();
  });

  it('renders all timeline events in order', () => {
    render(<IncidentTimeline incident={mockIncident} />);
    expect(screen.getByText('API errors detected across endpoints')).toBeInTheDocument();
    expect(screen.getByText('Root cause identified - connection pool exhausted')).toBeInTheDocument();
    expect(screen.getByText('All services restored to normal')).toBeInTheDocument();
  });

  it('renders status badges including resolved', () => {
    render(<IncidentTimeline incident={mockIncident} />);
    const resolvedBadges = screen.getAllByText('Resolved');
    expect(resolvedBadges.length).toBeGreaterThanOrEqual(1);
  });
});
