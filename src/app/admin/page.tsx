"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { supabase } from "@/utils/supabaseClient";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  service: string;
  specialist: string;
  booking_date: string;
  booking_time: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

const adminTranslations = {
  en: {
    admin_title: "Artisan Operations Panel",
    login_title: "Artisan Lounge Access",
    login_subtitle: "Enter credentials to manage reservations.",
    email_label: "Email Address",
    password_label: "Password",
    btn_login: "Access Dashboard",
    btn_logging_in: "Authorizing...",
    btn_signout: "Logout",
    stats_total: "Total Bookings",
    stats_pending: "Pending Approval",
    stats_confirmed: "Confirmed Sessions",
    stats_cancelled: "Cancelled Sessions",
    search_placeholder: "Search client name, email, or phone...",
    col_client: "Client Details",
    col_service: "Experience",
    col_specialist: "Artisan",
    col_date_time: "Date & Time",
    col_status: "Status",
    col_actions: "Actions",
    status_pending: "Pending",
    status_confirmed: "Confirmed",
    status_cancelled: "Cancelled",
    btn_confirm: "Confirm",
    btn_cancel: "Cancel",
    btn_delete: "Delete",
    no_bookings: "No reservations found.",
    loading_bookings: "Retrieving reservations...",
    error_auth: "Invalid email or password.",
    error_generic: "An error occurred. Please try again.",
    cancellation_confirm: "Are you sure you want to cancel this booking?",
    delete_confirm: "Are you sure you want to permanently delete this booking?",
    all_filters: "All",
  },
  ar: {
    admin_title: "بوابة عمليات الحرفيين",
    login_title: "دخول صالة الحرفيين",
    login_subtitle: "أدخل بيانات الاعتماد لإدارة الحجوزات.",
    email_label: "البريد الإلكتروني",
    password_label: "كلمة المرور",
    btn_login: "دخول لوحة التحكم",
    btn_logging_in: "جاري التحقق...",
    btn_signout: "تسجيل الخروج",
    stats_total: "إجمالي الحجوزات",
    stats_pending: "في انتظار الموافقة",
    stats_confirmed: "الجلسات المؤكدة",
    stats_cancelled: "الجلسات الملغاة",
    search_placeholder: "ابحث باسم العميل، البريد، أو الهاتف...",
    col_client: "تفاصيل العميل",
    col_service: "التجربة",
    col_specialist: "الحرفي",
    col_date_time: "التاريخ والوقت",
    col_status: "الحالة",
    col_actions: "الإجراءات",
    status_pending: "قيد الانتظار",
    status_confirmed: "مؤكد",
    status_cancelled: "ملغى",
    btn_confirm: "تأكيد",
    btn_cancel: "إلغاء",
    btn_delete: "حذف",
    no_bookings: "لم يتم العثور على حجوزات.",
    loading_bookings: "جاري جلب الحجوزات...",
    error_auth: "البريد الإلكتروني أو كلمة المرور غير صالحة.",
    error_generic: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    cancellation_confirm: "هل أنت متأكد أنك تريد إلغاء هذا الحجز؟",
    delete_confirm: "هل أنت متأكد أنك تريد حذف هذا الحجز نهائيًا؟",
    all_filters: "الكل",
  },
};

