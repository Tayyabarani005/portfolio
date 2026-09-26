import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Subtle Grain Texture Overlay */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-40 bg-grain mix-blend-multiply opacity-40"
      />

      {/* Ambient Drifting Gradient Blobs behind Hero */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[650px] overflow-hidden pointer-events-none z-0"
      >
        {/* Butter Blob */}
        <div 
          className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-[#F6DE8D] opacity-[0.18] blur-3xl animate-blob-1"
        />

        {/* Sage Blob */}
        <div 
          className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-[#C5D8A4] opacity-[0.16] blur-3xl animate-blob-2"
        />

        {/* Peach Blob */}
        <div 
          className="absolute top-64 left-1/3 w-72 h-72 rounded-full bg-[#F6C6A8] opacity-[0.14] blur-3xl animate-blob-3"
        />
      </div>
    </>
  );
};
