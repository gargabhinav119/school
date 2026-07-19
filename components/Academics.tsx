"use client";
import { motion } from "framer-motion";
import { 
  Baby, 
  Users, 
  School, 
  GraduationCap,
  FlaskRound as Flask,
  Briefcase,
  Library
} from "lucide-react";

const Academics = () => {
  const levels = [
    { icon: Baby, label: "Pre Primary", color: "from-pink-400 to-pink-500", desc: "Nursery to KG" },
    { icon: Users, label: "Primary", color: "from-blue-400 to-blue-500", desc: "Class 1-5" },
    { icon: School, label: "Middle School", color: "from-emerald-400 to-emerald-500", desc: "Class 6-8" },
    { icon: GraduationCap, label: "Senior Secondary", color: "from-purple-400 to-purple-500", desc: "Class 9-12" },
  ];

  const streams = [
    { icon: Flask, label: "Science", color: "from-cyan-400 to-cyan-500" },
    { icon: Briefcase, label: "Commerce", color: "from-amber-400 to-amber-500" },
    { icon: Library, label: "Humanities", color: "from-rose-400 to-rose-500" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Academics</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            Our Academic Programs
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            A comprehensive curriculum designed for holistic development
          </p>
        </div>

        {/* Levels */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-gold-500/30 transition-all hover:-translate-y-2 shadow-premium hover:shadow-3xl"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${level.color} mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg">{level.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{level.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Streams */}
        <div>
          <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">Senior Secondary Streams</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {streams.map((stream, index) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:border-gold-500/30 transition-all hover:-translate-y-2 shadow-premium hover:shadow-3xl"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stream.color} mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg">{stream.label}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academics;