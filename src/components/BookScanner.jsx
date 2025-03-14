import { useState } from "react";
import { Upload, Camera } from "lucide-react";
import Button from "./ui/Button";
import CameraComponent from "./CameraComponent";

export default function BookScanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement actual search functionality here
  };

  return (
    <div className="flex flex-col mt-20 gap-10 items-center justify-center p-6">
      {/* Search Bar */}
      <div className="w-full max-w-md flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by book name or ISBN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transform active:scale-90 duration-100 transition"
        >
          Search
        </button>
      </div>

      {/* File Upload UI */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">Upload file</h1>
        <p className="text-gray-400 mt-2 ">
          Drag or drop your files here or click to upload
        </p>

        <div
          className={`border-dashed border-2 ml-3 mt-2 rounded-lg w-80 h-80 flex flex-col items-center justify-center ${
            dragOver ? "border-blue-500 bg-gray-800" : "border-gray-500 bg-gray-900"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <div className="flex justify-center items-center w-16 h-16 bg-gray-700 rounded-full">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <span className="text-white mt-4">Upload file</span>
            <span className="text-gray-400 text-sm">Drag or drop here</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Take Photo Button */}
      <Button
        className="bg-gray-950 text-white cursor-pointer w-40 flex items-center justify-center"
        onClick={() => setShowCamera(true)}
      >
        <Camera className="w-5 h-5 " /> Take Picture
      </Button>

      {/* Preview Image */}
      {imagePreview && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="mt-4 w-40 h-auto rounded-lg shadow-lg"
          />
          <button
            onClick={() => setImagePreview(null)}
            className="mt-2 text-black px-2 py-2 rounded-xl text-sm bg-gray-200 hover:bg-gray-300 transition"
          >
            Remove Image
          </button>
        </div>
      )}

      {showCamera && (
        <CameraComponent
          onClose={() => setShowCamera(false)}
          onCapture={(imageUrl) => {
            setImagePreview(imageUrl);
            setShowCamera(false);
          }}
        />
      )}
    </div>
  );
}
