"use client";

import React, { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  overlayClass?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  src,
  alt,
  overlayClass = "",
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't apply animation if user prefers reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 parallax-wrap">
      {/* Dark overlay overlays */}
      <div className={`absolute inset-0 bg-black/40 z-10 ${overlayClass}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-20" />
      
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center grayscale parallax-img"
        style={{
          transform: `scale(1.1) translate(${coords.x}px, ${coords.y}px)`,
        }}
      />
    </div>
  );
};
