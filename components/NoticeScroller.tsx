"use client";
import { useState, useEffect } from "react";
import { ChevronRight, Bell } from "lucide-react";

interface NoticeScrollerProps {
  notices?: any[];
}

const NoticeScroller = ({ notices = [] }: NoticeScrollerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [notices.length]);

  // ✅ Agar notices empty hain to kuch dikhao
  if (!notices || notices.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[#0B2447] via-[#19376D] to-[#0B2447] py-3 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-white/30 text-sm">No notices available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2447] via-[#19376D] to-[#0B2447] py-3 border-y border-white/5 shadow-lg shadow-black/20">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0 bg-[#D4AF37]/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
            <Bell size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-semibold text-[#D4AF37] tracking-[0.15em] uppercase whitespace-nowrap">
              Updates
            </span>
          </div>

          {/* Scroller */}
          <div className="flex-1 overflow-hidden relative">
            <div 
              className="flex transition-all duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {notices.map((notice, index) => (
                <div key={index} className="min-w-full flex items-center justify-center gap-3 px-4">
                  <span className="text-white/90 text-sm font-light tracking-wide text-center">
                    {notice.text}
                  </span>
                  {notice.link && notice.link !== '#' && (
                    <a 
                      href={notice.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:text-[#D4AF37]/80 text-xs font-medium flex items-center gap-1 transition-colors border-b border-[#D4AF37]/30 hover:border-[#D4AF37]"
                    >
                      Read More <ChevronRight size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5 flex-shrink-0">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-[#D4AF37] w-5' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeScroller;