"use client";

import React, { useEffect, useRef, useState } from "react";

interface SmartAmountProps {
  amount: string;
  className?: string; // Base preset to use (e.g., text-preset-1)
  prefix?: string;
  suffix?: string;
  maxWidth?: number; // Optional: specific width to fit into
}

/**
 * SmartAmount component that dynamically scales its content to fit within its container
 * using CSS transform scale. This is more "professional" than jumping between font sizes.
 */
export const SmartAmount: React.FC<SmartAmountProps> = ({ 
  amount, 
  className = "text-preset-1", 
  prefix = "",
  suffix = "",
  maxWidth
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);
  const fullText = `${prefix}${amount}${suffix}`;

  useEffect(() => {
    const scaleToFit = () => {
      if (!containerRef.current || !textRef.current) return;
      
      const containerWidth = maxWidth || containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;

      if (textWidth > containerWidth && containerWidth > 0) {
        // Use a slightly more aggressive buffer (0.85) and ensure max container width is respected
        const safeContainerWidth = containerWidth - 4; // 4px buffer
        const newScale = Math.max(0.4, safeContainerWidth / textWidth); 
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    scaleToFit();
    window.addEventListener('resize', scaleToFit);
    return () => window.removeEventListener('resize', scaleToFit);
  }, [fullText, maxWidth]);

  const isCentered = /center|justify-center/.test(className);

  return (
    <div 
      ref={containerRef} 
      className={`flex items-center w-full overflow-hidden ${isCentered ? 'justify-center' : 'justify-start'}`}
      style={{ minHeight: '1.2em' }}
    >
      <span 
        ref={textRef}
        className={`${className} whitespace-nowrap inline-block transition-transform duration-200 px-1`}
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: isCentered ? 'center' : 'left',
          textAlign: isCentered ? 'center' : 'left',
          width: 'auto',
          display: 'inline-block'
        }}
      >
        {fullText}
      </span>
    </div>
  );
};
