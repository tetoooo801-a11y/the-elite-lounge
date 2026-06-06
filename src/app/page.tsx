"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { TiltCard } from "@/components/TiltCard";
import { KineticText } from "@/components/KineticText";

export default function Home() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-[100px]">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-margin-safe py-section-padding-mobile md:py-section-padding-desktop">
          <ParallaxBackground
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_bXUYEQ0gxMEPX--WJiCutYBRL1K51HehfXzXlKd8KG7us8n2-LtyPqQXqS63BcDik6RfiYDL24_G220VGkX8qE6Gj1CAEOinIrUq-iULFudqHre1sMhKjIYcnZVDhR2IGebCjtOnCwf_qXJIVlykMRXPhhShnEi4-Br8gSjOR9yFY-HDKRF55g6pPmG_vrgWGnqo8JmImQaw8TT7b0T7SCqJl58G8kUxH9QH35UyhL4u_xbp94Y5rA0zRRhtzfI-1J5rs6GIUxU9"
            alt="Cinematic luxury atmosphere background"
          />

          <div className="relative z-30 max-w-[1440px] w-full mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter">
            <div className="col-span-4 md:col-span-10 md:col-start-2 text-center flex flex-col items-center">
              <RevealOnScroll delayClass="delay-100" className="flex flex-col items-center">
                <span className="font-label-caps text-label-caps text-primary mb-unit-lg tracking-[0.4em] uppercase block">
                  {t("hero_subtitle")}
                </span>

                {isAr ? (
                  <h1 className="font-display text-display-lg-mobile md:text-display text-on-surface mb-unit-xl group">
                    <KineticText isArabic={true}>طقوس</KineticText>
                    <br />
                    <span className="text-primary/90 font-serif italic block mt-unit-md">
                      <KineticText isArabic={true}>الأناقة</KineticText>
                    </span>
                  </h1>
                ) : (
                  <h1 className="font-display text-display-lg-mobile md:text-display text-on-surface mb-unit-xl group">
                    <KineticText isArabic={false}>The Ritual of</KineticText>
                    <br />
                    <span className="text-primary/90 font-serif italic block mt-unit-md">
                      <KineticText isArabic={false}>Refinement</KineticText>
                    </span>
                  </h1>
                )}

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-unit-xl opacity-80">
                  {t("hero_desc")}
                </p>

                <Link
                  href="/appointments"
                  className="btn-luxury inline-flex items-center gap-unit-sm px-unit-xl py-unit-md border border-primary text-primary font-label-caps text-label-caps hover:bg-primary hover:text-background transition-all duration-500 uppercase cursor-pointer"
                >
                  {t("hero_btn")}
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Asymmetrical Image & Text Block: The Craft */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop px-margin-safe max-w-[1440px] mx-auto"
          id="ritual"
        >
          <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter items-center">
            {/* Image Panel */}
            <div className="col-span-4 md:col-span-5 md:col-start-2 order-2 md:order-1 relative mt-unit-xl md:mt-0">
              <RevealOnScroll className="relative z-10">
                <div className="absolute -inset-4 border border-primary/10 -z-10 translate-x-4 translate-y-4 rtl:-translate-x-4"></div>
                <div className="overflow-hidden aspect-[0.73]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuODop41qd26R7LW1pP-RkyzEbnmHTr5qNrDq31uZxI9-gl8JZFUZYZ42NPkVX0spJo-CVgK1nmu6PIz48C7zC966mdAbSc111e9R6tAxuzvlb5-psCvIHu8_bWfzJQpOhF4CHHuQblRkdoR4aMmU6tbL8wUwEHASwLpDUFgiLCaVtna-uL_lQEyoGNTbwTm0cTpkp3DL7VlCT1WEpb-3J_c0gP0lQunt5CyKZapNQMe5JvWt43ETKAfNfuoaw-PGZBiThZ9AlTsP9"
                    alt="Close-up of a professional barber performing a precision haircut"
                    className="w-full h-full object-cover filter contrast-125 saturate-50 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Text Panel */}
            <div className="col-span-4 md:col-span-5 md:col-start-8 order-1 md:order-2 flex flex-col justify-center">
              <RevealOnScroll className="flex flex-col">
                <span className="font-label-caps text-label-caps text-primary mb-unit-lg border-b border-primary/30 pb-unit-sm inline-block w-max">
                  {t("craft_chapter")}
                </span>

                {isAr ? (
                  <h2 className="font-display text-headline-xl text-on-surface mb-unit-lg leading-tight group">
                    <KineticText isArabic={true}>الحرفة</KineticText>
                  </h2>
                ) : (
                  <h2 className="font-display text-headline-xl text-on-surface mb-unit-lg leading-tight group">
                    <KineticText isArabic={false}>The</KineticText>
                    <br />
                    <KineticText isArabic={false}>Craft</KineticText>
                  </h2>
                )}

                <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mb-unit-lg">
                  {t("craft_desc")}
                </p>

                <a
                  className="group inline-flex items-center gap-unit-xs font-label-caps text-label-caps text-primary w-max cursor-pointer"
                  href="#"
                >
                  <span className="border-b border-transparent group-hover:border-primary transition-colors duration-500 pb-1">
                    {t("craft_link")}
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-500 rtl:group-hover:-translate-x-1"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </a>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* The Repertoire (Glassmorphic Cards) */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop px-margin-safe max-w-[1440px] mx-auto">
          <div className="mb-unit-xl text-center">
            <RevealOnScroll className="flex flex-col items-center">
              <h2 className="font-display text-headline-lg text-on-surface mb-unit-sm group">
                <KineticText isArabic={isAr}>{t("repertoire_title")}</KineticText>
              </h2>
              <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60 uppercase tracking-widest">
                {t("repertoire_subtitle")}
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Service Card 1 */}
            <RevealOnScroll delayClass="delay-100">
              <TiltCard>
                <div>
                  <div className="mb-unit-lg text-primary opacity-50 transition-opacity duration-500">
                    <span className="material-symbols-outlined text-[40px]" data-icon="content_cut">
                      content_cut
                    </span>
                  </div>
                  <h3 className="font-display text-[32px] text-on-surface mb-unit-md font-serif">
                    {t("service1_title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
                    {t("service1_desc")}
                  </p>
                </div>
                <div className="mt-unit-xl border-t border-primary/20 pt-unit-md flex justify-between items-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    {t("service1_time")}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary">
                    {t("service1_price")}
                  </span>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Service Card 2 */}
            <RevealOnScroll delayClass="delay-200">
              <TiltCard>
                <div>
                  <div className="mb-unit-lg text-primary opacity-50 transition-opacity duration-500">
                    <span className="material-symbols-outlined text-[40px]" data-icon="water_drop">
                      water_drop
                    </span>
                  </div>
                  <h3 className="font-display text-[32px] text-on-surface mb-unit-md font-serif">
                    {t("service2_title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
                    {t("service2_desc")}
                  </p>
                </div>
                <div className="mt-unit-xl border-t border-primary/20 pt-unit-md flex justify-between items-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    {t("service2_time")}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary">
                    {t("service2_price")}
                  </span>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Service Card 3 */}
            <RevealOnScroll delayClass="delay-300">
              <TiltCard>
                <div>
                  <div className="mb-unit-lg text-primary opacity-50 transition-opacity duration-500">
                    <span className="material-symbols-outlined text-[40px]" data-icon="face">
                      face
                    </span>
                  </div>
                  <h3 className="font-display text-[32px] text-on-surface mb-unit-md font-serif">
                    {t("service3_title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
                    {t("service3_desc")}
                  </p>
                </div>
                <div className="mt-unit-xl border-t border-primary/20 pt-unit-md flex justify-between items-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    {t("service3_time")}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary">
                    {t("service3_price")}
                  </span>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* Asymmetrical Image & Text Block: The Sanctuary */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop px-margin-safe max-w-[1440px] mx-auto bg-surface-container-lowest/50">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter items-center">
            {/* Text Panel */}
            <div className="col-span-4 md:col-span-5 md:col-start-2 flex flex-col relative z-10">
              <RevealOnScroll className="flex flex-col">
                <span className="font-label-caps text-label-caps text-primary mb-unit-lg border-b border-primary/30 pb-unit-sm inline-block w-max">
                  {t("sanctuary_chapter")}
                </span>

                {isAr ? (
                  <h2 className="font-display text-headline-xl text-on-surface mb-unit-lg leading-tight group">
                    <KineticText isArabic={true}>الملاذ</KineticText>
                  </h2>
                ) : (
                  <h2 className="font-display text-headline-xl text-on-surface mb-unit-lg leading-tight group">
                    <KineticText isArabic={false}>The</KineticText>
                    <br />
                    <KineticText isArabic={false}>Sanctuary</KineticText>
                  </h2>
                )}

                <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mb-unit-lg">
                  {t("sanctuary_desc")}
                </p>
              </RevealOnScroll>
            </div>

            {/* Image Panel */}
            <div className="col-span-4 md:col-span-6 md:col-start-7 relative mt-unit-xl md:mt-0 md:-ml-unit-xl rtl:md:ml-0 rtl:md:-mr-unit-xl">
              <RevealOnScroll className="relative">
                <div className="absolute -inset-4 border border-primary/10 -z-10 -translate-x-4 -translate-y-4 rtl:translate-x-4"></div>
                <div className="overflow-hidden aspect-[0.73]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDFWvLRWZSkFYOuEdKpNgizUKkHjTUTNAYVGnMWF5oHX-KFjIS8Js9OnmDFBKDvuoAIk8YePzl9PGSRgr6DzU6YjpLgCOmwQwi5TJDQxIWcrciYlXFzcBFvePEbN5CRNwXiRa9bJfhy2yvH-MXn7afqu15EeqEUZjh2JzKkM4LLDKpyHeyVDfOHpMreDCXjgYVA5pTPRr4GExn54KepFZL-cd7yTUT2TLfueeDnl0clnLdeAnz0rSNSObPe2jkhg0T3Zg12bPC0ITL"
                    alt="Ultra-realistic luxury barbershop interior with black marble"
                    className="w-full h-full object-cover filter contrast-125 saturate-50 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
