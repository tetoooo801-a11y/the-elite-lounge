"use client";

import React from "react";

interface KineticTextProps {
  children: string;
  isArabic: boolean;
  className?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  isArabic,
  className = "",
}) => {
  if (isArabic) {
    // Split Arabic by words to avoid breaking cursive letter connections
    const words = children.split(" ");
    return (
      <span className={`kinetic-text ${className}`}>
        {words.map((word, idx) => (
          <React.Fragment key={idx}>
            <span className="kinetic-char inline-block">{word}</span>
            {idx < words.length - 1 && <span> </span>}
          </React.Fragment>
        ))}
      </span>
    );
  } else {
    // Split English by individual characters
    const chars = children.split("");
    return (
      <span className={`kinetic-text ${className}`}>
        {chars.map((char, idx) => (
          <span key={idx} className="kinetic-char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  }
};
