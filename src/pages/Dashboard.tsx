import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCases, Case } from '../services/api';

const Dashboard: React.FC = () => {
  const { data: cases, isLoading, error } = useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: () => getCases(),
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const activeCases = cases?.filter((c: Case) => c.status?.toLowerCase() === 'active') || [];
  const pendingCases = cases?.filter((c: Case) => c.status?.toLowerCase() === 'pending') || [];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-indigo-900">Total Cases</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {isLoading ? '...' : cases?.length || 0}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-green-900">Active Cases</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {isLoading ? '...' : activeCases.length}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-900">Pending Cases</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {isLoading ? '...' : pendingCases.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading dashboard data
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 