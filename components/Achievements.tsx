"use client";
import { motion } from "framer-motion";
import { 
  GraduationCap,
  Trophy,
  Medal,
  Award,
  Star
} from "lucide-react";

const Achievements = () => {
  const achievements = [
    { icon: GraduationCap, label: "Board Results", desc: "98% success rate", color: "from-blue-400 to-blue-500" },
    { icon: Trophy, label: "Olympiad Winners", desc: "50+ national winners", color: "from-gold-400 to-gold-500" },
    { icon: Medal, label: "Sports Achievements", desc: "20+ state level", color: "from-emerald-400 to-emerald-500" },
    { icon: Award, label: "Competition Winners", desc: "100+ inter-school", color: "from-purple-400 to-purple-500" },
    { icon: Star, label: "Teacher Awards", desc: "15+ excellence awards", color: "from-rose-400 to-rose-500" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Achievements</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            Our Pride & Glory
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            Celebrating excellence in every field
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 text-center shadow-premium hover:shadow-3xl transition-all hover:-translate-y-2 border border-gray-100/50 hover:border-gold-500/30"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-sm md:text-base">{item.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;