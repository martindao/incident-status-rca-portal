import { useState } from 'react';
import type { Incident } from '../types/incident';
import { StatusBadge } from './StatusBadge';
import { format } from '../utils/date';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card
      className="rounded-2xl"
      style={{
        background: 'var(--card)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: 'var(--surface-700)' }}
            >
              <AlertCircle
                className="w-5 h-5"
                style={{ color: 'var(--text-200)' }}
              />
            </div>
            <h3
              className="text-lg font-semibold"
              style={{ color: 'var(--text-100)' }}
            >
              Incident History
            </h3>
          </div>

          {/* Filter tabs */}
          <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterStatus)}>
            <TabsList className="bg-[var(--surface-700)]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="identified">Identified</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Incident List */}
        <div className="space-y-3">
          {filteredIncidents.length === 0 ? (
            <p
              className="text-center py-8"
              style={{ color: 'var(--text-400)' }}
            >
              No incidents found
            </p>
          ) : (
            filteredIncidents.map((incident) => (
              <Card
                key={incident.id}
                className="rounded-xl overflow-hidden"
                style={{
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-700)',
                }}
              >
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-4 h-auto"
                    style={{ background: expandedId === incident.id ? 'var(--surface-600)' : 'transparent' }}
                    onClick={() => toggleExpand(incident.id)}
                  >
                    <div className="flex items-center gap-4">
                      <StatusBadge status={incident.status} type="incident" size="sm" />
                      <div className="text-left">
                        <p
                          className="font-medium"
                          style={{ color: 'var(--text-100)' }}
                        >
                          {incident.title}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--text-400)' }}
                        >
                          {incident.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-400)' }}
                      >
                        {format(incident.createdAt)}
                      </span>
                      {expandedId === incident.id ? (
                        <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-400)' }} />
                      ) : (
                        <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-400)' }} />
                      )}
                    </div>
                  </Button>

                  {/* Expanded Timeline */}
                  {expandedId === incident.id && incident.timeline && (
                    <div
                      className="px-4 pb-4"
                      style={{
                        borderTop: '1px solid var(--border-subtle)',
                        background: 'var(--surface-800)',
                      }}
                    >
                      <div className="mt-4 space-y-4">
                        {incident.timeline.map((event, index) => (
                          <div key={event.id} className="flex items-start gap-3">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                              style={{
                                background: index === incident.timeline!.length - 1
                                  ? 'var(--semantic-success)'
                                  : 'var(--text-400)',
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: 'var(--text-200)' }}
                              >
                                {event.message}
                              </p>
                              <p
                                className="text-xs mt-1"
                                style={{ color: 'var(--text-500)' }}
                              >
                                {format(event.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
