import { format } from '../utils/date';
import type { TimelineEvent as TimelineEventType } from '../types/incident';
import { StatusBadge } from './StatusBadge';

interface TimelineEventProps {
  event: TimelineEventType;
  isLast: boolean;
}

export function TimelineEvent({ event, isLast }: TimelineEventProps) {
  return (
    <div className={`relative flex gap-5 pb-8 ${isLast ? 'timeline-event-last' : ''}`}>
      {/* Timeline connector line */}
      {!isLast && (
        <div
          className="absolute left-[18px] top-10 bottom-0 w-px"
          style={{ background: 'var(--border-strong)' }}
        />
      )}

      {/* Status indicator */}
      <div className={`relative z-10 flex-shrink-0 mt-0.5 timeline-event-badge ${isLast ? 'scale-110' : ''}`}>
        <StatusBadge status={event.type} type="timeline" size="sm" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="font-medium leading-relaxed"
          style={{ color: 'var(--text-100)' }}
        >
          {event.message}
        </p>
        <p
          className="text-sm mt-1.5"
          style={{ color: 'var(--text-400)' }}
        >
          {format(event.timestamp)}
        </p>
      </div>
    </div>
  );
}
