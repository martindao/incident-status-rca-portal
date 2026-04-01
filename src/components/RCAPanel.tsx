import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Target, AlertTriangle, CheckCircle, Shield, Clock, Bell } from 'lucide-react';
import type { RCA } from '../types/incident';

interface RCAPanelProps {
  rca: RCA;
}

export function RCAPanel({ rca }: RCAPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rca-header w-full flex items-center justify-between p-6 transition-colors ${isExpanded ? 'expanded' : ''}`}
        style={{ background: isExpanded ? 'var(--surface-700)' : 'transparent' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: 'var(--accent-primary-muted)',
            }}
          >
            <FileText
              className="w-5 h-5"
              style={{ color: 'var(--accent-primary)' }}
            />
          </div>
          <div className="text-left">
            <h3
              className="text-lg font-semibold"
              style={{ color: 'var(--text-100)' }}
            >
              Root Cause Analysis
            </h3>
            <p
              className="text-sm mt-0.5"
              style={{ color: 'var(--text-400)' }}
            >
              Click to view detailed RCA report
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" style={{ color: 'var(--text-400)' }} />
        ) : (
          <ChevronDown className="w-5 h-5" style={{ color: 'var(--text-400)' }} />
        )}
      </button>

        {/* Expanded Content */}
      <div
        className={`rca-panel-content ${isExpanded ? 'expanded' : ''}`}
        style={{ borderTop: isExpanded ? '1px solid var(--border-subtle)' : 'none' }}
      >
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Summary */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" style={{ color: 'var(--text-300)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Summary
                </h4>
              </div>
              <p
                className="rounded-xl p-4 leading-relaxed"
                style={{
                  background: 'var(--surface-700)',
                  color: 'var(--text-200)',
                }}
              >
                {rca.summary}
              </p>
            </div>

            {/* Root Cause */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" style={{ color: 'var(--semantic-critical)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Root Cause
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {rca.rootCause}
              </p>
            </div>

            {/* Impact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--semantic-warning)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Impact
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {rca.impact}
              </p>
            </div>

            {/* Resolution */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--semantic-success)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Resolution
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {rca.resolution}
              </p>
            </div>

            {/* Duration */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4" style={{ color: 'var(--semantic-info)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Duration
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {rca.duration}
              </p>
            </div>

            {/* Detection Method */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Detection Method
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {rca.detectionMethod}
              </p>
            </div>

            {/* Prevention Measures */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                <h4 className="font-semibold" style={{ color: 'var(--text-100)' }}>
                  Prevention Measures
                </h4>
              </div>
              <ul className="space-y-3">
                {rca.preventionMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: 'var(--accent-primary)' }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                      {measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
