"use client";

import React, { useEffect, useRef, useState } from "react";

interface SmartAmountProps {
  amount: string;
  className?: string; // Text preset to use (e.g., text-preset-1)
  containerClassName?: string;
  prefix?: string;
  suffix?: string;
  maxWidth?: number; // Optional: specific width to fit into
}

/**
 * SmartAmount component that dynamically scales its content to fit within its container.
 * This version uses a more robust measurement approach to prevent overlapping and clipping.
 */
export const SmartAmount: React.FC<SmartAmountProps> = ({ 
  amount, 
  className = "text-preset-1", 
  containerClassName = "",
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
      
      // Get the available width precisely
      const containerWidth = maxWidth || containerRef.current.getBoundingClientRect().width;
      const textWidth = textRef.current.scrollWidth;

      if (textWidth > containerWidth && containerWidth > 0) {
        // More aggressive buffer for professional spacing (10px)
        const buffer = 10;
        const availableWidth = Math.max(0, containerWidth - buffer);
        const newScale = Math.max(0.35, availableWidth / textWidth); 
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    // Use ResizeObserver for more reliable measurement than just window resize
    const observer = new ResizeObserver(() => {
      // Use requestAnimationFrame to ensure we measure after layout
      requestAnimationFrame(scaleToFit);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial scale
    scaleToFit();

    return () => observer.disconnect();
  }, [fullText, maxWidth]);

  const isCentered = /center|justify-center/.test(className);

  return (
    <div 
      suppressHydrationWarning
      ref={containerRef} 
      className={`relative inline-flex items-center w-full overflow-visible ${isCentered ? 'justify-center' : 'justify-start'} ${containerClassName}`}
      style={{ minHeight: '1.1em' }}
    >
      <span 
        ref={textRef}
        className={`${className} whitespace-nowrap transition-transform duration-200 ease-out`}
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: isCentered ? 'center' : 'left',
          display: 'inline-block',
          width: scale < 1 ? `${100 / scale}%` : 'auto',
          maxWidth: scale < 1 ? `${100 / scale}%` : 'none'
        }}
      >
        {fullText}
      </span>
    </div>
  );
};
