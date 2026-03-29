import { useState, useCallback } from 'react';
import type { IncidentStatus } from '../types/incident';
import { StatusBadge } from './StatusBadge';
import { Play, RotateCcw } from 'lucide-react';

const STATUSES: IncidentStatus[] = ['investigating', 'identified', 'monitoring', 'resolved'];

const STATUS_MESSAGES: Record<IncidentStatus, string> = {
  investigating: 'Team engaged, investigating root cause...',
  identified: 'Root cause identified — preparing fix deployment',
  monitoring: 'Fix deployed, monitoring for stability',
  resolved: 'All services restored to normal operation',
};

interface TransitionEntry {
  status: IncidentStatus;
  message: string;
  timestamp: Date;
}

export function IncidentSimulator() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [transitions, setTransitions] = useState<TransitionEntry[]>([
    {
      status: 'investigating',
      message: STATUS_MESSAGES.investigating,
      timestamp: new Date(),
    },
  ]);

  const currentStatus = STATUSES[statusIndex];
  const isResolved = statusIndex >= STATUSES.length - 1;

  const advanceStatus = useCallback(() => {
    if (isResolved) return;
    const nextIndex = statusIndex + 1;
    const nextStatus = STATUSES[nextIndex];
    setStatusIndex(nextIndex);
    setTransitions((prev) => [
      ...prev,
      {
        status: nextStatus,
        message: STATUS_MESSAGES[nextStatus],
        timestamp: new Date(),
      },
    ]);
  }, [statusIndex, isResolved]);

  const resetDemo = useCallback(() => {
    setStatusIndex(0);
    setTransitions([
      {
        status: 'investigating',
        message: STATUS_MESSAGES.investigating,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Incident Lifecycle Simulation
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Step through a live incident response workflow
          </p>
        </div>
        <StatusBadge status={currentStatus} type="incident" />
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-6">
        {STATUSES.map((s, i) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i <= statusIndex ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Transition log */}
      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
        {transitions.map((entry, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-xs text-gray-400 font-mono whitespace-nowrap mt-0.5">
              {formatTime(entry.timestamp)}
            </span>
            <StatusBadge status={entry.status} type="incident" size="sm" />
            <span className="text-sm text-gray-700">{entry.message}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={advanceStatus}
          disabled={isResolved}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            isResolved
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Play className="w-4 h-4" />
          {isResolved ? 'Incident Resolved' : `Advance to ${STATUSES[statusIndex + 1]?.charAt(0).toUpperCase()}${STATUSES[statusIndex + 1]?.slice(1)}`}
        </button>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Demo
        </button>
      </div>
    </div>
  );
}
