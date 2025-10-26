import React from 'react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone 14 Pro frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[55px] p-2 shadow-2xl">
        {/* Screen bezel */}
        <div className="w-full h-full bg-black rounded-[47px] p-1">
          {/* Actual screen */}
          <div className="w-full h-full bg-white rounded-[42px] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-10"></div>
            
            {/* Screen content */}
            <div className="w-full h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};