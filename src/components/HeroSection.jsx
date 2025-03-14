import React from "react";

const HeroSection = () => {
  const scrollToBookScanner = () => {
    const bookScannerSection = document.getElementById("book-scanner");
    if (bookScannerSection) {
      bookScannerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <header className="w-full fixed top-0 left-0 bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
        <h1 className="text-lg mr-4 font-bold flex items-center">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-6 w-6">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </span>
          BookFinder
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#how-it-works" className="text-gray-600 text-sm hover:text-black">
                How it Works
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-500 text-sm hover:text-black">
                Features
              </a>
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Hero Section */}
      <div className="text-center py-42 bg-[#f2f2f2] ">
        <h1 className="text-6xl font-bold tracking-tight">
          Find Any Book With Just a Photo
        </h1>
        <p className="text-gray-500 text-lg mt-4">
          Upload a photo of any book cover or page and instantly get results.
        </p>
        <div className="mt-6 space-x-4">
          <button 
            className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer transform active:scale-90 duration-150 hover:bg-gray-800 transition"
            onClick={scrollToBookScanner}
          >
            Try It Now
          </button>
          <button className="border border-black px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>
    </>  
  );
};

export default HeroSection;
