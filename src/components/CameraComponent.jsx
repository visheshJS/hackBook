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
      stopCamera(); // Stop any existing stream before starting a new one

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === "videoinput");
      const backCamera = videoDevices.find(device => device.label.toLowerCase().includes("back")) || videoDevices[0];

      if (!backCamera) {
        console.error("No back camera found.");
        return;
      }

      const constraints = {
        video: { deviceId: { exact: backCamera.deviceId } }
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
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
