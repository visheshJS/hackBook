import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        placeholder="Search by book name or ISBN..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" sm:min-w-sm sm:w-full max-w-md w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-4 py-2 cursor-pointer transform duration-100 active:scale-90 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
