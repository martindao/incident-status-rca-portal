import { useState } from 'react';
import type { Incident } from '../types/incident';
import { StatusBadge } from './StatusBadge';
import { format } from '../utils/date';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface IncidentHistoryProps {
  incidents: Incident[];
}

type FilterStatus = 'all' | 'investigating' | 'identified' | 'monitoring' | 'resolved';

export function IncidentHistory({ incidents }: IncidentHistoryProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(i => i.status === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Incident History</h3>
        </div>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {(['all', 'investigating', 'identified', 'monitoring', 'resolved'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No incidents found</p>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(incident.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <StatusBadge status={incident.status} type="incident" size="sm" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{incident.title}</p>
                    <p className="text-sm text-gray-500">{incident.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {format(incident.createdAt)}
                  </span>
                  {expandedId === incident.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedId === incident.id && incident.timeline && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                  <div className="mt-4 space-y-3">
                    {incident.timeline.map((event) => (
                      <div key={event.id} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
                        <div>
                          <p className="text-sm text-gray-900">{event.message}</p>
                          <p className="text-xs text-gray-500">{format(event.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
