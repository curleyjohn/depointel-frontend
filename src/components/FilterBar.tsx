import React from 'react';

interface FilterBarProps {
  onFilterChange: (filters: {
    search: string;
    status: string;
    dateRange: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      search: e.target.value,
      status: '',
      dateRange: ''
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      search: '',
      status: e.target.value,
      dateRange: ''
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search cases..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar; 