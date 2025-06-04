import React from 'react';

interface FilterBarProps {
  onFilterChange: (filters: Partial<any['query']>) => void;
  jurisdiction: string[];
  onJurisdictionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, jurisdiction, onJurisdictionChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      status: e.target.value,
      jurisdiction: [],
      date_filed: '',
      case_type: '',
      judge: '',
      court: ''
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-48">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="w-full sm:w-48">
        <select
          value={jurisdiction.length === 1 ? jurisdiction[0] : 'all'}
          onChange={onJurisdictionChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Jurisdictions</option>
          <option value="oh">Ohio</option>
          <option value="in">Indiana</option>
          <option value="il">Illinois</option>
          <option value="ia">Iowa</option>
          <option value="mi">Michigan</option>
          <option value="mo">Missouri</option>
          <option value="ks">Kansas</option>
          <option value="mn">Minnesota</option>
          <option value="wi">Wisconsin</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar; 