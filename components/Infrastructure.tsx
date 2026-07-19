"use client";
import { motion } from "framer-motion";
import { 
  FlaskRound as Flask,
  Microscope,
  Dna,
  Monitor,
  Library,
  Theater,
  Dumbbell,
  Bus,
  Building2
} from "lucide-react";

const Infrastructure = () => {
  const facilities = [
    { icon: Flask, label: "Physics Lab", color: "from-blue-400 to-blue-500" },
    { icon: Microscope, label: "Chemistry Lab", color: "from-emerald-400 to-emerald-500" },
    { icon: Dna, label: "Biology Lab", color: "from-green-400 to-green-500" },
    { icon: Monitor, label: "Computer Lab", color: "from-cyan-400 to-cyan-500" },
    { icon: Library, label: "Library", color: "from-amber-400 to-amber-500" },
    { icon: Theater, label: "Auditorium", color: "from-purple-400 to-purple-500" },
    { icon: Dumbbell, label: "Sports Ground", color: "from-red-400 to-red-500" },
    { icon: Bus, label: "School Transport", color: "from-yellow-400 to-yellow-500" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Infrastructure</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            World-Class Facilities
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            State-of-the-art infrastructure for holistic learning
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-premium hover:shadow-3xl transition-all hover:-translate-y-2 border border-gray-100/50"
              >
                <div className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${facility.color} mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-sm md:text-base">
                    {facility.label}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/0 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;