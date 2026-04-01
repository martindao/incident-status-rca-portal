import { StatusOverview } from './components/StatusOverview';
import { ComponentGrid } from './components/ComponentGrid';
import { IncidentTimeline } from './components/IncidentTimeline';
import { RCAPanel } from './components/RCAPanel';
import { IncidentHistory } from './components/IncidentHistory';
import { IncidentSimulator } from './components/IncidentSimulator';
import { components, incidents, pastIncidents } from './data';
import { Activity, Shield, Zap } from 'lucide-react';

function App() {
  const currentIncident = incidents[0];
  const allIncidents = [...incidents, ...pastIncidents];

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      {/* Header */}
      <header className="bg-[var(--surface-900)] border-b border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 header-brand">
          <div className="p-2 bg-[var(--accent-primary)] rounded-lg shadow-md header-shield-glow">
            <Shield className="w-6 h-6 text-white" />
          </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-100)]">Status Portal</h1>
                <p className="text-sm text-[var(--text-300)]">Real-time system status and incident management</p>
              </div>
            </div>
            <span className="text-sm font-medium text-[var(--accent-primary-text)]">
              Portfolio Demo
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <section className="mb-8">
          <StatusOverview components={components} incidents={incidents} />
        </section>

        {/* Component Grid */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[var(--text-300)]" />
            <h2 className="text-lg font-semibold text-[var(--text-100)]">Service Components</h2>
          </div>
          <ComponentGrid components={components} />
        </section>

        {/* Active Incident */}
        {currentIncident && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-100)] mb-4">Active Incident</h2>
            <div className="space-y-4">
              <IncidentTimeline incident={currentIncident} />
              {currentIncident.rca && (
                <RCAPanel rca={currentIncident.rca} />
              )}
            </div>
          </section>
        )}

      {/* Incident Lifecycle Simulation */}
      <section className="mb-8 simulator-section">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[var(--text-300)]" />
          <h2 className="text-lg font-semibold text-[var(--text-100)]">Interactive Demo</h2>
        </div>
        <IncidentSimulator />
      </section>

        {/* Incident History */}
        <section className="mb-8">
          <IncidentHistory incidents={allIncidents} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--surface-900)] border-t border-[var(--border-subtle)] mt-12 footer-premium">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-[var(--text-400)] text-center">
            Incident Status &amp; RCA Portal &mdash; Portfolio Demo | Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
