// import { useState } from "react";
// import PropTypes from "prop-types";
// import { IoIosSearch } from "react-icons/io";

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//     if (onSearch) {
//       onSearch(event.target.value);
//     }
//   };

//   return (
//     <div className="relative">

//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         className="text-sm text-gray-600 border border-gray-400 pl-9 pr-16 py-1.5 rounded-full hover:border-blue-400 focus:outline-none focus:border-blue-400 transition-colors duration-150"
//         placeholder="Search Sales Metric"
//       />
//       <IoIosSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
//     </div>
//   );
// };

// SearchBar.propTypes = {
//   onSearch: PropTypes.func,
// };

// export default SearchBar;


import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full text-sm text-gray-600 border border-gray-400 pr-28 pl-4 py-2 pr-10 rounded-full hover:border-blue-400 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        placeholder="Search Sales Metric"
      />
      <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
