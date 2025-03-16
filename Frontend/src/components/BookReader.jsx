import React, { useState } from "react";
import { ReactReader } from "react-reader";

const BookReader = ({ bookUrl, onClose }) => {
  const [location, setLocation] = useState(null); // Current location in the book

  const handleLocationChange = (epubCfi) => {
    setLocation(epubCfi); // Update location when the user navigates
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Close Reader
      </button>

      {/* Reader Container */}
      <div style={{ width: "80%", height: "80%" }}>
        <ReactReader
          url={bookUrl} // URL of the EPUB file
          location={location} // Current location in the book
          locationChanged={handleLocationChange} // Callback for location changes
        />
      </div>
    </div>
  );
};

export default BookReader;
