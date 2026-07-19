"use client";
import { Phone, Mail, MapPin, Instagram, Youtube, Twitter } from "lucide-react";

const TopBar = () => {
  return (
    <div className="hidden lg:block bg-navy-950 text-gray-400 border-b border-navy-800/50">
      <div className="container-premium">
        <div className="flex justify-between items-center h-9 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 hover:text-gold-400 transition-colors cursor-pointer">
              <Phone size={12} className="text-gold-400" /> +91 98765 43210
            </div>
            <span className="text-navy-700">|</span>
            <div className="flex items-center gap-1.5 hover:text-gold-400 transition-colors cursor-pointer">
              <Mail size={12} className="text-gold-400" /> info@agrasen.edu.in
            </div>
            <span className="text-navy-700">|</span>
            <div className="flex items-center gap-1.5 hover:text-gold-400 transition-colors cursor-pointer">
              <MapPin size={12} className="text-gold-400" /> Noida Extension
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-gold-400 transition-colors"><Instagram size={13} /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Youtube size={13} /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Twitter size={13} /></a>
            <span className="text-navy-700">|</span>
            <button className="bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-white px-4 py-0.5 rounded-full text-[10px] font-semibold transition-all border border-gold-500/20 hover:border-gold-500/50">
              ERP Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;