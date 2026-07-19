"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play, Camera } from "lucide-react";  // ✅ Images hatao

const GalleryPreview = () => {
  const images = [
    { src: "/images/gallery1.jpg", label: "Annual Function" },
    { src: "/images/gallery2.jpg", label: "Sports Day" },
    { src: "/images/gallery3.jpg", label: "Science Exhibition" },
    { src: "/images/gallery4.jpg", label: "Classroom" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Gallery</span>
            <h2 className="heading-premium text-navy-900 mt-2">
              Life at APS
            </h2>
            <p className="subheading-premium text-gray-600 mt-4">
              A glimpse into our vibrant campus life
            </p>
          </div>
          <button className="group text-gold-500 font-semibold hover:text-gold-600 transition-all flex items-center gap-2">
            View Full Gallery
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-2xl ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className="relative h-full min-h-[200px]">
                <img
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-gold-500/90 backdrop-blur-sm rounded-full p-4 shadow-2xl shadow-gold-500/30">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-semibold text-sm">{image.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;