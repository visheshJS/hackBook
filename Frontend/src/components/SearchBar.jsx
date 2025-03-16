import React, { useState } from "react";
import BookList from "./BookList";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search on pressing Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by book name or ISBN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line to listen for Enter key
          className="w-full sm:w-auto sm:min-w-[500px] max-w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
        <button
          onClick={handleSearch}
          className="sm:w-auto px-4 py-2 cursor-pointer active:scale-90 transform duration-100 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Book List */}
      <BookList books={books} />
    </div>
  );
};

export default SearchBar;
