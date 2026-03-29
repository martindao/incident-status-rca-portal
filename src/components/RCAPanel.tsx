import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Target, AlertTriangle, CheckCircle, Shield, Clock, Bell } from 'lucide-react';
import type { RCA } from '../types/incident';

interface RCAPanelProps {
  rca: RCA;
}

export function RCAPanel({ rca }: RCAPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Root Cause Analysis</h3>
            <p className="text-sm text-gray-500">Click to view detailed RCA report</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Summary */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h4 className="font-semibold text-gray-900">Summary</h4>
              </div>
              <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{rca.summary}</p>
            </div>

            {/* Root Cause */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-red-500" />
                <h4 className="font-semibold text-gray-900">Root Cause</h4>
              </div>
              <p className="text-gray-600 text-sm">{rca.rootCause}</p>
            </div>

            {/* Impact */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="font-semibold text-gray-900">Impact</h4>
              </div>
              <p className="text-gray-600 text-sm">{rca.impact}</p>
            </div>

            {/* Resolution */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <h4 className="font-semibold text-gray-900">Resolution</h4>
              </div>
              <p className="text-gray-600 text-sm">{rca.resolution}</p>
            </div>

            {/* Duration */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <h4 className="font-semibold text-gray-900">Duration</h4>
              </div>
              <p className="text-gray-600 text-sm">{rca.duration}</p>
            </div>

            {/* Detection Method */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-purple-500" />
                <h4 className="font-semibold text-gray-900">Detection Method</h4>
              </div>
              <p className="text-gray-600 text-sm">{rca.detectionMethod}</p>
            </div>

            {/* Prevention Measures */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-indigo-500" />
                <h4 className="font-semibold text-gray-900">Prevention Measures</h4>
              </div>
              <ul className="space-y-2">
                {rca.preventionMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
