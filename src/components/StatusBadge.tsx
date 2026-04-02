import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';
import type { ComponentStatus, IncidentStatus, TimelineEventType } from '../types/incident';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: ComponentStatus | IncidentStatus | TimelineEventType;
  type?: 'component' | 'incident' | 'timeline';
  size?: 'sm' | 'md' | 'lg';
}

const componentConfig: Record<ComponentStatus, { label: string; icon: typeof CheckCircle; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  operational: {
    label: 'Operational',
    icon: CheckCircle,
    variant: 'default',
  },
  degraded: {
    label: 'Degraded Performance',
    icon: AlertTriangle,
    variant: 'secondary',
  },
  partial_outage: {
    label: 'Partial Outage',
    icon: AlertCircle,
    variant: 'secondary',
  },
  major_outage: {
    label: 'Major Outage',
    icon: XCircle,
    variant: 'destructive',
  },
};

const incidentConfig: Record<IncidentStatus, { label: string; icon: typeof AlertCircle; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  investigating: {
    label: 'Investigating',
    icon: AlertCircle,
    variant: 'secondary',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    variant: 'secondary',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    variant: 'outline',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    variant: 'default',
  },
};

const timelineConfig: Record<TimelineEventType, { label: string; icon: typeof AlertCircle; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  reported: {
    label: 'Reported',
    icon: AlertCircle,
    variant: 'destructive',
  },
  identified: {
    label: 'Identified',
    icon: AlertTriangle,
    variant: 'secondary',
  },
  deployed: {
    label: 'Deployed',
    icon: CheckCircle,
    variant: 'outline',
  },
  monitoring: {
    label: 'Monitoring',
    icon: CheckCircle,
    variant: 'outline',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    variant: 'default',
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
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <Badge variant={config.variant} className={`inline-flex items-center ${sizeClasses[size]}`}>
      <Icon size={iconSizes[size]} />
      {config.label}
    </Badge>
  );
}
