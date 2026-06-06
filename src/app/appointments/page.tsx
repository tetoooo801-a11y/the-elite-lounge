"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { KineticText } from "@/components/KineticText";
import { supabase } from "@/utils/supabaseClient";

export default function Appointments() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const [formData, setFormData] = useState({
    service: "",
    specialist: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2; // Max rotation 2deg
    const rotateY = ((x - centerX) / centerX) * 2;

    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    });
  };

  const handleCardMouseLeave = () => {
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    });
    // Reset transition after animations complete
    setTimeout(() => {
      setCardStyle({});
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          specialist: formData.specialist,
          booking_date: formData.date,
          booking_time: formData.time,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({
        service: "",
        specialist: "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
      });
    } catch (err: any) {
      console.error("Error creating booking:", err);
      setSubmitStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow relative flex items-center justify-center min-h-screen pt-[120px] pb-section-padding-desktop">
        {/* Cinematic Parallax Background */}
        <ParallaxBackground
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Z_z8DfqRBpa3hwhzBtbHSOKNivVHDx6XeUe1pbOj1hg4tbKNuSO02UR22gvgeRGqdA97QGYnT4gzs34T4tNJTWUl_aYC4kqBujpqM3t8uXeaQKCVfxrxHgd06clPN4wQduyY-Y_-LJgEwCT5bM4JdgigcOct25wf0FQBI9genp4ZInAKE9qfvZHrejitY_zGmiRkmjj9JKNV5UP728UrDYVhTM7TQWIgKxQSa19q6MzVAp5paghADwseh0cI0pwjDVNY55igHEbv"
          alt="Cinematic Motion Background"
          overlayClass="bg-black/50"
        />

        {/* Glassmorphic Booking Card Content */}
        <div className="relative z-30 w-full max-w-2xl px-margin-safe md:px-0 mt-section-padding-mobile md:mt-0">
          <div className="text-center mb-unit-xl">
            <RevealOnScroll delayClass="delay-100" className="flex flex-col items-center">
              <h1 className="font-display text-display-lg-mobile md:text-display text-on-surface tracking-tighter group mb-unit-sm">
                <KineticText isArabic={isAr}>{t("heading_main")}</KineticText>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit-sm max-w-md mx-auto opacity-80">
                {t("subheading")}
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delayClass="delay-200">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="glass-panel shimmer p-unit-lg md:p-[64px] rounded-none transition-transform duration-700 ease-[0.16,1,0.3,1]"
              style={cardStyle}
            >
              {submitStatus === "success" ? (
                <div className="text-center py-unit-md flex flex-col items-center gap-unit-md animate-fade-in-up">
                  <span className="material-symbols-outlined text-[64px] text-primary">check_circle</span>
                  <h2 className="font-display text-display-md text-on-surface">
                    {isAr ? "تم تأكيد حجزك!" : "Reservation Secured"}
                  </h2>
                  <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
                    {isAr 
                      ? "لقد تلقينا طلبك وسنتواصل معك قريبًا لتأكيد جلستك." 
                      : "Your session request has been received. We will contact you shortly to confirm your booking details."}
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="btn-luxury mt-unit-lg px-unit-lg py-unit-sm font-label-caps text-label-caps text-on-surface uppercase tracking-widest cursor-pointer"
                  >
                    {isAr ? "حجز جلسة أخرى" : "Book Another Session"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-unit-lg text-start ltr:text-left rtl:text-right">
                {/* Selectors row */}
                <div className="flex flex-col md:flex-row gap-unit-lg">
                  <div className="flex-1 flex flex-col gap-unit-xs group">
                    <label className="font-label-caps text-label-caps text-primary tracking-widest opacity-80 uppercase transition-opacity duration-300 group-focus-within:opacity-100">
                      {t("label_service")}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="input-luxury w-full font-body-md text-body-md bg-transparent appearance-none rounded-none focus:ring-0 cursor-pointer text-start ltr:text-left rtl:text-right"
                    >
                      <option className="bg-surface-container text-on-surface" value="" disabled>
                        {t("option_service_default")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="ritual">
                        {t("option_service_1")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="sculpt">
                        {t("option_service_2")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="shave">
                        {t("option_service_3")}
                      </option>
                    </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-unit-xs group">
                    <label className="font-label-caps text-label-caps text-primary tracking-widest opacity-80 uppercase transition-opacity duration-300 group-focus-within:opacity-100">
                      {t("label_specialist")}
                    </label>
                    <select
                      value={formData.specialist}
                      onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                      required
                      className="input-luxury w-full font-body-md text-body-md bg-transparent appearance-none rounded-none focus:ring-0 cursor-pointer text-start ltr:text-left rtl:text-right"
                    >
                      <option className="bg-surface-container text-on-surface" value="" disabled>
                        {t("option_specialist_default")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="alexander">
                        {t("option_specialist_1")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="julian">
                        {t("option_specialist_2")}
                      </option>
                      <option className="bg-surface-container text-on-surface" value="any">
                        {t("option_specialist_3")}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Date & Time row */}
                <div className="flex flex-col md:flex-row gap-unit-lg">
                  <div className="flex-1 flex flex-col gap-unit-xs group">
                    <label className="font-label-caps text-label-caps text-primary tracking-widest opacity-80 uppercase transition-opacity duration-300 group-focus-within:opacity-100">
                      {t("label_date")}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="input-luxury w-full font-body-md text-body-md bg-transparent rounded-none focus:ring-0 cursor-pointer text-start ltr:text-left rtl:text-right"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-unit-xs group">
                    <label className="font-label-caps text-label-caps text-primary tracking-widest opacity-80 uppercase transition-opacity duration-300 group-focus-within:opacity-100">
                      {t("label_time")}
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="input-luxury w-full font-body-md text-body-md bg-transparent rounded-none focus:ring-0 cursor-pointer text-start ltr:text-left rtl:text-right"
                    />
                  </div>
                </div>

                {/* Personal Details fields */}
                <div className="flex flex-col gap-unit-xs mt-unit-md group">
                  <label className="font-label-caps text-label-caps text-primary tracking-widest opacity-80 uppercase transition-opacity duration-300 group-focus-within:opacity-100">
                    {t("label_client_details")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("placeholder_name")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-luxury w-full font-body-md text-body-md mt-2 text-start ltr:text-left rtl:text-right"
                  />
                  <input
                    type="email"
                    placeholder={t("placeholder_email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="input-luxury w-full font-body-md text-body-md mt-unit-md text-start ltr:text-left rtl:text-right"
                  />
                  <input
                    type="tel"
                    placeholder={t("placeholder_phone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="input-luxury w-full font-body-md text-body-md mt-unit-md text-start ltr:text-left rtl:text-right"
                  />
                </div>

                  {/* Confirm Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-luxury mt-unit-xl w-full py-unit-md font-label-caps text-label-caps text-on-surface uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="relative z-10">{submitting ? (isAr ? "جاري الحفظ..." : "Securing Session...") : t("btn_confirm")}</span>
                    {!submitting && (
                      <span className="material-symbols-outlined text-[18px] relative z-10" data-icon="arrow_forward">
                        arrow_forward
                      </span>
                    )}
                  </button>

                  {submitStatus === "error" && (
                    <div className="mt-unit-md p-unit-sm border border-red-500/20 bg-red-500/5 text-center text-red-400 font-body-sm rounded-none">
                      {isAr ? "عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى." : errorMessage}
                    </div>
                  )}
                </form>
              )}
            </div>
          </RevealOnScroll>

          {/* Cancellation Notice */}
          <div className="mt-unit-xl text-center">
            <RevealOnScroll delayClass="delay-300">
              <p className="font-label-caps text-label-caps text-on-surface-variant/50">
                {t("notice_cancellation")}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
