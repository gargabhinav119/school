"use client";
import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";

const Leadership = () => {
  const leaders = [
    {
      name: "Om Prakash Garg",
      role: "Chairman",
      message: "Education is not preparation for life. Education is life itself.",
      image: "/images/chairman.jpg",
      color: "from-amber-400 to-amber-500"
    },
    {
      name: "Shri Rajesh Garg",
      role: "Managing Director",
      message: "Innovation is the key to excellence. We strive for continuous improvement.",
      image: "/images/md.jpg",
      color: "from-blue-400 to-blue-500"
    },
    {
      name: "Dr. Meera Sharma",
      role: "Principal",
      message: "Every child is unique. Our mission is to nurture their individual potential.",
      image: "/images/principal.jpg",
      color: "from-purple-400 to-purple-500"
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Leadership</span>
          <h2 className="heading-premium text-navy-900 mt-2">
            Our Visionaries
          </h2>
          <p className="subheading-premium text-gray-600 mt-4 mx-auto">
            Guiding our institution towards excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-premium hover:shadow-3xl transition-all hover:-translate-y-2 border border-gray-100/50"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent`}></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl">{leader.name}</h3>
                  <p className="text-gold-400 text-sm">{leader.role}</p>
                </div>
              </div>

              <div className="p-6">
                <Quote size={24} className="text-gold-400/30 mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{leader.message}"
                </p>
                <button className="mt-4 text-gold-500 font-semibold text-sm hover:text-gold-600 transition-all flex items-center gap-1">
                  Read Full Message
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;