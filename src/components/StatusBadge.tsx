import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';
import type { ComponentStatus, IncidentStatus, TimelineEventType } from '../types/incident';

interface StatusBadgeProps {
  status: ComponentStatus | IncidentStatus | TimelineEventType;
  type?: 'component' | 'incident' | 'timeline';
  size?: 'sm' | 'md' | 'lg';
}

const componentConfig: Record<ComponentStatus, { label: string; icon: typeof CheckCircle; color: string; bg: string; border?: string }> = {
  operational: {
    label: 'Operational',
    icon: CheckCircle,
    color: 'text-[var(--semantic-success)]',
    bg: 'bg-[var(--semantic-success-muted)]',
  },
  degraded: {
    label: 'Degraded Performance',
    icon: AlertTriangle,
    color: 'text-[var(--semantic-warning)]',
    bg: 'bg-[var(--semantic-warning-muted)]',
  },
  partial_outage: {
    label: 'Partial Outage',
    icon: AlertCircle,
    color: 'text-[var(--semantic-warning)]',
    bg: 'bg-[var(--semantic-warning-muted)]',
  },
  major_outage: {
    label: 'Major Outage',
    icon: XCircle,
    color: 'text-[var(--semantic-critical)]',
    bg: 'bg-[var(--semantic-critical-muted)]',
  },
};

const incidentConfig: Record<IncidentStatus, { label: string; icon: typeof AlertCircle; color: string; bg: string }> = {
  investigating: {
    label: 'Investigating',
    icon: AlertCircle,
    color: 'text-[var(--semantic-warning)]',
    bg: 'bg-[var(--semantic-warning-muted)]',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    color: 'text-[var(--semantic-warning)]',
    bg: 'bg-[var(--semantic-warning-muted)]',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    color: 'text-[var(--semantic-info)]',
    bg: 'bg-[var(--semantic-info-muted)]',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    color: 'text-[var(--semantic-success)]',
    bg: 'bg-[var(--semantic-success-muted)]',
  },
};

const timelineConfig: Record<TimelineEventType, { label: string; icon: typeof AlertCircle; color: string; bg: string }> = {
  reported: {
    label: 'Reported',
    icon: AlertCircle,
    color: 'text-[var(--semantic-critical)]',
    bg: 'bg-[var(--semantic-critical-muted)]',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    color: 'text-[var(--semantic-warning)]',
    bg: 'bg-[var(--semantic-warning-muted)]',
  },
  deployed: {
    label: 'Deployed',
    icon: CheckCircle,
    color: 'text-[var(--semantic-info)]',
    bg: 'bg-[var(--semantic-info-muted)]',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    color: 'text-[var(--semantic-info)]',
    bg: 'bg-[var(--semantic-info-muted)]',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    color: 'text-[var(--semantic-success)]',
    bg: 'bg-[var(--semantic-success-muted)]',
  },
};

export function StatusBadge({ status, type = 'component', size = 'md' }: StatusBadgeProps) {
  const config = type === 'component'
    ? componentConfig[status as ComponentStatus]
    : type === 'incident'
    ? incidentConfig[status as IncidentStatus]
    : timelineConfig[status as TimelineEventType];

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.color} ${sizeClasses[size]}`}>
      <Icon size={iconSizes[size]} />
      {config.label}
    </span>
  );
}
