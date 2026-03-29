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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${allOperational ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            {allOperational ? (
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-amber-600" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {allOperational ? 'All Systems Operational' : 'Degraded Performance'}
            </h2>
            <p className="text-gray-500 mt-1">
              {operationalCount} of {totalComponents} components operational
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{activeIncidents.length}</p>
            <p className="text-sm text-gray-500">Active Incidents</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{totalComponents}</p>
            <p className="text-sm text-gray-500">Components</p>
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Last updated {formatRelative(lastUpdated)}</span>
      </div>
    </div>
  );
}
