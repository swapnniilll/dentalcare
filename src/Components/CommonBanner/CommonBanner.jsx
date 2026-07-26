import React from 'react';

function CommonBanner({ title, subtitle, backgroundImage, className }) {
  return (
    <div
      className={`relative w-full h-[70vh] bg-cover   flex items-center justify-center ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold border-b-2 pb-4">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl">{subtitle}</p>}
      </div>
    </div>
  );
}

export default CommonBanner;
