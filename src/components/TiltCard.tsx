"use client";

import React, { useState, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 10,
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const shimmerX = (x / rect.width) * 100;
    const shimmerY = (y / rect.height) * 100;

    const rotateX = ((y / rect.height) - 0.5) * -maxTilt;
    const rotateY = ((x / rect.width) - 0.5) * maxTilt;

    setStyle({
      transform: `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: `0 25px 50px -12px rgba(233, 193, 118, 0.25)`,
      backgroundImage: `radial-gradient(circle at ${shimmerX}% ${shimmerY}%, rgba(233, 193, 118, 0.15) 0%, transparent 50%), linear-gradient(135deg, rgba(233, 193, 118, 0.05) 0%, rgba(255,255,255,0) 100%)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)",
      boxShadow: "",
      backgroundImage: "",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel p-unit-xl flex flex-col justify-between min-h-[400px] hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
