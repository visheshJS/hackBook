import React from "react";

const LampEffect = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative">
      {/* Lamp Light Effect */}
      <div className="relative w-[600px] h-[300px] bg-[#0a0a0a] rounded-lg shadow-inner flex items-center justify-center">
        {/* Glowing Light */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[#00c2cb] to-transparent opacity-50 blur-lg"></div>

        {/* Lamp Text */}
        <h1 className="text-5xl font-bold text-gray-300 z-10">
          Build lamps the right way
        </h1>
      </div>
    </div>
  );
};

export default LampEffect;
