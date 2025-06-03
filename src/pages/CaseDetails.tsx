import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCaseById } from '../services/api';

const CaseDetails: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const { data: case_, isLoading, error } = useQuery({
    queryKey: ['case', caseId],
    queryFn: () => getCaseById(caseId!),
    enabled: !!caseId,
  });

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (error || !case_) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading case details</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/cases')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{case_.name}</h1>
        <button
          onClick={() => navigate('/cases')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Cases
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Court Type</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.court_type}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">State</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.state?.toUpperCase()}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Case Type</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.type}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Status</h2>
            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${case_.status === 'active' ? 'bg-green-100 text-green-800' :
                case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  case_.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-gray-200 text-gray-600'}`}>
              {case_.status ? case_.status : 'Unknown'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Judge</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.judge}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Filing Date</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.filing_date}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Last Updated</h2>
            <p className="mt-1 text-sm text-gray-900">{case_.case_last_updated}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Parties</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-900">{case_.parties}</div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails; 