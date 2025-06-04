import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCaseById, Case } from '../services/api';

const CaseDetails: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [case_, setCase] = useState<Case | null>(null);

  // Load case details when component mounts
  useEffect(() => {
    if (caseId) {
      handleFetchCaseDetails();
    }
  }, [caseId]);

  const handleFetchCaseDetails = () => {
    if (!caseId) return;

    setIsLoading(true);
    getCaseById(caseId)
      .then(data => {
        setCase(data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setCase(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
              <p className="text-sm text-red-700">
                {error ? 'Error loading case details' : 'Case not found'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleFetchCaseDetails}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/cases')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back to Cases
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <button
        onClick={() => navigate('/cases')}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
      >
        ← Back to Cases List
      </button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{case_.name}</h1>
        <button
          onClick={handleFetchCaseDetails}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Refresh Details
        </button>
      </div>

      {/* Basic Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Case Number</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.case}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${case_.status === 'active' ? 'bg-green-100 text-green-800' :
                case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  case_.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-gray-200 text-gray-600'}`}>
              {case_.status || 'Unknown'}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Federal Case</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.is_federal ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Court Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Court Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Court Type</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.court_type || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Court Code</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.court_code || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Court</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.court || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Filing Courthouse</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.filing_courthouse || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">County</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.county || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">State</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.state?.toUpperCase() || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Case Classification Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Case Classification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Type</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.type || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.category || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Practice Area</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.practice_area || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Matter Type</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.matter_type || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Case Outcome</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.case_outcome_type || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Verdict</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.verdict || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Timeline Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Timeline Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Filing Date</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.filing_date || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.case_last_updated || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Refreshed</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.last_refreshed || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Time to First CMC</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.time_to_first_cmc || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Time to First Dismissal</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.time_to_first_dismissal || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Case Cycle Time</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.case_cycle_time || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Parties</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.parties || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Causes of Action</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.raw_causes_of_action || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Complaint Overview</h3>
            <p className="mt-1 text-sm text-gray-900">{case_.complaint_overview || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* API Tokens Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">API Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Events Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.events || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Attorneys Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.attorneys || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Documents Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.documents || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Judge Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.judge || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Alert Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.alert || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Refresh Token</h3>
            <p className="mt-1 text-sm text-gray-900 break-all">{case_.refresh || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails; 