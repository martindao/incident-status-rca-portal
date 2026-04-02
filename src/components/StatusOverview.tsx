import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import type { Component, Incident } from '../types/incident';
import { formatRelative } from '../utils/date';
import { Card, CardContent } from '@/components/ui/card';

interface StatusOverviewProps {
  components: Component[];
  incidents: Incident[];
}

export function StatusOverview({ components, incidents }: StatusOverviewProps) {
  const operationalCount = components.filter(c => c.status === 'operational').length;
  const totalComponents = components.length;
  const allOperational = operationalCount === totalComponents;

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  const lastUpdated = new Date().toISOString();

  // Determine overall system health status
  const hasMajorOutage = components.some(c => c.status === 'major_outage');
  const hasPartialOutage = components.some(c => c.status === 'partial_outage');
  const hasDegraded = components.some(c => c.status === 'degraded');

  const getStatusStyle = () => {
    if (hasMajorOutage) {
      return {
        bg: 'var(--semantic-critical-muted)',
        icon: 'var(--semantic-critical)',
        border: 'var(--semantic-critical)',
        glowClass: 'status-indicator-critical',
      };
    }
    if (hasPartialOutage || hasDegraded) {
      return {
        bg: 'var(--semantic-warning-muted)',
        icon: 'var(--semantic-warning)',
        border: 'var(--semantic-warning)',
        glowClass: 'status-indicator-warning',
      };
    }
    return {
      bg: 'var(--semantic-success-muted)',
      icon: 'var(--semantic-success)',
      border: 'var(--semantic-success)',
      glowClass: 'status-indicator-operational',
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <Card className="rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Status indicator */}
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-full border-2 ${statusStyle.glowClass}`}
              style={{
                background: statusStyle.bg,
                borderColor: statusStyle.border,
              }}
            >
              {allOperational ? (
                <CheckCircle className="w-8 h-8" style={{ color: statusStyle.icon }} />
              ) : (
                <AlertCircle className="w-8 h-8" style={{ color: statusStyle.icon }} />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-100)' }}>
                {allOperational ? 'All Systems Operational' : 'Degraded Performance'}
              </h2>
              <p className="mt-1" style={{ color: 'var(--text-300)' }}>
                {operationalCount} of {totalComponents} components operational
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <Card style={{ background: 'var(--surface-700)' }}>
              <CardContent className="px-4 py-2 text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--text-100)' }}>
                  {activeIncidents.length}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-400)' }}>
                  Active Incidents
                </p>
              </CardContent>
            </Card>
            <Card style={{ background: 'var(--surface-700)' }}>
              <CardContent className="px-4 py-2 text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--text-100)' }}>
                  {totalComponents}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-400)' }}>
                  Components
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Last updated */}
        <div
          className="flex items-center gap-2 mt-6 pt-4 text-sm"
          style={{ color: 'var(--text-400)', borderTop: '1px solid var(--border-subtle)' }}
        >
          <Clock className="w-4 h-4" />
          <span>Last updated {formatRelative(lastUpdated)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
