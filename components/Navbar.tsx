"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admission-query" },
    { name: "Activities", href: "/activities" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg py-1.5" 
        : "bg-transparent py-3"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isScrolled ? "bg-navy-900" : "bg-white/10 backdrop-blur-sm border border-white/20"
            }`}>
              <span className={`text-sm font-bold ${isScrolled ? "text-gold-400" : "text-white"}`}>A</span>
            </div>
            <div>
              <div className={`text-sm font-bold leading-tight ${isScrolled ? "text-navy-900" : "text-white"}`}>
                Agrasen
              </div>
              <div className={`text-[7px] tracking-[0.15em] font-medium uppercase ${isScrolled ? "text-gray-400" : "text-white/50"}`}>
                Public School
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`px-3 py-1.5 text-sm font-medium transition-all relative group rounded-full ${
                  isScrolled 
                    ? "text-gray-600 hover:text-navy-900" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gold-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full ${
                  isScrolled ? "bg-gold-500" : "bg-gold-400"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Apply Now Button */}
          <div className="hidden xl:flex items-center gap-2">
            <button className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all transform hover:scale-105 ${
              isScrolled 
                ? "bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white shadow-lg shadow-gold-500/25" 
                : "bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30"
            }`}>
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`xl:hidden p-1.5 rounded-full transition-colors ${
              isScrolled ? "text-navy-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="block text-gray-700 hover:text-navy-900 font-medium py-2.5 px-3 hover:bg-gold-50 rounded-lg transition-all text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm mt-2 transition-all hover:shadow-lg">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;