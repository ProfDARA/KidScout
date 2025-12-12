import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-teal-200 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🧭</div>
      </div>
      <h2 className="text-2xl font-bold text-teal-800 mb-2">Scouting Talent...</h2>
      <p className="text-gray-600 text-center animate-pulse">
        Reading handwriting patterns... <br/>
        Mapping personality traits...
      </p>
    </div>
  );
};

export default LoadingOverlay;
