import React, { useState } from "react";
import BookReader from "./BookReader";

const BookCard = ({ book }) => {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const openReader = () => {
    setIsReaderOpen(true);
  };

  const closeReader = () => {
    setIsReaderOpen(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between w-full sm:w-72 border hover:shadow-xl transition duration-200">
      {/* Book Title */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {book.title || "Unknown Title"}
      </h2>

      {/* Author */}
      <p className="text-gray-700 text-sm mt-2">
        <span className="font-medium">Author:</span> {book.author || "Unknown Author"}
      </p>

      {/* Publication Year */}
      <p className="text-gray-600 text-sm mt-1">
        <span className="font-medium">Year:</span> {book.year || "N/A"}
      </p>

      {/* Open Reader Button */}
      {book.url && (
        <button
          onClick={openReader}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Read Book
        </button>
      )}

      {/* Book Reader */}
      {isReaderOpen && <BookReader bookUrl={book.url} onClose={closeReader} />}
    </div>
  );
};

export default BookCard;
