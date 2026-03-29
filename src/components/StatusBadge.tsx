import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';
import type { ComponentStatus, IncidentStatus, TimelineEventType } from '../types/incident';

interface StatusBadgeProps {
  status: ComponentStatus | IncidentStatus | TimelineEventType;
  type?: 'component' | 'incident' | 'timeline';
  size?: 'sm' | 'md' | 'lg';
}

const componentConfig: Record<ComponentStatus, { label: string; icon: typeof CheckCircle; color: string; bg: string }> = {
  operational: {
    label: 'Operational',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  degraded: {
    label: 'Degraded Performance',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  partial_outage: {
    label: 'Partial Outage',
    icon: AlertCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  major_outage: {
    label: 'Major Outage',
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
};

const incidentConfig: Record<IncidentStatus, { label: string; icon: typeof AlertCircle; color: string; bg: string }> = {
  investigating: {
    label: 'Investigating',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
};

const timelineConfig: Record<TimelineEventType, { label: string; icon: typeof AlertCircle; color: string; bg: string }> = {
  reported: {
    label: 'Reported',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  deployed: {
    label: 'Deployed',
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
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
