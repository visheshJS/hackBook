import { useEffect, useRef, useState } from "react";

const CameraComponent = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    startBackCamera();
    return () => stopCamera();
  }, []);

  const startBackCamera = async () => {
    try {
      // Stop any existing stream before starting a new one
      stopCamera();

      // Request camera permissions and select the back camera
      const constraints = {
        video: {
          facingMode: "environment", // Use back camera
        },
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access your camera. Please check browser permissions and ensure your device has a back camera."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    onCapture(imageUrl);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md h-auto rounded-lg shadow-lg"
      />
      <div className="mt-4 flex space-x-4">
        <button
          onClick={capturePhoto}
          className="p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
        >
          📸 Capture
        </button>
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="p-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
        >
          ❌ Close
        </button>
      </div>
    </div>
  );
};

export default CameraComponent;
