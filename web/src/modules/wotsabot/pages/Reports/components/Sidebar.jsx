import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"; // Importing search and close icons from react-icons

const Sidebar = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      items: [
        { name: "Lead Reports", path: "../lead-reports" },
        { name: "Accounts and Contact Reports", path: "../account-and-contact-reports" },
        { name: "Deal Reports", path: "../deal-reports" },
        { name: "Quote Reports", path: "../quote-reports" },
        { name: "Sales Order Reports", path: "../sales-order-reports" },
        { name: "Sales Metrics Reports", path: "../sales-metrics-reports" },
        { name: "Meeting Reports", path: "../meeting-reports" },
        { name: "Invoice Reports", path: "../invoice-reports" },
        { name: "Visit Report", path: "../visit-reports" },
      ],
    },
  ];

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Filter items based on the search query
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <nav className="z-10 bg-gray-100">
      {/* Adjusted Sidebar Width */}
      <div className="flex flex-col h-full bg-gray-100 text-neutral-700 w-80">
        {/* Title */}
        <h2 className="m-6 text-3xl ml-16 font-bold">Reports</h2>

        {/* Search Bar */}
        <div className="ml-6 mr-6 mb-4 relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-4 pr-10 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery ? (
            <AiOutlineClose
              className="absolute right-3 top-2 text-gray-400 cursor-pointer"
              onClick={clearSearch}
            />
          ) : (
            <AiOutlineSearch className="absolute right-3 top-2 text-gray-400" />
          )}
        </div>

        {/* Card-like Navigation Links */}
        <div className="mt-4 flex-1 overflow-y-auto px-6">
          {filteredSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              {/* Map over filtered items to create NavLinks */}
              {section.items.map((item, itemIndex) => (
                <NavLink
                  key={itemIndex}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 ${isActive
                      ? "bg-gray-200 text-neutral-800 border-l-4 border-blue-500"
                      : "text-neutral-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;