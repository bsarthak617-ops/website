import React from 'react';

export default function Logo({ 
  className = '', 
  dropClassName = 'h-9 sm:h-10', 
  textClassName = 'h-6 sm:h-7', 
  showText = true 
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 3D Animated Oil Teardrop Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/oilteq-drop-animated.webp"
          alt="OILTEQ 3D Animated Emblem"
          className={`${dropClassName} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_3px_10px_rgba(202,154,67,0.25)]`}
        />
      </div>

      {/* Brand Typographic Wordmark */}
      {showText && (
        <div className="flex items-center shrink-0">
          <img
            src="/oilteq-text.png"
            alt="OILTEQ INDUSTRIES"
            className={`${textClassName} w-auto object-contain dark:hidden`}
          />
          <img
            src="/oilteq-text-dark.png"
            alt="OILTEQ INDUSTRIES"
            className={`${textClassName} w-auto object-contain hidden dark:block`}
          />
        </div>
      )}
    </div>
  );
}
