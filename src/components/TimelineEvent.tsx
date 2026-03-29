import { format } from '../utils/date';
import type { TimelineEvent as TimelineEventType } from '../types/incident';
import { StatusBadge } from './StatusBadge';

interface TimelineEventProps {
  event: TimelineEventType;
  isLast: boolean;
}

export function TimelineEvent({ event, isLast }: TimelineEventProps) {
  return (
    <div className="relative flex gap-4 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-200" />
      )}
      
      {/* Status indicator */}
      <div className="relative z-10 flex-shrink-0">
        <StatusBadge status={event.type} type="timeline" size="sm" />
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-0.5">
        <p className="text-gray-900 font-medium">{event.message}</p>
        <p className="text-sm text-gray-500 mt-1">{format(event.timestamp)}</p>
      </div>
    </div>
  );
}
