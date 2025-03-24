import React from "react";
import { useLocation } from "react-router-dom";
import BookReader from "./BookReader";

const BookReaderPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookUrl = params.get("url");
  const type = params.get("type");

  return (
    <div>
      <BookReader fileUrl={bookUrl} fileType={"epub"} onClose={() => window.close()} />
    </div>
  );
};

export default BookReaderPage;