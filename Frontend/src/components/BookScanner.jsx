import { useState } from "react";
import { Upload, Camera } from "lucide-react";
import Button from "../ui/Button";
import CameraComponent from "./CameraComponent";



export default function BookScanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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

  

  return (
    <div id="book-scanner" className="flex bg-[#f5f2f2] flex-col items-center justify-center p-6">
      

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mt-8">Search for Your Book</h1>
      <p className="text-gray-500 text-center mb-8">
        Drag or drop your book cover here or click to upload.
      </p>

      {/* Drag-and-Drop Box */}
      <div
        className={`border-dashed border-2 rounded-lg flex flex-col items-center justify-center ${
          dragOver ? "border-blue-500 bg-gray-800" : "border-gray-500 bg-gray-100"
        }`}
        style={{
          width: "250px", // Reduced width
          height: "250px", // Reduced height
          transition: "all 0.3s ease-in-out",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-700 rounded-full">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <span className="text-black mt-4 font-medium">Upload file</span>
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

      {/* Take Photo Button */}
      <Button
        className="bg-gray-950 text-white cursor-pointer w-full max-w-xs flex items-center justify-center mt-8 py-2 px-4 rounded-lg hover:bg-gray-800 transition"
        onClick={() => setShowCamera(true)}
      >
        <Camera className="w-5 h-5 mr-2" /> Take Picture
      </Button>

      {/* Preview Image */}
      {imagePreview && (
        <div className="mt-8 flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
          <button
            onClick={() => setImagePreview(null)}
            className="mt-4 text-white w-[28px] h-[28px] flex cursor-pointer gap-2 justify-center rounded-full text-sm bg-black hover:bg-gray-950 transition"
          ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="rounded-full" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
           
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
