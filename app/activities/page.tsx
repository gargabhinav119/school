"use client";
import { useState, useEffect, useRef } from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import FloatingButtons from "../../components/FloatingButtons";
import { useAdmin } from "../context/AdminContext";
import Link from "next/link";
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";

export default function Activities() {
  const { isAdmin } = useAdmin();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(res => {
        if (res.success) setActivities(res.data);
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
        
        {/* Hero Section */}
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
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Activities</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              Beyond <span className="text-[#D4AF37]">Academics</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              Nurturing talents through diverse co-curricular activities
            </p>
          </div>
        </section>

        {/* Edit Button */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          {isAdmin && (
            <div className="flex justify-end">
              <Link
                href="/admin/edit/activities"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <Edit size={16} /> Edit Activities
              </Link>
            </div>
          )}
        </div>

        {/* Activities Cards */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="space-y-8">
            {activities.map((activity, index) => (
              <ActivityCard 
                key={activity._id} 
                activity={activity} 
                index={index} 
              />
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No activities added yet.</p>
              <p className="text-sm mt-2">Admin can add activities from the edit page.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// ACTIVITY CARD - With Image Slider
// ============================================================
function ActivityCard({ activity, index }: { activity: any; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const images = activity.images || [];
  const isEven = index % 2 === 0;

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Auto slide
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [images.length, isHovering]);

  if (images.length === 0) return null;

  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`md:flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        
        {/* ===== IMAGE SIDE - With Slider ===== */}
        <div className="md:w-1/2 relative h-[260px] md:h-[300px] overflow-hidden bg-[#0B2447]">
          {/* Images Slider */}
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((img: string, i: number) => (
              <div key={i} className="min-w-full h-full relative">
                <img 
                  src={img} 
                  alt={activity.imageAlt || activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === i ? 'w-4 bg-[#D4AF37]' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-all z-10 hover:scale-110"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-all z-10 hover:scale-110"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Image Count Badge */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[10px] font-medium z-10">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Activity Tag */}
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0B2447] px-3 py-1 rounded-full text-[10px] font-semibold shadow-lg z-10">
            #{index + 1}
          </div>
        </div>

        {/* ===== CONTENT SIDE ===== */}
        <div className={`md:w-1/2 p-6 md:p-8 flex flex-col justify-center ${
          isEven ? 'md:pl-8' : 'md:pr-8'
        }`}>
          {/* Title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#D4AF37] text-xl">{activity.icon || '🎯'}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#0B2447]">
              {activity.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {activity.description}
          </p>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activity.tags.map((tag: string, i: number) => (
                <span key={i} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}