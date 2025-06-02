import React from 'react';

interface Case {
  id: string;
  title: string;
  court: string;
  date: string;
  status: string;
}

interface CaseListProps {
  cases: Case[];
}

const CaseList: React.FC<CaseListProps> = ({ cases }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {cases.map((case_) => (
          <li key={case_.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {case_.title}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="truncate">{case_.court}</span>
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {case_.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {case_.date}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList; 