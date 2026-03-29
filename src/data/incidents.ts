import type { Incident } from '../types/incident';

export const incidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Database Connection Pool Exhaustion',
    status: 'resolved',
    components: ['database', 'api', 'auth'],
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    timeline: [
      {
        id: 'evt-1',
        type: 'reported',
        message: 'Incident Reported - API errors detected across multiple endpoints',
        timestamp: '2024-03-15T08:00:00Z',
      },
      {
        id: 'evt-2',
        type: 'identified',
        message: 'Investigating - Database team engaged, checking connection metrics',
        timestamp: '2024-03-15T08:15:00Z',
      },
      {
        id: 'evt-3',
        type: 'identified',
        message: 'Root Cause Identified - Connection pool limit (100) exceeded under peak load',
        timestamp: '2024-03-15T08:45:00Z',
      },
      {
        id: 'evt-4',
        type: 'deployed',
        message: 'Fix Deployed - Pool size increased to 200, connection timeout added',
        timestamp: '2024-03-15T09:00:00Z',
      },
      {
        id: 'evt-5',
        type: 'monitoring',
        message: 'Monitoring - Traffic normalizing, error rates declining',
        timestamp: '2024-03-15T09:30:00Z',
      },
      {
        id: 'evt-6',
        type: 'resolved',
        message: 'Resolved - All services operational, connection pool stable',
        timestamp: '2024-03-15T10:00:00Z',
      },
    ],
    rca: {
      summary: 'API 502 errors due to database connection exhaustion under peak traffic',
      rootCause: 'Connection pool limit (100) exceeded under peak load conditions. The application was unable to acquire new database connections, causing cascading failures across API and Authentication services.',
      impact: '15% of users experienced errors for 2 hours. API response times exceeded 30 seconds, and authentication requests failed intermittently.',
      resolution: 'Increased connection pool size from 100 to 200 connections. Added connection timeout handling (30s) and improved connection recycling.',
      preventionMeasures: [
        'Implement connection pooling metrics and alerting',
        'Add auto-scaling for database connections based on load',
        'Set up circuit breaker patterns for database-dependent services',
        'Create runbook for connection pool exhaustion scenarios',
      ],
      duration: '2 hours',
      detectionMethod: 'Automated monitoring alert - connection pool utilization exceeded 95% threshold',
    },
  },
  {
    id: 'INC-2024-002',
    title: 'CDN Edge Node Degradation',
    status: 'resolved',
    components: ['cdn'],
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-10T15:45:00Z',
    timeline: [
      {
        id: 'evt-7',
        type: 'reported',
        message: 'Incident Reported - Increased latency on static assets',
        timestamp: '2024-03-10T14:30:00Z',
      },
      {
        id: 'evt-8',
        type: 'identified',
        message: 'Investigating - CDN provider reports edge node issues in US-East',
        timestamp: '2024-03-10T14:45:00Z',
      },
      {
        id: 'evt-9',
        type: 'deployed',
        message: 'Fix Deployed - Traffic rerouted to healthy edge nodes',
        timestamp: '2024-03-10T15:15:00Z',
      },
      {
        id: 'evt-10',
        type: 'resolved',
        message: 'Resolved - CDN performance restored to normal levels',
        timestamp: '2024-03-10T15:45:00Z',
      },
    ],
    rca: {
      summary: 'CDN edge node degradation in US-East region affecting static asset delivery',
      rootCause: 'Hardware failure on primary edge node in US-East region caused traffic to failover to secondary nodes, which were under-provisioned for the load.',
      impact: 'Users in US-East experienced 2-3x slower asset loading times for 1 hour and 15 minutes.',
      resolution: 'Traffic automatically rerouted to healthy edge nodes. CDN provider replaced failed hardware.',
      preventionMeasures: [
        'Implement multi-CDN strategy for redundancy',
        'Add synthetic monitoring for asset loading from multiple regions',
        'Review CDN provider SLA and incident response procedures',
      ],
      duration: '1 hour 15 minutes',
      detectionMethod: 'Synthetic monitoring alert - asset load time exceeded 5s threshold',
    },
  },
];

export const pastIncidents: Incident[] = [
  {
    id: 'INC-2024-000',
    title: 'Payment Gateway Timeout',
    status: 'resolved',
    components: ['payments'],
    createdAt: '2024-02-28T11:00:00Z',
    updatedAt: '2024-02-28T12:30:00Z',
    timeline: [
      {
        id: 'evt-11',
        type: 'reported',
        message: 'Payment processing delays reported',
        timestamp: '2024-02-28T11:00:00Z',
      },
      {
        id: 'evt-12',
        type: 'resolved',
        message: 'Payment gateway provider resolved the issue',
        timestamp: '2024-02-28T12:30:00Z',
      },
    ],
  },
];
