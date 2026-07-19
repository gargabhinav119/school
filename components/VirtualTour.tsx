"use client";
import { motion } from "framer-motion";
import { Play, MapPin, ArrowRight, Sparkles } from "lucide-react";

const VirtualTour = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-premium relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-400 font-semibold text-sm tracking-[0.2em] uppercase">Virtual Tour</span>
            <h2 className="heading-premium text-white mt-2">
              Explore APS in
              <br />
              <span className="gradient-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                360°
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mt-4 mb-8">
              Take a virtual walk through our campus. Explore our classrooms, 
              labs, sports facilities and more from the comfort of your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 flex items-center gap-2">
                <Play size={18} className="fill-white" />
                Take Virtual Tour
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">Interactive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">360° View</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">HD Quality</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-3xl">
              <img
                src="/images/360-tour-preview.jpg"
                alt="Virtual Tour Preview"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/50 to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold-500 rounded-full animate-ping opacity-50"></div>
                  <div className="relative w-24 h-24 bg-gold-500/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-2xl shadow-gold-500/50">
                    <Play size={36} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                  <span className="text-white text-sm flex items-center gap-2">
                    <MapPin size={16} className="text-gold-400" />
                    Explore Campus
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                  <span className="text-white text-sm flex items-center gap-2">
                    <Sparkles size={16} className="text-gold-400" />
                    360° Interactive
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;