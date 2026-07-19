"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface AchievementStudent {
  name: string;
  photo: string;
  rank: number;
}

interface Achievement {
  _id: string;
  title: string;
  year: string;
  icon: string;
  description: string;
  students: AchievementStudent[];
  isActive: boolean;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  if (!achievements?.length) return null;

  const getIcon = (icon: string) => {
    switch (icon) {
      case "🏆":
        return <Trophy size={20} className="text-[#D4AF37]" />;
      case "⭐":
        return <Star size={20} className="text-[#D4AF37]" />;
      case "🥇":
        return <Medal size={20} className="text-[#D4AF37]" />;
      case "⚽":
        return <Sparkles size={20} className="text-[#D4AF37]" />;
      default:
        return <Award size={20} className="text-[#D4AF37]" />;
    }
  };

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447]">
            Our <span className="text-[#D4AF37]">Achievers</span>
          </h2>
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 mt-2">
            Celebrating Excellence &amp; Academic Brilliance
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="space-y-10">
          {achievements.map((category, catIndex) => {
            const students = category.students ?? [];

            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[#D4AF37]/10 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-[#0B2447] to-[#173B74] px-6 py-4 border-b-2 border-[#D4AF37]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-white/10 flex items-center justify-center">
                      {getIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-xs">{category.year}</p>
                    </div>
                  </div>
                </div>

                {/* Two Column Layout: Left Photos | Right Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  
                  {/* LEFT SIDE - Student Photos */}
                  <div className="flex flex-col">
                    <StudentGrid students={students} />
                  </div>

                  {/* RIGHT SIDE - Category Description (Top Aligned) */}
                  <div className="flex flex-col">
                    <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#D4AF37]/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <BookOpen size={14} className="text-[#D4AF37]" />
                        </div>
                        <span className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
                          About the Programme
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description || "Celebrating outstanding achievements in this discipline."}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;

// ============================================================
// STUDENT GRID - Left Side Photos
// ============================================================
const StudentGrid = ({ students }: { students: AchievementStudent[] }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        No students added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {students.map((student, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="flex flex-col items-center group"
        >
          {/* Photo with Gold Border */}
          <div className="relative">
            <div className="p-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#f3df8f] shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <div className="p-0.5 rounded-full bg-white">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Rank Badge */}
            {student.rank && (
              <div className="absolute -top-1 -right-1 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#e8c456] shadow-md border-2 border-white px-1.5 py-0.5">
                <span className="text-[7px] font-bold text-[#0B2447]">
                  #{student.rank}
                </span>
              </div>
            )}
          </div>

          {/* Name */}
          <p className="text-xs font-medium text-[#0B2447] mt-2 text-center group-hover:text-[#D4AF37] transition-colors duration-300">
            {student.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
};