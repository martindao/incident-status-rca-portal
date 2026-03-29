import type { Component } from '../types/incident';
import { ComponentCard } from './ComponentCard';

interface ComponentGridProps {
  components: Component[];
}

export function ComponentGrid({ components }: ComponentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}
