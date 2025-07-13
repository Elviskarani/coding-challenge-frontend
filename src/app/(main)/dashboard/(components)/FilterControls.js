// app/(main)/dashboard/(components)/FilterControls.js
'use client';

export default function FilterControls({ statusFilter, onStatusFilterChange }) {
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const getFilterButtonClass = (filterValue) => {
    const baseClass = "inline-flex items-center px-3 sm:px-4 py-2 border text-xs sm:text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200";
    
    if (statusFilter === filterValue) {
      return `${baseClass} border-transparent text-white bg-indigo-600 hover:bg-indigo-700`;
    }
    
    return `${baseClass} border-gray-300 text-gray-700 bg-white hover:bg-gray-50`;
  };

  return (
    <div className="mt-6 bg-white p-3 sm:p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Filter Tasks</h3>
        <div className="flex flex-wrap gap-2 sm:space-x-2 sm:gap-0">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
              className={getFilterButtonClass(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}