"use client";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Download, 
  Calendar, 
  FileText, 
  Mail,
  CheckCircle,
  Sparkles
} from "lucide-react";

const AdmissionsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-premium relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm tracking-[0.2em] uppercase">Admissions</span>
            <h2 className="heading-premium text-navy-900 mt-2">
              Admissions Open 2027-28
            </h2>
            <p className="subheading-premium text-gray-600 mt-4 mx-auto">
              Join us in shaping a bright future for your child
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-premium border border-gray-100/50"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-gold-500" />
                  Admission Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Apply Online</p>
                      <p className="text-sm text-gray-500">Fill the online application form</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Submit Documents</p>
                      <p className="text-sm text-gray-500">Upload required documents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Pay Fee</p>
                      <p className="text-sm text-gray-500">Complete the fee payment online</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-900">Confirm Admission</p>
                      <p className="text-sm text-gray-500">Get confirmation and welcome letter</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white px-6 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 flex items-center justify-center gap-2">
                    Apply Online
                    <ArrowRight size={18} />
                  </button>
                  <button className="w-full border-2 border-gold-500/30 text-gold-600 hover:bg-gold-50 px-6 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Prospectus
                  </button>
                  <button className="w-full border-2 border-navy-900/10 text-navy-900 hover:bg-navy-50 px-6 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    Book School Visit
                  </button>
                  <button className="w-full border-2 border-navy-900/10 text-navy-900 hover:bg-navy-50 px-6 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                    <Mail size={18} />
                    Admission Enquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Eligibility Criteria</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Documents Required</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Fee Structure</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;