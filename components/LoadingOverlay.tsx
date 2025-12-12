import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">✨</div>
      </div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Scouting the Stars...</h2>
      <p className="text-indigo-600/80 text-center font-medium">
        Analyzing handwriting constellations... <br/>
        Mapping personality traits...
      </p>
    </div>
  );
};

export default LoadingOverlay;