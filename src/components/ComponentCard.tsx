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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{component.name}</h3>
            <p className="text-sm text-gray-500">{component.description}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <StatusBadge status={component.status} type="component" size="sm" />
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{component.uptime}%</span>
          <span className="text-gray-400 ml-1">uptime</span>
        </div>
      </div>
    </div>
  );
}
