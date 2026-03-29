export type ComponentStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage';

export interface Component {
  id: string;
  name: string;
  description: string;
  status: ComponentStatus;
  uptime: number;
}

export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';

export type TimelineEventType = 'reported' | 'identified' | 'deployed' | 'monitoring' | 'resolved';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  message: string;
  timestamp: string;
}

export interface RCA {
  summary: string;
  rootCause: string;
  impact: string;
  resolution: string;
  preventionMeasures: string[];
  duration: string;
  detectionMethod: string;
}

export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  components: string[];
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  rca?: RCA;
}
