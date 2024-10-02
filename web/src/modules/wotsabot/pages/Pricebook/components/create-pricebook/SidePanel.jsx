import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

const SidePanel = () => {
  const [isSystemFiltersOpen, setIsSystemFiltersOpen] = useState(false);
  const [isFilterByFieldsOpen, setIsFilterByFieldsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const systemFilters = [
    'Touched Records',
    'Untouched Records',
    'Record Action',
    'Related Record Action',
    'Locked',
  ];

  const filterFields = [
    'Active',
    'Created By',
    'Created Time',
    'Modified By',
    'Modified Time',
    'Price Book Name',
    'Price Book Owner',
    'Pricing Model',
    'Tag',
    
  ];

  // Filter system filters based on the search query
  const filteredSystemFilters = systemFilters.filter(filter =>
    filter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter filter fields based on the search query
  const filteredFilterFields = filterFields.filter(field =>
    field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-white p-4 border border-md shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Filter Price Books By</h2>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-full w-full mb-4">
        <FaSearch className="text-gray-700 ml-3 text-xl font-light" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 outline-none border-none rounded-full"
        />
      </div>

      {/* System Defined Filters Dropdown */}
      <div className="mb-4">
        <button
          onClick={() => setIsSystemFiltersOpen(!isSystemFiltersOpen)}
          className="w-full text-left p-2 bg-white rounded flex items-center"
        >
          <FaChevronDown className="mr-2" />
          System Defined Filters
        </button>
        {isSystemFiltersOpen && (
          <div className="mt-2 p-2 bg-white">
            {filteredSystemFilters.length > 0 ? (
              filteredSystemFilters.map((filter) => (
                <label key={filter} className="block mb-2">
                  <input type="checkbox" className="mr-2" />
                  {filter}
                </label>
              ))
            ) : (
              <p>No matching filters found</p>
            )}
          </div>
        )}
      </div>

      {/* Filter By Fields Dropdown */}
      <div className="flex-grow">
        <button
          onClick={() => setIsFilterByFieldsOpen(!isFilterByFieldsOpen)}
          className="w-full text-left p-2 bg-white rounded flex items-center"
        >
          <FaChevronDown className="mr-2" />
          Filter By Fields
        </button>
        {isFilterByFieldsOpen && (
          <div className="mt-2 p-2 bg-white">
            {filteredFilterFields.length > 0 ? (
              filteredFilterFields.map((field) => (
                <label key={field} className="block mb-2">
                  <input type="checkbox" className="mr-2" />
                  {field}
                </label>
              ))
            ) : (
              <p>No matching filters found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
