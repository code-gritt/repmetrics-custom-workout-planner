import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[120px] h-[90px]">
        <div className="absolute w-6 h-6 bg-orange-500 rounded-sm animate-square1"></div>
        <div className="absolute w-6 h-6 bg-orange-500 rounded-sm animate-square2"></div>
        <div className="absolute w-6 h-6 bg-orange-500 rounded-sm animate-square3"></div>
        <div className="absolute w-6 h-6 bg-orange-500 rounded-sm animate-square4"></div>
        <div className="absolute w-6 h-6 bg-orange-500 rounded-sm animate-square5"></div>
      </div>
    </div>
  );
};
