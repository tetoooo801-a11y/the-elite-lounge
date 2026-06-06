"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-primary/10 relative z-30 transition-opacity duration-500">
      <div className="flex flex-col items-center gap-unit-xl py-section-padding-desktop px-margin-safe max-w-[1440px] mx-auto">
        {/* Brand Logo Mark */}
        <div className="font-headline-xl text-[48px] md:text-headline-xl text-primary opacity-20 text-center select-none cursor-default hover:opacity-40 transition-opacity duration-700">
          {t("footer_logo")}
        </div>

        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-unit-lg md:gap-unit-xl">
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-500 gold-underline pb-1"
            href="#"
          >
            {t("footer_services")}
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-500 gold-underline pb-1"
            href="#"
          >
            {t("footer_heritage")}
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-500 gold-underline pb-1"
            href="#"
          >
            {t("footer_philosophy")}
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-500 gold-underline pb-1"
            href="#"
          >
            {t("footer_instagram")}
          </a>
          <a
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-500 gold-underline pb-1"
            href="#"
          >
            {t("footer_journal")}
          </a>
        </nav>

        {/* Copyright */}
        <div className="font-label-caps text-label-caps text-on-surface-variant/50 mt-unit-lg text-center border-t border-surface-variant pt-unit-lg w-full">
          {t("footer_copyright")}
        </div>
      </div>
    </footer>
  );
};