export default function AdminDashboard() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const admT = adminTranslations[language];

  // Auth State
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchBookings();
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchBookings();
      } else {
        setBookings([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(admT.error_auth);
      }
    } catch (err) {
      setAuthError(admT.error_generic);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("booking_date", { ascending: true })
        .order("booking_time", { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: "confirmed" | "cancelled") => {
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert(admT.error_generic);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!window.confirm(admT.delete_confirm)) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert(admT.error_generic);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter computations
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  // Humanize Service and Specialist labels
  const formatService = (service: string) => {
    switch (service) {
      case "ritual":
        return isAr ? "الطقوس المميزة" : "The Signature Ritual";
      case "sculpt":
        return isAr ? "النحت الدقيق" : "Precision Sculpting";
      case "shave":
        return isAr ? "حلاقة المنشفة الساخنة" : "Hot Towel Shave";
      default:
        return service;
    }
  };

  const formatSpecialist = (specialist: string) => {
    switch (specialist) {
      case "alexander":
        return isAr ? "ألكسندر" : "Alexander";
      case "julian":
        return isAr ? "جوليان" : "Julian";
      case "any":
        return isAr ? "أي شخص متاح" : "Any Available";
      default:
        return specialist;
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow relative flex flex-col justify-start min-h-screen pt-[120px] pb-section-padding-desktop">
        {/* Parallax Background */}
        <ParallaxBackground
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Z_z8DfqRBpa3hwhzBtbHSOKNivVHDx6XeUe1pbOj1hg4tbKNuSO02UR22gvgeRGqdA97QGYnT4gzs34T4tNJTWUl_aYC4kqBujpqM3t8uXeaQKCVfxrxHgd06clPN4wQduyY-Y_-LJgEwCT5bM4JdgigcOct25wf0FQBI9genp4ZInAKE9qfvZHrejitY_zGmiRkmjj9JKNV5UP728UrDYVhTM7TQWIgKxQSa19q6MzVAp5paghADwseh0cI0pwjDVNY55igHEbv"
          alt="Cinematic Background"
          overlayClass="bg-black/85"
        />

        <div className="relative z-30 w-full max-w-7xl mx-auto px-margin-safe mt-6">
          {!session ? (
            /* Login Screen */
            <div className="max-w-md mx-auto mt-20">
              <RevealOnScroll className="text-center mb-8">
                <h1 className="font-display text-display-sm text-on-surface mb-2">{admT.login_title}</h1>
                <p className="font-body-md text-on-surface-variant opacity-80">{admT.login_subtitle}</p>
              </RevealOnScroll>

              <RevealOnScroll delayClass="delay-100">
                <div className="glass-panel shimmer p-8 rounded-none">
                  <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1 group text-start ltr:text-left rtl:text-right">
                      <label className="font-label-caps text-label-caps text-primary tracking-widest uppercase opacity-80">
                        {admT.email_label}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-luxury w-full font-body-md text-body-md mt-2 text-start ltr:text-left rtl:text-right"
                      />
                    </div>

                    <div className="flex flex-col gap-1 group text-start ltr:text-left rtl:text-right">
                      <label className="font-label-caps text-label-caps text-primary tracking-widest uppercase opacity-80">
                        {admT.password_label}
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-luxury w-full font-body-md text-body-md mt-2 text-start ltr:text-left rtl:text-right"
                      />
                    </div>

                    {authError && (
                      <div className="text-red-400 font-body-sm text-sm text-center p-2 border border-red-500/20 bg-red-500/5">
                        {authError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="btn-luxury w-full py-3 font-label-caps text-label-caps text-on-surface uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      <span className="relative z-10">
                        {authLoading ? admT.btn_logging_in : admT.btn_login}
                      </span>
                    </button>
                  </form>
                </div>
              </RevealOnScroll>
            </div>
          ) : (
            /* Dashboard Screen */
            <div className="w-full flex flex-col gap-8">
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-6 text-start ltr:text-left rtl:text-right">
                <div>
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                    {admT.admin_title}
                  </span>
                  <h1 className="font-display text-display-sm text-on-surface mt-1">
                    {isAr ? "لوحة الحجوزات" : "Reservation Ledger"}
                  </h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-luxury px-6 py-2.5 font-label-caps text-label-caps text-on-surface uppercase tracking-widest cursor-pointer"
                >
                  <span className="relative z-10">{admT.btn_signout}</span>
                </button>
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: admT.stats_total, count: stats.total, color: "border-primary/30" },
                  { title: admT.stats_pending, count: stats.pending, color: "border-yellow-500/30 text-yellow-400" },
                  { title: admT.stats_confirmed, count: stats.confirmed, color: "border-green-500/30 text-green-400" },
                  { title: admT.stats_cancelled, count: stats.cancelled, color: "border-red-500/30 text-red-400" },
                ].map((s, idx) => (
                  <div key={idx} className={`glass-panel p-6 ${s.color} flex flex-col justify-between h-32`}>
                    <span className="font-label-caps text-label-caps text-on-surface-variant/70 tracking-wider">
                      {s.title}
                    </span>
                    <span className="font-display text-display-md text-on-surface self-end">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Filter Controls & Search */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                {/* Search Bar */}
                <div className="flex-grow md:max-w-md">
                  <input
                    type="text"
                    placeholder={admT.search_placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-luxury w-full font-body-md text-body-md text-start ltr:text-left rtl:text-right"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex overflow-x-auto gap-2 border-b border-outline-variant/10 md:border-none pb-2 md:pb-0">
                  {[
                    { key: "all", label: admT.all_filters },
                    { key: "pending", label: admT.status_pending },
                    { key: "confirmed", label: admT.status_confirmed },
                    { key: "cancelled", label: admT.status_cancelled },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setStatusFilter(tab.key)}
                      className={`px-4 py-2 font-label-caps text-label-caps uppercase tracking-wider transition-colors duration-300 border-b cursor-pointer ${
                        statusFilter === tab.key
                          ? "border-primary text-primary"
                          : "border-transparent text-on-surface-variant/60 hover:text-on-surface"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="glass-panel p-0 overflow-x-auto">
                {loadingBookings ? (
                  <div className="text-center py-20 text-on-surface-variant/60 font-body-md">
                    {admT.loading_bookings}
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-20 text-on-surface-variant/60 font-body-md">
                    {admT.no_bookings}
                  </div>
                ) : (
                  <table className="w-full text-start ltr:text-left rtl:text-right border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container/30">
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest">{admT.col_client}</th>
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest">{admT.col_service}</th>
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest">{admT.col_specialist}</th>
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest">{admT.col_date_time}</th>
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest">{admT.col_status}</th>
                        <th className="p-4 font-label-caps text-label-caps text-primary tracking-widest text-center">{admT.col_actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr
                          key={b.id}
                          className="border-b border-outline-variant/10 hover:bg-surface-container-low/20 transition-colors duration-300 font-body-md"
                        >
                          {/* Client details */}
                          <td className="p-4 text-start">
                            <div className="font-semibold text-on-surface">{b.customer_name}</div>
                            <div className="text-xs text-on-surface-variant/60 mt-1 flex flex-col gap-0.5">
                              <span>{b.email}</span>
                              <span className="ltr:text-left rtl:text-right" dir="ltr">{b.phone}</span>
                            </div>
                          </td>

                          {/* Service Experience */}
                          <td className="p-4 text-start text-on-surface/90">{formatService(b.service)}</td>

                          {/* Specialist */}
                          <td className="p-4 text-start text-on-surface-variant">{formatSpecialist(b.specialist)}</td>

                          {/* Date and Time */}
                          <td className="p-4 text-start">
                            <div className="text-on-surface">{b.booking_date}</div>
                            <div className="text-xs text-on-surface-variant/80 mt-1">{b.booking_time.slice(0, 5)}</div>
                          </td>

                          {/* Status */}
                          <td className="p-4 text-start">
                            <span
                              className={`px-3 py-1 font-label-caps text-[10px] tracking-wider uppercase inline-block border ${
                                b.status === "confirmed"
                                  ? "border-green-500/40 text-green-400 bg-green-500/5"
                                  : b.status === "cancelled"
                                  ? "border-red-500/40 text-red-400 bg-red-500/5"
                                  : "border-yellow-500/40 text-yellow-400 bg-yellow-500/5"
                              }`}
                            >
                              {b.status === "confirmed"
                                ? admT.status_confirmed
                                : b.status === "cancelled"
                                ? admT.status_cancelled
                                : admT.status_pending}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-4">
                            <div className="flex gap-2 justify-center items-center">
                              {b.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "confirmed")}
                                    disabled={actionLoading !== null}
                                    className="px-3 py-1 border border-green-500 text-green-400 text-xs font-label-caps uppercase tracking-wider hover:bg-green-500 hover:text-black transition-all cursor-pointer disabled:opacity-50"
                                  >
                                    {actionLoading === b.id ? "..." : admT.btn_confirm}
                                  </button>
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "cancelled")}
                                    disabled={actionLoading !== null}
                                    className="px-3 py-1 border border-red-500 text-red-400 text-xs font-label-caps uppercase tracking-wider hover:bg-red-500 hover:text-black transition-all cursor-pointer disabled:opacity-50"
                                  >
                                    {actionLoading === b.id ? "..." : admT.btn_cancel}
                                  </button>
                                </>
                              )}

                              {b.status === "confirmed" && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, "cancelled")}
                                  disabled={actionLoading !== null}
                                  className="px-3 py-1 border border-red-500/60 text-red-400/80 text-xs font-label-caps uppercase tracking-wider hover:bg-red-500 hover:text-black transition-all cursor-pointer disabled:opacity-50"
                                >
                                  {actionLoading === b.id ? "..." : admT.btn_cancel}
                                </button>
                              )}

                              {b.status === "cancelled" && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, "confirmed")}
                                  disabled={actionLoading !== null}
                                  className="px-3 py-1 border border-green-500/60 text-green-400/80 text-xs font-label-caps uppercase tracking-wider hover:bg-green-500 hover:text-black transition-all cursor-pointer disabled:opacity-50"
                                >
                                  {actionLoading === b.id ? "..." : admT.btn_confirm}
                                </button>
                              )}

                              <button
                                onClick={() => deleteBooking(b.id)}
                                disabled={actionLoading !== null}
                                className="p-1 text-on-surface-variant/40 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                                title={admT.btn_delete}
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
