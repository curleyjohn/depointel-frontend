import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCases, Case, CaseFilters } from '../services/api';
import FilterBar from '../components/FilterBar';
import { CalendarIcon } from '@heroicons/react/24/outline';

const CaseList: React.FC = () => {
  const [jurisdiction, setJurisdiction] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('2023-01-01');
  const [dateTo, setDateTo] = useState('2023-03-01');
  const [filters, setFilters] = useState<CaseFilters>({
    query: {
      jurisdiction: ['oh', 'in', 'il', 'ia', 'mi', 'mo', 'ks', 'mn', 'wi'],
      date_filed: '',
      case_type: '',
      judge: '',
      court: '',
      date_filed_from: '2023-01-01',
      date_filed_to: '2023-03-01'
    },
    page: 1,
    page_size: 10,
    sort_by: 'date_filed',
    sort_order: 'desc'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);

  const handleJurisdictionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedJurisdiction = e.target.value;
    if (selectedJurisdiction === 'all') {
      setJurisdiction(['oh', 'in', 'il', 'ia', 'mi', 'mo', 'ks', 'mn', 'wi']);
    } else {
      setJurisdiction([selectedJurisdiction]);
    }
    setFilters((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        jurisdiction: selectedJurisdiction === 'all' ? ['oh', 'in', 'il', 'ia', 'mi', 'mo', 'ks', 'mn', 'wi'] : [selectedJurisdiction]
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

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value);
    setFilters((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        date_filed_from: value
      }
    }));
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value);
    setFilters((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        date_filed_to: value
      }
    }));
  };

  const handleFetchCases = () => {
    setIsLoading(true);
    getCases(filters)
      .then(data => {
        setCases(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Helper to truncate and tooltip
  const renderCell = (value: any) => {
    if (typeof value === 'string' && value.length > 30) {
      return <span title={value}>{value.slice(0, 30) + '...'}</span>;
    }
    if (typeof value === 'string') {
      return <span title={value}>{value}</span>;
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value !== undefined && value !== null ? value : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cases</h1>
          <p className="text-gray-600">Browse and filter civil litigation cases. Use the filters and date range to refine your search.</p>
        </div>

        {/* Filters and Date Range Bar */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-8 border border-gray-100">
          <div className="flex flex-row items-end gap-4 flex-1">
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1 ">Select State</label>
              <FilterBar
                onFilterChange={handleFilterChange}
                jurisdiction={jurisdiction}
                onJurisdictionChange={handleJurisdictionChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Date Filed From</label>
              <div className="relative">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  className="block w-40 border border-gray-300 rounded-md shadow-sm pl-10 pr-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-2.5 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Date Filed To</label>
              <div className="relative">
                <input
                  type="date"
                  value={dateTo}
                  onChange={handleDateToChange}
                  className="block w-40 border border-gray-300 rounded-md shadow-sm pl-10 pr-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-2.5 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={handleFetchCases}
              className="h-10 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Loading...' : 'Fetch Cases'}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8" />

        {/* Table Section */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="ml-2 text-indigo-600 font-medium">Loading cases...</span>
          </div>
        )}
        {!isLoading && (
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Courthouse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practice Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matter Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Outcome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verdict</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time to First CMC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time to First Dismissal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Cycle Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Refreshed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refresh Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attorneys Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judge Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Causes of Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Federal?</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint Overview</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {cases.map((case_: Case, idx: number) => (
                    <tr key={case_.case_token} className={idx % 2 === 0 ? 'bg-white hover:bg-indigo-50' : 'bg-gray-50 hover:bg-indigo-50'}>
                      <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                        <Link to={`/cases/${case_.case_token}`} className="text-indigo-600 hover:text-indigo-900" title={case_.name}>
                          {renderCell(case_.name)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.case)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.court_type)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.court_code)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.court)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.filing_courthouse)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.county)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.state?.toUpperCase())}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.type)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.category)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.practice_area)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.matter_type)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.case_outcome_type)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.verdict)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.time_to_first_cmc)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.time_to_first_dismissal)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.case_cycle_time)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.filing_date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.case_last_updated)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.last_refreshed)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.parties)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.alert)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.refresh)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.events)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.attorneys)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.documents)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.judge)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.raw_causes_of_action)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.is_federal !== undefined ? (case_.is_federal ? 'Yes' : 'No') : 'N/A')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(case_.complaint_overview)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseList; 