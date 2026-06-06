"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  t: (key: string) => string;
  toggleLanguage: () => void;
  isTransitioning: boolean;
}

const translations = {
  en: {
    logo: "The Elite Lounge",
    brand: "The Elite Lounge",
    nav_ritual: "The Ritual",
    nav_appointments: "Appointments",
    heading_main: "Secure a Moment",
    heading_main_mobile: "Secure a Moment",
    subheading: "Reserve your private session. Expect nothing less than absolute precision and tailored refinement.",
    label_service: "Service",
    option_service_default: "Select an experience...",
    option_service_1: "The Signature Ritual",
    option_service_2: "Precision Sculpting",
    option_service_3: "Hot Towel Shave",
    label_specialist: "Specialist",
    option_specialist_default: "Select an artisan...",
    option_specialist_1: "Alexander",
    option_specialist_2: "Julian",
    option_specialist_3: "Any Available",
    label_date: "Date",
    label_time: "Time",
    label_client_details: "Client Details",
    placeholder_name: "Full Name",
    placeholder_email: "Email Address",
    placeholder_phone: "Phone Number",
    btn_confirm: "Confirm Reservation",
    notice_cancellation: "Cancellations require 24 hours notice to maintain standing.",
    footer_services: "Services",
    footer_heritage: "Heritage",
    footer_philosophy: "Philosophy",
    footer_instagram: "Instagram",
    footer_journal: "Journal",
    footer_copyright: "© 2024 The Elite Lounge. All rights reserved.",
    hero_subtitle: "A Sanctuary for the Discerning",
    hero_title: "The Ritual of <br> <i class='text-primary/90 font-serif italic'>Refinement</i>",
    hero_desc: "An exploration of masculinity, craft, and the quiet luxury of meticulous grooming. Enter a space where time slows, and perfection is the only standard.",
    hero_btn: "Reserve Your Session",
    craft_chapter: "Chapter I",
    craft_title: "The <br>Craft",
    craft_desc: "Precision is not an act, but a habit. Our master artisans wield their tools with a reverence for tradition, blending classic techniques with contemporary sensibilities to sculpt a visage that commands the room.",
    craft_link: "Discover Our Process",
    repertoire_title: "The Repertoire",
    repertoire_subtitle: "Curated Services",
    service1_title: "Bespoke Shear",
    service1_desc: "A tailored structural cut designed to complement bone structure and lifestyle, finished with a hot lather neck shave.",
    service1_time: "60 Min",
    service1_price: "$150",
    service2_title: "The Executive Shave",
    service2_desc: "A multi-step traditional straight razor shave incorporating hot towels, essential oils, and a cold stone finish.",
    service2_time: "45 Min",
    service2_price: "$120",
    service3_title: "Restorative Facial",
    service3_desc: "Deep cleansing and hydration therapy specifically formulated for men's skin to combat environmental stress.",
    service3_time: "60 Min",
    service3_price: "$180",
    sanctuary_chapter: "Chapter II",
    sanctuary_title: "The <br>Sanctuary",
    sanctuary_desc: "Leave the clamor of the city behind. The Elite Lounge is designed as a minimalist refuge, swathed in shadows and illuminated by intent. Here, every detail—from the weight of the shears to the aroma of sandalwood—is curated for your absolute repose.",
    footer_logo: "TEL"
  },
  ar: {
    logo: "صالة النخبة",
    brand: "ذا إيليت لاونج",
    nav_ritual: "الطقوس",
    nav_appointments: "المواعيد",
    heading_main: "احجز لحظتك",
    heading_main_mobile: "احجز لحظتك",
    subheading: "احجز جلستك الخاصة. لا تتوقع سوى الدقة المطلقة والرقي المصمم خصيصًا.",
    label_service: "الخدمة",
    option_service_default: "اختر تجربة...",
    option_service_1: "الطقوس المميزة",
    option_service_2: "النحت الدقيق",
    option_service_3: "حلاقة المنشفة الساخنة",
    label_specialist: "الأخصائي",
    option_specialist_default: "اختر حِرفيًا...",
    option_specialist_1: "ألكسندر",
    option_specialist_2: "جوليان",
    option_specialist_3: "أي شخص متاح",
    label_date: "التاريخ",
    label_time: "الوقت",
    label_client_details: "تفاصيل العميل",
    placeholder_name: "الاسم الكامل",
    placeholder_email: "البريد الإلكتروني",
    placeholder_phone: "رقم الهاتف",
    btn_confirm: "تأكيد الحجز",
    notice_cancellation: "تتطلب الإلغاءات إشعارًا قبل 24 ساعة للحفاظ على وضعك.",
    footer_services: "الخدمات",
    footer_heritage: "التراث",
    footer_philosophy: "الفلسفة",
    footer_instagram: "إنستغرام",
    footer_journal: "الصحيفة",
    footer_copyright: "© 2024 ذا إيليت لاونج. جميع الحقوق محفوظة.",
    hero_subtitle: "ملاذ لأصحاب الذوق الرفيع",
    hero_title: "طقوس <br> <i class='text-primary/90 font-serif italic'>الأناقة</i>",
    hero_desc: "استكشاف للرجولة، الحرفة، والفخامة الهادئة للعناية الدقيقة. ادخل إلى مساحة يتباطأ فيها الزمن، والكمال هو المعيار الوحيد.",
    hero_btn: "احجز جلستك",
    craft_chapter: "الفصل الأول",
    craft_title: "الحرفة",
    craft_desc: "الدقة ليست فعلاً، بل عادة. يستخدم حرفيونا أدواتهم باحترام للتقاليد، ويمزجون بين التقنيات الكلاسيكية والحساسيات المعاصرة لنحت وجه يفرض حضوره في أي مكان.",
    craft_link: "اكتشف عمليتنا",
    repertoire_title: "الخدمات",
    repertoire_subtitle: "خدمات منتقاة",
    service1_title: "قصة مخصصة",
    service1_desc: "قصة هيكلية مصممة لتناسب بنية العظام وأسلوب الحياة، منتهية بحلاقة الرقبة بالرغوة الساخنة.",
    service1_time: "60 دقيقة",
    service1_price: "$150",
    service2_title: "الحلاقة التنفيذية",
    service2_desc: "حلاقة تقليدية متعددة الخطوات بالشفرة المستقيمة تتضمن مناشف ساخنة، زيوت عطرية، ولمسة نهائية بالحجر البارد.",
    service2_time: "45 دقيقة",
    service2_price: "$120",
    service3_title: "عناية مجددة للوجه",
    service3_desc: "علاج عميق للتنظيف والترطيب مركب خصيصًا لبشرة الرجال لمكافحة الإجهاد البيئي.",
    service3_time: "60 دقيقة",
    service3_price: "$180",
    sanctuary_chapter: "الفصل الثاني",
    sanctuary_title: "الملاذ",
    sanctuary_desc: "اترك صخب المدينة وراءك. صُمم ذا إيليت لاونج كملاذ بسيط، مغلف بالظلال ومضاء بقصد. هنا، كل تفصيل - من وزن المقصات إلى رائحة خشب الصندل - منسق لراحتك المطلقة.",
    footer_logo: "TEL"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Synchronize language and layout direction when state changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const toggleLanguage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const nextLang = language === "en" ? "ar" : "en";
      setLanguage(nextLang);
      setDirection(nextLang === "ar" ? "rtl" : "ltr");
      setIsTransitioning(false);
    }, 400); // Animation transition speed (matches CSS lang-transition)
  };

  const t = (key: string): string => {
    const dict = translations[language];
    return dict[key as keyof typeof dict] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, t, toggleLanguage, isTransitioning }}>
      <div className={isTransitioning ? "lang-transition" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
