import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import type { Component, Incident } from '../types/incident';
import { formatRelative } from '../utils/date';

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
        bg: 'bg-[var(--semantic-critical-muted)]',
        icon: 'text-[var(--semantic-critical)]',
        border: 'border-[var(--semantic-critical)]',
        glowClass: 'status-indicator-critical',
      };
    }
    if (hasPartialOutage || hasDegraded) {
      return {
        bg: 'bg-[var(--semantic-warning-muted)]',
        icon: 'text-[var(--semantic-warning)]',
        border: 'border-[var(--semantic-warning)]',
        glowClass: 'status-indicator-warning',
      };
    }
    return {
      bg: 'bg-[var(--semantic-success-muted)]',
      icon: 'text-[var(--semantic-success)]',
      border: 'border-[var(--semantic-success)]',
      glowClass: 'status-indicator-operational',
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <div className="status-overview-card bg-[var(--surface-800)] rounded-xl border border-[var(--border-default)] p-6 shadow-[var(--shadow-md)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${statusStyle.bg} border-2 ${statusStyle.border} ${statusStyle.glowClass}`}>
            {allOperational ? (
              <CheckCircle className={`w-8 h-8 ${statusStyle.icon}`} />
            ) : (
              <AlertCircle className={`w-8 h-8 ${statusStyle.icon}`} />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-100)]">
              {allOperational ? 'All Systems Operational' : 'Degraded Performance'}
            </h2>
            <p className="text-[var(--text-300)] mt-1">
              {operationalCount} of {totalComponents} components operational
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center px-4 py-2 bg-[var(--surface-700)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--text-100)]">{activeIncidents.length}</p>
            <p className="text-sm text-[var(--text-400)]">Active Incidents</p>
          </div>
          <div className="text-center px-4 py-2 bg-[var(--surface-700)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--text-100)]">{totalComponents}</p>
            <p className="text-sm text-[var(--text-400)]">Components</p>
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[var(--border-subtle)] text-sm text-[var(--text-400)]">
        <Clock className="w-4 h-4" />
        <span>Last updated {formatRelative(lastUpdated)}</span>
      </div>
    </div>
  );
}
