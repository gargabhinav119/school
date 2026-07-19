"use client";
import { motion } from "framer-motion";
import { Laptop, Cpu, Shield, Dumbbell, Globe, BookOpen, Music, Bus } from "lucide-react";

const WhyChoose = () => {
  const features = [
    { icon: Laptop, label: "Smart Classes", color: "from-blue-400 to-blue-500" },
    { icon: Cpu, label: "AI & Robotics", color: "from-purple-400 to-purple-500" },
    { icon: Shield, label: "Karate", color: "from-red-400 to-red-500" },
    { icon: Dumbbell, label: "Yoga", color: "from-emerald-400 to-emerald-500" },
    { icon: Globe, label: "Sports", color: "from-indigo-400 to-indigo-500" },
    { icon: BookOpen, label: "Digital Library", color: "from-orange-400 to-orange-500" },
    { icon: Music, label: "Music & Dance", color: "from-pink-400 to-pink-500" },
    { icon: Bus, label: "Transport", color: "from-yellow-400 to-yellow-500" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-premium">
        <div className="text-center mb-10">
          <span className="text-gold-500 font-semibold text-xs tracking-[0.2em] uppercase">Why Choose APS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-1">Excellence in Every Aspect</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-3 shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 text-sm">{feature.label}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;