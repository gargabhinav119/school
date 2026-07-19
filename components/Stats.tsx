"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, School, FlaskRound as Flask, Award } from "lucide-react";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState({ students: 0, teachers: 0, labs: 0, results: 0 });

  const stats = [
    { key: "students", label: "Students", value: 2500, suffix: "+", icon: Users, color: "from-blue-400 to-blue-500" },
    { key: "teachers", label: "Teachers", value: 100, suffix: "+", icon: School, color: "from-gold-400 to-gold-500" },
    { key: "labs", label: "Labs", value: 15, suffix: "+", icon: Flask, color: "from-emerald-400 to-emerald-500" },
    { key: "results", label: "Board Results", value: 98, suffix: "%", icon: Award, color: "from-purple-400 to-purple-500" },
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat) => {
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        const interval = duration / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) { current = stat.value; clearInterval(timer); }
          setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(current) }));
        }, interval);
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-12 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      <div className="container-premium">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-gold-500/30 transition-all hover:scale-105"
              >
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {counts[stat.key as keyof typeof counts]}{stat.suffix}
                </div>
                <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;