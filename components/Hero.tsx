"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";

interface HeroProps {
  data?: any;
}

const Hero = ({ data }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroData = data || {
    schoolName: 'AGRASEN',
    schoolSubName: 'Public School',
    tagline: 'Creativity • Innovation • Patriotism',
    mainMessage: '"Nurturing Future Leaders Since 2011"',
    admissionText: 'Admissions Open for Session 2027-28',
    applyBtnText: 'Apply Now',
    visitBtnText: 'Book a Campus Visit',
    stats: [
      { value: '12+', label: 'Years of Excellence' },
      { value: '2500+', label: 'Students' },
      { value: '150+', label: 'Faculty Members' },
      { value: '100%', label: 'CBSE Affiliated' },
    ],
    videoUrl: '/videos/school.mp4',
    posterUrl: '/images/hero-poster.jpg',
    images: [
      { url: '/images/footer-school.jpg', caption: '🏫 Our Campus', alt: 'School Campus' },
      { url: '/images/footer-classroom.jpg', caption: '📚 Smart Class', alt: 'Smart Classroom' },
      { url: '/images/footer-sports.jpg', caption: '⚽ Sports', alt: 'Sports' },
      { url: '/images/footer-lab.jpg', caption: '🔬 Labs', alt: 'Labs' },
      { url: '/images/footer-library.jpg', caption: '📖 Library', alt: 'Library' },
    ],
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={heroData.posterUrl}
      >
        <source src={heroData.videoUrl} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      {/* Content - Left Aligned + Right Images */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* ===== LEFT SIDE - TEXT ===== */}
            <div>
              {/* School Name */}
              <div className="mb-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] text-white/80">
                  {heroData.schoolName}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="w-12 h-px bg-gold-400/50"></span>
                  <span className="text-xs tracking-[0.4em] text-gold-400 font-medium uppercase">
                    {heroData.schoolSubName}
                  </span>
                  <span className="w-12 h-px bg-gold-400/50"></span>
                </div>
              </div>

              {/* Tagline */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-light tracking-[0.15em] text-white/60 mt-3">
                {heroData.tagline.split('•').map((item: string, i: number) => (
                  <span key={i}>
                    {item.trim()}
                    {i < 2 && <span className="text-gold-400/40 ml-2">•</span>}
                  </span>
                ))}
              </div>

              {/* Main Message */}
              <p className="text-xl md:text-2xl font-light text-white/90 mt-2 tracking-wide">
                {heroData.mainMessage}
              </p>

              {/* Admission Badge */}
              <div className="inline-flex items-center gap-2 bg-gold-500/15 backdrop-blur-sm border border-gold-500/30 rounded-full px-4 py-1.5 mt-4">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse"></span>
                <span className="text-gold-300 text-xs font-medium tracking-[0.15em] uppercase">
                  {heroData.admissionText}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="group bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-gold-500/30 flex items-center gap-2">
                  {heroData.applyBtnText}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/20 flex items-center gap-2">
                  <Calendar size={16} />
                  {heroData.visitBtnText}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {heroData.stats.map((stat: any, index: number) => (
                  <div key={index}>
                    <div className="text-xl font-bold text-gold-400">{stat.value}</div>
                    <div className="text-[9px] text-white/40 font-medium tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RIGHT SIDE - IMAGES ===== */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {heroData.images.map((img: any, index: number) => {
                const isFirst = index === 0;
                return (
                  <div
                    key={index}
                    className={`${isFirst ? 'col-span-2 h-44' : 'h-32'} rounded-2xl overflow-hidden relative group`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className={`absolute ${isFirst ? 'bottom-3 left-3 right-3' : 'bottom-2 left-2 right-2'}`}>
                      <span className={`${isFirst ? 'text-xs' : 'text-[10px]'} text-white/90 font-medium`}>
                        {img.caption}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;