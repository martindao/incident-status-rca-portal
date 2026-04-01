import { Server, Database, Globe, Shield, CreditCard } from 'lucide-react';
import type { Component } from '../types/incident';
import { StatusBadge } from './StatusBadge';

interface ComponentCardProps {
  component: Component;
}

const iconMap: Record<string, typeof Server> = {
  api: Server,
  database: Database,
  cdn: Globe,
  auth: Shield,
  payments: CreditCard,
};

export function ComponentCard({ component }: ComponentCardProps) {
  const Icon = iconMap[component.id] || Server;

  const statusClass = `component-card-${component.status}`;

  return (
    <div className={`bg-[var(--surface-800)] rounded-lg border border-[var(--border-default)] p-5 shadow-[var(--shadow-sm)] component-card-enhanced ${statusClass}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--accent-primary-subtle)] rounded-lg">
            <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-100)]">{component.name}</h3>
            <p className="text-sm text-[var(--text-400)]">{component.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <StatusBadge status={component.status} type="component" size="sm" />
        <div className="text-sm text-[var(--text-300)]">
          <span className="font-medium text-[var(--text-100)]">{component.uptime}%</span>
          <span className="text-[var(--text-500)] ml-1">uptime</span>
        </div>
      </div>
    </div>
  );
}
