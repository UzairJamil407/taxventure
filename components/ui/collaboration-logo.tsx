import React from 'react';
import Image from 'next/image';

interface CollaborationLogoProps {
  variant?: "horizontal" | "vertical" | "compact";
  showText?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
}

export const CollaborationLogo: React.FC<CollaborationLogoProps> = ({ 
  variant = "horizontal",
  showText = true,
  className = "",
  size = "medium"
}) => {
  const sizeClasses = {
    small: {
      text: "text-sm sm:text-base",
      spacing: "space-x-4 sm:space-x-6"
    },
    medium: {
      text: "text-base sm:text-lg",
      spacing: "space-x-6 sm:space-x-8"
    },
    large: {
      text: "text-lg sm:text-xl",
      spacing: "space-x-8 sm:space-x-10"
    }
  };

  const currentSize = sizeClasses[size];

  if (variant === "horizontal") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <span className={`font-semibold text-yellow-600 ${currentSize.text} mb-1 leading-none`}>
          A project of
        </span>
        <div className={`flex items-center space-x-2`}>
          <a 
            href="https://theatventure.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity underline decoration-yellow-600"
          >
            <span className={`font-semibold text-yellow-600 ${currentSize.text} leading-none`}>
              ATVENTURE
            </span>
          </a>
          <span className="text-yellow-600 font-semibold">&</span>
          <a 
            href="https://seerahtintl.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity underline decoration-yellow-600"
          >
            <span className={`font-semibold text-yellow-600 ${currentSize.text} leading-none`}>
              SEERAHT INTL.
            </span>
          </a>
        </div>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <span className={`font-semibold text-yellow-600 ${currentSize.text} text-center`}>
          A project of
        </span>
        <div className="flex items-center space-x-3 text-center">
          <a 
            href="https://theatventure.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <span className={`font-semibold text-yellow-600 ${currentSize.text} underline decoration-yellow-600`}>
              ATVENTURE
            </span>
          </a>
          <span className="text-yellow-600">&</span>
          <a 
            href="https://seerahtintl.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <span className={`font-semibold text-yellow-600 ${currentSize.text} underline decoration-yellow-600`}>
              SEERAHT INTL.
            </span>
          </a>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={`font-semibold text-yellow-600 ${currentSize.text}`}>
          A project of{' '}
          <a 
            href="https://theatventure.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity underline decoration-yellow-600"
          >
            ATVENTURE
          </a>
          {' '}& {' '}
          <a 
            href="https://seerahtintl.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity underline decoration-yellow-600"
          >
            SEERAHT INTL.
          </a>
        </span>
      </div>
    );
  }

  return null;
};