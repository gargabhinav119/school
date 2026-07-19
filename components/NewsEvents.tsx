"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Award,
  Users,
  Music,
  Trophy,
  GraduationCap,
  BookOpen
} from "lucide-react";

const NewsEvents = () => {
  const [current, setCurrent] = useState(0);

  const events = [
    { 
      icon: Calendar, 
      title: "Admissions Open 2027-28", 
      date: "15 Mar 2026",
      color: "from-gold-400 to-gold-500"
    },
    { 
      icon: Award, 
      title: "CBSE Board Results Announced", 
      date: "25 May 2026",
      color: "from-blue-400 to-blue-500"
    },
    { 
      icon: Users, 
      title: "Olympiad Registration Started", 
      date: "10 Apr 2026",
      color: "from-purple-400 to-purple-500"
    },
    { 
      icon: Music, 
      title: "Annual Day Celebration", 
      date: "20 Dec 2026",
      color: "from-pink-400 to-pink-500"
    },
    { 
      icon: Trophy, 
      title: "Sports Meet 2027", 
      date: "15 Jan 2027",
      color: "from-emerald-400 to-emerald-500"
    },
    { 
      icon: GraduationCap, 
      title: "Summer Camp Registration", 
      date: "01 May 2026",
      color: "from-orange-400 to-orange-500"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % events.length);
  const prev = () => setCurrent((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Latest Updates</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            News & Events
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            Stay updated with the latest happenings at APS
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-gray-100/50"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${events[current].color} flex items-center justify-center shadow-lg`}>
                  {(() => {
                    const Icon = events[current].icon;
                    return <Icon size={32} className="text-white" />;
                  })()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">{events[current].title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm">{events[current].date}</span>
                  </div>
                </div>
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40">
                  Read More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-premium rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
          >
            <ChevronLeft size={20} className="text-navy-900" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-premium rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
          >
            <ChevronRight size={20} className="text-navy-900" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'w-8 bg-gold-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;