"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, Mail, Calendar, Award, LogOut, Shield, Edit, Loader2 } from "lucide-react";
import { useAdmin } from "@/app/context/AdminContext";

const TopNavbar = () => {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setSettings(res.data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Academics", href: "/academics" },
    { name: "Result", href: "/result" },
    { name: "Circulars", href: "/circulars" },
    // { name: "Admission Query", href: "/admission-query" },
    { name: "Activities", href: "/activities" },
    { name: "Mandatory Disclosure", href: "/mandatory-disclosure" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ===== LAYER 1: TOP STRIP - WHITE WITH INFO ===== */}
      <div className={`transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-sm py-1" : "bg-white py-1.5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ===== LEFT - LOGO + CBSE + Since ===== */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-lg group-hover:shadow-[#D4AF37]/30 transition-all duration-300 overflow-hidden border border-gray-100">
                  <img 
                    src="/images/logo.png" 
                    alt="Agrasen Public School Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B2447] tracking-tight">AGRASEN</div>
                  <div className="text-[7px] tracking-[0.15em] font-medium uppercase text-gray-400 -mt-0.5">
                    Public School
                  </div>
                </div>
              </Link>

              <div className="h-8 w-px bg-gray-200"></div>

              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                  <Award size={12} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-semibold text-[#0B2447]">CBSE Affiliated</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <Calendar size={12} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-semibold text-[#0B2447]">Since 2011</span>
                </div>
              </div>
            </div>

            {/* ===== RIGHT - Dynamic Contact Info + Admin + Apply ===== */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {/* ✅ Admission Text - Show loading state */}
                <div className="flex items-center gap-1.5 bg-[#D4AF37]/5 px-3 py-1 rounded-full border border-[#D4AF37]/10">
                  <Calendar size={12} className="text-[#D4AF37]" />
                  {isLoading ? (
                    <span className="font-medium text-[#0B2447] flex items-center gap-1">
                      <Loader2 size={10} className="animate-spin" /> Loading...
                    </span>
                  ) : (
                    <span className="font-medium text-[#0B2447]">
                      {settings?.admissionText || 'Admissions Open 2027-28'}
                    </span>
                  )}
                </div>

                {/* ✅ Phone - Show loading state */}
                {isLoading ? (
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-[#D4AF37]" />
                    <span className="font-medium text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer">
                    <Phone size={12} className="text-[#D4AF37]" />
                    <span className="font-medium">{settings?.phone || '+91 98765 43210'}</span>
                  </div>
                )}

                {/* ✅ Email - Show loading state */}
                {isLoading ? (
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="text-[#D4AF37]" />
                    <span className="font-medium text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer">
                    <Mail size={12} className="text-[#D4AF37]" />
                    <span className="font-medium">{settings?.email || 'info@agrasen.edu.in'}</span>
                  </div>
                )}
              </div>

              {/* ===== ADMIN BUTTONS ===== */}
              {!isAdmin ? (
                <button
                  onClick={() => router.push("/admin/login")}
                  className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <Shield size={14} /> Admin
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/edit/settings"
                    className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center gap-1 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20"
                  >
                    <Edit size={12} /> Settings
                  </Link>
                  <Link
                    href="/admin/edit/home"
                    className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center gap-1 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20"
                  >
                    <Edit size={12} /> Home
                  </Link>
                  <Link
                    href="/admin/edit/about"
                    className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center gap-1 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20"
                  >
                    <Edit size={12} /> About
                  </Link>
                  <Link
                    href="/admin/edit/notices"
                    className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center gap-1 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20"
                  >
                    <Edit size={12} /> Notices
                  </Link>
                  <Link
                    href="/admin/edit/achievements"
                    className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center gap-1 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20"
                  >
                    <Edit size={12} /> Achievements
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}

              <button className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 hover:from-[#D4AF37]/90 hover:to-[#D4AF37]/70 text-[#0B2447] px-5 py-1.5 rounded-full text-xs font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/25">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-1.5 rounded-full transition-colors text-[#0B2447] hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== LAYER 2: NAVIGATION STRIP ===== */}
      <div className="bg-gradient-to-r from-[#0B2447] via-[#0B2447] to-[#19376D] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-center gap-0.5 py-1.5">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white transition-all relative group rounded-full hover:bg-white/5"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100/50 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col gap-1.5 pb-2 border-b border-gray-100/50 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-[#D4AF37]" /> 
                {isLoading ? 'Loading...' : (settings?.phone || '+91 98765 43210')}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-[#D4AF37]" /> 
                {isLoading ? 'Loading...' : (settings?.email || 'info@agrasen.edu.in')}
              </div>
            </div>

            {!isAdmin ? (
              <button
                onClick={() => { router.push("/admin/login"); setIsMobileMenuOpen(false); }}
                className="w-full text-left text-gray-700 hover:text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
              >
                <Shield size={16} /> Admin Login
              </button>
            ) : (
              <>
                <Link
                  href="/admin/edit/settings"
                  className="w-full text-left text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Edit size={16} /> Edit Settings
                </Link>
                <Link
                  href="/admin/edit/home"
                  className="w-full text-left text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Edit size={16} /> Edit Home
                </Link>
                <Link
                  href="/admin/edit/about"
                  className="w-full text-left text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Edit size={16} /> Edit About
                </Link>
                <Link
                  href="/admin/edit/notices"
                  className="w-full text-left text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Edit size={16} /> Edit Notices
                </Link>
                <Link
                  href="/admin/edit/achievements"
                  className="w-full text-left text-[#D4AF37] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Edit size={16} /> Edit Achievements
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-red-500 font-medium py-2.5 px-3 hover:bg-red-50 rounded-lg transition-all text-sm flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}

            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="block text-gray-700 hover:text-[#0B2447] font-medium py-2.5 px-3 hover:bg-[#D4AF37]/10 rounded-lg transition-all text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100/50 mt-1">
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 text-[#0B2447] px-5 py-2.5 rounded-full font-semibold text-sm w-full transition-all hover:shadow-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;