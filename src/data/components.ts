import type { Component } from '../types/incident';

export const components: Component[] = [
  {
    id: 'api',
    name: 'API',
    description: 'REST API endpoints and GraphQL services',
    status: 'operational',
    uptime: 99.9,
  },
  {
    id: 'database',
    name: 'Database',
    description: 'PostgreSQL primary and replica instances',
    status: 'operational',
    uptime: 99.8,
  },
  {
    id: 'cdn',
    name: 'CDN',
    description: 'Content delivery network for static assets',
    status: 'operational',
    uptime: 99.95,
  },
  {
    id: 'auth',
    name: 'Authentication',
    description: 'OAuth and session management services',
    status: 'operational',
    uptime: 99.9,
  },
  {
    id: 'payments',
    name: 'Payment Gateway',
    description: 'Payment processing and webhook handling',
    status: 'operational',
    uptime: 99.7,
  },
];
