"use client";
import { motion } from "framer-motion";
import { 
  Theater,
  Trophy,
  FlaskRound as Flask,
  Bus,
  Flag,
  Users,
  Palette,
  Music,
  Mic2,
  Sword
} from "lucide-react";

const CampusLife = () => {
  const activities = [
    { icon: Theater, label: "Annual Function", color: "from-purple-400 to-purple-500" },
    { icon: Trophy, label: "Sports Day", color: "from-red-400 to-red-500" },
    { icon: Flask, label: "Science Exhibition", color: "from-cyan-400 to-cyan-500" },
    { icon: Bus, label: "Educational Tours", color: "from-emerald-400 to-emerald-500" },
    { icon: Flag, label: "Independence Day", color: "from-orange-400 to-orange-500" },
    { icon: Users, label: "House Activities", color: "from-blue-400 to-blue-500" },
    { icon: Palette, label: "Art & Craft", color: "from-rose-400 to-rose-500" },
    { icon: Music, label: "Music", color: "from-pink-400 to-pink-500" },
    { icon: Mic2, label: "Dance", color: "from-violet-400 to-violet-500" },
    { icon: Sword, label: "NCC/NSS", color: "from-amber-400 to-amber-500" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Campus Life</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            Beyond Academics
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            Nurturing talents through diverse co-curricular activities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-gold-500/30 transition-all hover:-translate-y-2 shadow-premium hover:shadow-3xl"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${activity.color} mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 text-sm md:text-base">
                  {activity.label}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampusLife;