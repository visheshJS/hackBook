import React from "react";

const BookCard = ({ book }) => {
  const openReader = () => {
    window.open(`/read-book?url=${encodeURIComponent(book.url)}&type=${encodeURIComponent(book.fileType)}`, "_blank");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row w-full sm:w-110 border hover:shadow-xl transition duration-200 ml-5 mb-4 md:mb-6 mr-50 lg:mb-8 mr-5">
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={`${book.title} thumbnail`}
          className="w-full sm:w-28 h-40 object-cover rounded-lg "
        />
      )}
      <div className="flex flex-col justify-between mt-4 sm:mt-0 sm:ml-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate w-full sm:w-65">
          {book.title || "Unknown Title"}
        </h2>
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-medium">Author:</span> {book.author || "Unknown Author"}
        </p>
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-medium">Year:</span> {book.year || "N/A"}
        </p>
        {book.url && (
          <div className="flex justify-between mt-4 w-full sm:w-64">
            <button
              onClick={openReader}
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-grow"
            >
              Read Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;