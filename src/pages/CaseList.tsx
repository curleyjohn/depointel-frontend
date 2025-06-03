import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCases, Case, CaseFilters } from '../services/api';
import FilterBar from '../components/FilterBar';

const CaseList: React.FC = () => {
  const [jurisdiction, setJurisdiction] = useState('');
  const [filters, setFilters] = useState<CaseFilters>({
    query: {
      status: '',
      jurisdiction: '',
      date_filed: '',
      case_type: '',
      judge: '',
      court: ''
    },
    page: 1,
    page_size: 10,
    sort_by: 'date_filed',
    sort_order: 'desc'
  });

  const { data: cases, isLoading, error } = useQuery<Case[]>({
    queryKey: ['cases', filters],
    queryFn: () => getCases(filters),
    // staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  console.log(cases);

  const handleJurisdictionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJurisdiction(e.target.value);
    setFilters((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        jurisdiction: e.target.value
      }
    }));
  };

  const handleFilterChange = useCallback((newFilters: Partial<any['query']>) => {
    setFilters((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        ...newFilters
      }
    }));
  }, []);

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-200 text-gray-600';
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
      </div>

      <FilterBar
        onFilterChange={handleFilterChange}
        jurisdiction={jurisdiction}
        onJurisdictionChange={handleJurisdictionChange}
      />

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading cases...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading cases</p>
            </div>
          </div>
        </div>
      )}

      {cases && cases.length > 0 && (
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((case_: Case) => (
                  <tr key={case_.case_token} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/cases/${case_.case_token}`} className="text-indigo-600 hover:text-indigo-900">
                        {case_.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{case_.court_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                        {case_.status ? case_.status : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{case_.filing_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{case_.judge}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{case_.county}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{case_.state.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList; 