import { Server, Database, Globe, Shield, CreditCard } from 'lucide-react';
import type { Component } from '../types/incident';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  // Get border color based on status
  const getBorderColor = () => {
    switch (component.status) {
      case 'operational':
        return 'var(--semantic-success)';
      case 'degraded':
        return 'var(--semantic-warning)';
      case 'partial_outage':
        return 'var(--semantic-warning)';
      case 'major_outage':
        return 'var(--semantic-critical)';
      default:
        return 'var(--border-default)';
    }
  };

  return (
    <Card
      className="rounded-lg"
      style={{
        borderLeft: `4px solid ${getBorderColor()}`,
      }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: 'var(--accent-primary-subtle)' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                {component.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-400)' }}>
                {component.description}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <StatusBadge status={component.status} type="component" size="sm" />
          <div className="text-sm" style={{ color: 'var(--text-300)' }}>
            <Badge variant="outline" className="font-medium">
              {component.uptime}%
            </Badge>
            <span className="ml-1" style={{ color: 'var(--text-500)' }}>
              uptime
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
