import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import BookReaderPage from "./components/BookReaderPage";

const MainRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/read-book" element={<BookReaderPage />} />
    </Routes>
  </Router>
);

export default MainRouter;