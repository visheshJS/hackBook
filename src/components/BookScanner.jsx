import { useState } from "react";
import { Upload, Camera, Search, XCircle } from "lucide-react";
import Button from "./ui/Button";
import CameraComponent from "./CameraComponent";

export default function BookScanner() {
  const [imagePreview, setImagePreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="flex flex-col mt-20 items-center justify-center p-6">
      <h1 className="text-3xl font-bold">Search for Your Book</h1>
      <p className="text-gray-500">
        Upload a photo of a book cover or take a picture to find download
        options.
      </p>

      <div className="flex space-x-4 mt-4">
        <Button className="bg-gray-950 text-white cursor-pointer">
          <label className="flex items-center cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </Button>
        <Button
          className="bg-gray-950 text-white cursor-pointer"
          onClick={() => setShowCamera(true)}
        >
          <Camera className="w-5 h-5 mr-2" /> Take Picture
        </Button>
      </div>

      <div className="mt-4 border p-4 rounded-lg w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700">
          Upload Here
        </label>
        {imagePreview && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="mt-4 w-40 h-auto rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="mt-2  text-black px-2 py-2 rounded-2xl text-sm"
            >
              {" "}
              <svg
              className="cursor-pointer"
                fill="#000000"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
                xml:space="preserve"
              >
                <polygon
                  points="335.188,154.188 256,233.375 176.812,154.188 154.188,176.812 233.375,256 154.188,335.188 176.812,357.812 
	256,278.625 335.188,357.812 357.812,335.188 278.625,256 357.812,176.812 "
                />
                <path
                  d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
	c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <Button className="bg-gray-950 text-white flex items-center cursor-pointer">
            <Search className="w-5 h-5 mr-2" /> Search
          </Button>
        </div>
      </div>

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
