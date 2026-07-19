"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Users, GraduationCap } from "lucide-react";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Mr. Rajesh Kumar",
      type: "Parent",
      text: "My daughter has shown tremendous growth in academics and confidence. The teachers are exceptional and truly care about each student's development.",
      rating: 5,
      icon: Users
    },
    {
      name: "Aanya Sharma",
      type: "Student (Class 10)",
      text: "The learning environment at APS is amazing. The teachers make every subject interesting and the labs are world-class.",
      rating: 5,
      icon: GraduationCap
    },
    {
      name: "Dr. Amit Verma",
      type: "Alumni (Batch 2020)",
      text: "APS shaped my career and personality. The values and education I received here continue to guide me in life.",
      rating: 5,
      icon: Users
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const Icon = testimonials[current].icon;

  return (
    <section className="section-padding bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-premium relative">
        <div className="text-center mb-16">
          <span className="text-gold-400 font-semibold text-sm tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="heading-premium text-white mt-2">
            What Our Community Says
          </h2>
          <p className="subheading-premium text-gray-400 mt-4 mx-auto">
            Hear from parents, students and alumni about their experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <Quote size={48} className="text-gold-500/20 absolute top-6 right-6" />
            
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-gold-400 text-gold-400" />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg`}>
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold">{testimonials[current].name}</h4>
                <p className="text-gold-400 text-sm">{testimonials[current].type}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'w-8 bg-gold-400' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;