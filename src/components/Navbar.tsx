"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export const Navbar: React.FC = () => {
  const { language, t, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navShimmerStyle, setNavShimmerStyle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Monitor scroll height to adjust nav style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shimmer effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setNavShimmerStyle(
      `radial-gradient(circle at ${x}px center, rgba(233, 193, 118, 0.08) 0%, rgba(18, 18, 18, 0.8) 50%)`
    );
  };

  const handleMouseLeave = () => {
    setNavShimmerStyle("");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all ease-[0.16,1,0.3,1] duration-500 border-b shadow-2xl ${
          scrolled
            ? "bg-background/95 backdrop-blur-2xl py-unit-sm"
            : "bg-surface/80 backdrop-blur-xl py-unit-md"
        } ${
          scrolled ? "border-primary/10" : "border-primary/15"
        }`}
        style={{ background: navShimmerStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-between items-center px-margin-safe max-w-[1440px] mx-auto">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-headline-lg text-[22px] md:text-headline-lg tracking-tighter text-primary group"
          >
            <span className="kinetic-text font-serif">
              {language === "ar" ? (
                <>
                  <span className="kinetic-char inline-block group-hover:-translate-y-0.5 transition-transform duration-500">ذا</span>{" "}
                  <span className="kinetic-char inline-block group-hover:translate-y-0.5 transition-transform duration-500">إيليت</span>{" "}
                  <span className="kinetic-char inline-block group-hover:-translate-y-0.5 transition-transform duration-500">لاونج</span>
                </>
              ) : (
                "The Elite Lounge"
              )}
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex gap-unit-xl items-center">
            <Link
              href="/#ritual"
              className={`font-label-caps text-label-caps pb-1 hover:text-primary transition-colors duration-500 gold-underline ${
                pathname === "/" ? "active" : ""
              }`}
            >
              {t("nav_ritual")}
            </Link>
            <Link
              href="/appointments"
              className={`font-label-caps text-label-caps pb-1 hover:text-primary transition-colors duration-500 gold-underline ${
                pathname === "/appointments" ? "active" : ""
              }`}
            >
              {t("nav_appointments")}
            </Link>
          </nav>

          {/* Trailing Icons & Lang Switcher */}
          <div className="flex items-center gap-unit-lg">
            {/* Language Switcher */}
            <div
              className="lang-switch-panel flex items-center px-3 py-1 cursor-pointer select-none"
              onClick={toggleLanguage}
            >
              <span
                className={`font-label-caps text-[11px] transition-opacity duration-300 ${
                  language === "en" ? "text-primary" : "text-on-surface-variant/60"
                }`}
              >
                EN
              </span>
              <span className="text-on-surface-variant/40 mx-2">/</span>
              <span
                className={`font-label-caps text-[11px] transition-opacity duration-300 ${
                  language === "ar" ? "text-primary" : "text-on-surface-variant/60"
                }`}
              >
                AR
              </span>
            </div>

            {/* Menu Button */}
            <button
              aria-label="Menu"
              className="text-on-surface-variant hover:text-primary transition-colors duration-500 flex items-center justify-center p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="material-symbols-outlined" data-icon="menu">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl transition-all duration-700 ease-[0.16,1,0.3,1] flex flex-col justify-center items-center gap-8 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <Link
          href="/#ritual"
          onClick={() => setMenuOpen(false)}
          className="font-display text-4xl text-on-surface hover:text-primary transition-colors"
        >
          {t("nav_ritual")}
        </Link>
        <Link
          href="/appointments"
          onClick={() => setMenuOpen(false)}
          className="font-display text-4xl text-on-surface hover:text-primary transition-colors"
        >
          {t("nav_appointments")}
        </Link>
        <div className="w-16 h-[1px] bg-primary/20 my-4" />
        <button
          onClick={() => {
            toggleLanguage();
            setMenuOpen(false);
          }}
          className="font-label-caps text-label-caps text-primary border border-primary/30 px-6 py-2 hover:bg-primary/10 transition-colors"
        >
          {language === "en" ? "العربية (AR)" : "English (EN)"}
        </button>
      </div>
    </>
  );
};
