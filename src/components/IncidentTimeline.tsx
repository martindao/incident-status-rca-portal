import type { Incident } from '../types/incident';
import { TimelineEvent } from './TimelineEvent';
import { StatusBadge } from './StatusBadge';
import { format } from '../utils/date';

interface IncidentTimelineProps {
  incident: Incident;
}

export function IncidentTimeline({ incident }: IncidentTimelineProps) {
  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--text-100)' }}
          >
            {incident.title}
          </h3>
          <p
            className="text-sm"
            style={{ color: 'var(--text-300)' }}
          >
            Started {format(incident.createdAt)} • ID: {incident.id}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <StatusBadge status={incident.status} type="incident" />
        </div>
      </div>

      {/* Timeline Section */}
      <div
        className="pt-6 mt-6"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {incident.timeline.map((event, index) => (
          <TimelineEvent
            key={event.id}
            event={event}
            isLast={index === incident.timeline.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
