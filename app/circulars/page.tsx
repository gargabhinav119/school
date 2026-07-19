"use client";
import { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useAdmin } from "@/app/context/AdminContext";
import Link from "next/link";
import { 
  Calendar, 
  Bell, 
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  CalendarDays,
  Gift,
  Bus,
  Music,
  Trophy,
  BookOpen,
  GraduationCap,
  Users,
  Sparkles,
  Award,
  Edit
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, any> = {
  Award, Gift, Users, GraduationCap, Sparkles, Trophy, 
  AlertCircle, Music, Bus, BookOpen, Bell
};

export default function Circulars() {
  const { isAdmin } = useAdmin();
  const [activeSection, setActiveSection] = useState("holidays");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "holidays", label: "List of Holidays", icon: Calendar },
    { id: "notices", label: "Notices", icon: Bell },
  ];

  useEffect(() => {
    fetch("/api/circulars")
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <TopNavbar />
        <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavbar />
      <main className="pt-16 md:pt-20 bg-gradient-to-b from-[#F8FAFC] to-white min-h-screen">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative bg-gradient-to-br from-[#0B2447] to-[#19376D] py-8 md:py-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 right-20 w-32 h-32 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xs font-semibold font-poppins tracking-[0.3em] uppercase">Circulars</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              School <span className="text-[#D4AF37]">Circulars</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              Official notifications, holidays and important announcements
            </p>
          </div>
        </section>

        {/* Navigation Pills */}
        <section className="bg-white/80 backdrop-blur-sm border-b border-[#F8FAFC] sticky top-[68px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto py-2 gap-1.5 scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#D4AF37] text-[#0B2447] shadow-lg shadow-[#D4AF37]/25"
                        : "text-gray-500 hover:text-[#0B2447] hover:bg-[#D4AF37]/10"
                    }`}
                  >
                    <Icon size={14} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/admin/edit/circulars"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit size={16} /> Edit Circulars
                </Link>
              </div>
            )}
            {activeSection === "holidays" && <HolidaysSection data={data} />}
            {activeSection === "notices" && <NoticesSection data={data} />}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// HOLIDAYS SECTION - Dynamic
// ============================================================
function HolidaysSection({ data }: { data: any }) {
  const title = data?.holidaysTitle || "List of Holidays";
  const description = data?.holidaysDescription || "Academic calendar with all scheduled holidays and important dates for the session 2027-28.";
  const stats = data?.holidaysStats || { total: "15+", months: "12" };
  const tags = data?.holidaysTags || ["🏛️ National Holidays", "🎉 Festivals", "📚 Academic Breaks"];
  const holidays = data?.holidays || [];

  const groupedHolidays = holidays.reduce((acc: any, holiday: any) => {
    if (!acc[holiday.month]) acc[holiday.month] = [];
    acc[holiday.month].push(holiday);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Circulars</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.total}</div>
              <div className="text-gray-500 text-[9px] font-medium">Holidays</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.months}</div>
              <div className="text-gray-500 text-[9px] font-medium">Months</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>

        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {Object.keys(groupedHolidays).map((_, index) => (
                <span key={index} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30"></span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {Object.entries(groupedHolidays).map(([month, monthHolidays]: [string, any]) => (
              <div key={month} className="flex-shrink-0 w-[200px] md:w-[220px] snap-start">
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all">
                  <div className="bg-gradient-to-r from-[#0B2447] to-[#19376D] px-3 py-2">
                    <h4 className="text-white font-bold text-xs flex items-center gap-1.5">
                      <CalendarDays size={12} className="text-[#D4AF37]" />
                      {month}
                    </h4>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {monthHolidays.map((holiday: any, idx: number) => {
                      const Icon = iconMap[holiday.icon] || Award;
                      return (
                        <div key={idx} className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg px-3 py-1.5 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${holiday.color || 'from-blue-400 to-blue-500'} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={11} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-semibold text-[#0B2447] truncate">{holiday.name}</p>
                            <p className="text-[7px] text-gray-400">{holiday.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1 mt-3">
            {Object.keys(groupedHolidays).map((_, index) => (
              <span key={index} className="w-1 h-1 rounded-full bg-[#D4AF37]/30"></span>
            ))}
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
            <span className="text-[8px] text-gray-300 ml-2">{Object.keys(groupedHolidays).length} Months</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// NOTICES SECTION - Dynamic
// ============================================================
function NoticesSection({ data }: { data: any }) {
  const title = data?.noticesTitle || "Official Notices";
  const description = data?.noticesDescription || "Stay updated with all official notifications, announcements, and important information from the school administration.";
  const stats = data?.noticesStats || { active: "6", updates: "New" };
  const tags = data?.noticesTags || ["🔔 Important", "🎪 Events", "📋 Updates"];
  const notices = data?.notices || [];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Circulars</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.active}</div>
              <div className="text-gray-500 text-[9px] font-medium">Active Notices</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.updates}</div>
              <div className="text-gray-500 text-[9px] font-medium">Updates</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>

        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {notices.map((_: any, index: number) => (
                <span key={index} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30"></span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {notices.map((notice: any, index: number) => {
              const Icon = iconMap[notice.icon] || Bell;
              return (
                <div key={index} className="flex-shrink-0 w-[200px] md:w-[220px] snap-start">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all">
                    <div className="bg-gradient-to-r from-[#0B2447] to-[#19376D] px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <span className="text-[#0B2447] font-bold text-[7px]">APS</span>
                        </div>
                        <span className="text-white text-[7px] font-medium">OFFICIAL</span>
                      </div>
                      <span className="text-[6px] text-[#D6D6D6]">{notice.date}</span>
                    </div>

                    <div className="p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={13} className="text-[#D4AF37]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-[#0B2447] line-clamp-1">{notice.title}</h4>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className={`text-[6px] font-medium px-1.5 py-0.5 rounded-full ${
                              notice.type === "Important" ? "bg-red-50 text-red-500" :
                              notice.type === "Event" ? "bg-green-50 text-green-500" :
                              notice.type === "Meeting" ? "bg-blue-50 text-blue-500" :
                              "bg-yellow-50 text-yellow-500"
                            }`}>
                              {notice.type}
                            </span>
                            <span className="text-[6px] text-gray-300">|</span>
                            <span className="text-[6px] text-gray-400 flex items-center gap-0.5">
                              <Clock size={7} /> Notice
                            </span>
                          </div>
                          <p className="text-[8px] text-gray-600 mt-1 leading-relaxed line-clamp-2">
                            {notice.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-dashed border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <Eye size={8} className="text-[#D4AF37]" />
                          </div>
                          <span className="text-[6px] text-gray-400">View</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <Download size={8} className="text-[#D4AF37]" />
                          </div>
                          <span className="text-[6px] text-gray-400">Download</span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <CheckCircle size={9} className="text-[#D4AF37]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-1 mt-3">
            {notices.map((_: any, index: number) => (
              <span key={index} className="w-1 h-1 rounded-full bg-[#D4AF37]/30"></span>
            ))}
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
            <span className="text-[8px] text-gray-300 ml-2">{notices.length} Notices</span>
          </div>
        </div>
      </div>
    </div>
  );
}