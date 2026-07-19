"use client";
import { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useAdmin } from "@/app/context/AdminContext";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin,
  MessageCircle,
  Clock,
  Edit,
  Building
} from "lucide-react";

export default function ContactUs() {
  const { isAdmin } = useAdmin();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <TopNavbar />
        <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  const contact = data || {};

  return (
    <>
      <TopNavbar />
      <main className="pt-16 md:pt-20 bg-gradient-to-b from-[#F8FAFC] to-white min-h-screen">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B2447] to-[#19376D] py-8 md:py-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 right-20 w-32 h-32 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Contact</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              Get in <span className="text-[#D4AF37]">Touch</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to us anytime.
            </p>
          </div>
        </section>

        {/* Edit Button */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          {isAdmin && (
            <div className="flex justify-end">
              <Link
                href="/admin/edit/contact"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <Edit size={16} /> Edit Contact
              </Link>
            </div>
          )}
        </div>

        {/* Main Content - No Form */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* LEFT SIDE - Contact Info */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] transition-all">
                    <Phone size={20} className="text-[#D4AF37] group-hover:text-white transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#0B2447]">Phone</h4>
                  <p className="text-gray-500 text-sm mt-1">{contact.phone || '+91 98765 43210'}</p>
                  <p className="text-gray-400 text-xs">{contact.phoneSecondary || '+91 98765 43211'}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] transition-all">
                    <Mail size={20} className="text-[#D4AF37] group-hover:text-white transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#0B2447]">Email</h4>
                  <p className="text-gray-500 text-sm mt-1">{contact.email || 'info@agrasen.edu.in'}</p>
                  <p className="text-gray-400 text-xs">{contact.emailSecondary || 'admissions@agrasen.edu.in'}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] transition-all">
                    <MapPin size={20} className="text-[#D4AF37] group-hover:text-white transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#0B2447]">Address</h4>
                  <p className="text-gray-500 text-sm mt-1">{contact.address || 'Noida Extension, Uttar Pradesh'}</p>
                  <p className="text-gray-400 text-xs">{contact.addressFull || 'Agrasen Public School, Noida Extension, Uttar Pradesh, India'}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] transition-all">
                    <Clock size={20} className="text-[#D4AF37] group-hover:text-white transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#0B2447]">Working Hours</h4>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri: {contact.workingHours?.weekdays || '7:30 AM - 2:30 PM'}</p>
                  <p className="text-gray-400 text-xs">Sat: {contact.workingHours?.saturday || '7:30 AM - 12:30 PM'}</p>
                  <p className="text-gray-400 text-xs">Sun: {contact.workingHours?.sunday || 'Closed'}</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-3">
                  <a href={contact.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#1877F2]/30">
                    <Facebook size={18} />
                  </a>
                  <a href={contact.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#E1306C]/30">
                    <Instagram size={18} />
                  </a>
                  <a href={contact.youtube || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#FF0000]/30">
                    <Youtube size={18} />
                  </a>
                  <a href={contact.twitter || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#000000] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#000000]/30">
                    <Twitter size={18} />
                  </a>
                  <a href={contact.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#0A66C2]/30">
                    <Linkedin size={18} />
                  </a>
                  <a href={contact.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-[#25D366]/30">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Map Only */}
            <div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100/50 h-[400px]">
                <iframe
                  src={contact.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0!2d77.0!3d28.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890'}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location Map"
                ></iframe>
              </div>

              <div className="mt-4 bg-white rounded-2xl p-5 shadow-lg border border-gray-100/50">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Building size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0B2447]">Visit Us</p>
                    <p className="text-gray-400 text-xs">{contact.addressFull || 'Agrasen Public School, Noida Extension, Uttar Pradesh, India'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}