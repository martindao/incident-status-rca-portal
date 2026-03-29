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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Status Portal</h1>
                <p className="text-sm text-gray-500">Real-time system status and incident management</p>
              </div>
            </div>
            <span className="text-sm font-medium text-indigo-600">
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
            <Activity className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Service Components</h2>
          </div>
          <ComponentGrid components={components} />
        </section>

        {/* Active Incident */}
        {currentIncident && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Incident</h2>
            <div className="space-y-4">
              <IncidentTimeline incident={currentIncident} />
              {currentIncident.rca && (
                <RCAPanel rca={currentIncident.rca} />
              )}
            </div>
          </section>
        )}

        {/* Incident Lifecycle Simulation */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Interactive Demo</h2>
          </div>
          <IncidentSimulator />
        </section>

        {/* Incident History */}
        <section className="mb-8">
          <IncidentHistory incidents={allIncidents} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            Incident Status &amp; RCA Portal &mdash; Portfolio Demo | Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
