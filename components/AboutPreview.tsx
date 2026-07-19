"use client";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-premium">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-gold-500 font-semibold text-xs tracking-[0.2em] uppercase">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-1 mb-3">
              Welcome to <br />
              <span className="gradient-gold bg-clip-text text-transparent">Agrasen Public School</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Established in <span className="text-navy-900 font-semibold">2011</span>, we are committed to 
              academic excellence, innovation and holistic development.
            </p>
            <button className="text-gold-500 font-semibold hover:text-gold-600 transition-all flex items-center gap-1 text-sm">
              Know More <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/school-building.jpg"
              alt="School"
              className="w-full h-[280px] object-cover hover:scale-105 transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <span className="text-navy-900 font-bold">Since 2011</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;