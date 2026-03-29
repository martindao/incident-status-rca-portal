import type { Incident } from '../types/incident';
import { TimelineEvent } from './TimelineEvent';
import { StatusBadge } from './StatusBadge';
import { format } from '../utils/date';

interface IncidentTimelineProps {
  incident: Incident;
}

export function IncidentTimeline({ incident }: IncidentTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Started {format(incident.createdAt)} • ID: {incident.id}
          </p>
        </div>
        <StatusBadge status={incident.status} type="incident" />
      </div>

      <div className="mt-6">
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
