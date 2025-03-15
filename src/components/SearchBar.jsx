import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by book name or ISBN..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-auto sm:min-w-[500px] max-w-[300px] px-4 py-2 border-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
      
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className=" sm:w-auto px-4 py-2 cursor-pointer active:scale-90 transform duration-100 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

