"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "@/app/context/AdminContext";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  Send,
  Sparkles,
  Edit
} from "lucide-react";

const Footer = () => {
  const { isAdmin } = useAdmin();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/footer")
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <footer className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/20 text-sm">
          Loading footer...
        </div>
      </footer>
    );
  }

  const footer = data || {};

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, any> = {
      Facebook: Facebook,
      Instagram: Instagram,
      Youtube: Youtube,
      Twitter: Twitter,
    };
    return icons[platform] || Facebook;
  };

  return (
    <footer className="bg-gradient-to-br from-[#0B2447] via-[#0B2447] to-[#19376D] border-t border-white/5 relative overflow-hidden">
      {/* ✏️ Edit Pencil - Top Right */}
      {isAdmin && (
        <div className="absolute top-3 right-4 z-10">
          <Link
            href="/admin/edit/footer"
            className="flex items-center gap-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0B2447] px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-lg backdrop-blur-sm"
          >
            <Edit size={12} /> Edit Footer
          </Link>
        </div>
      )}

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                <Sparkles size={16} className="text-[#0B2447]" />
              </div>
              <div>
                <div className="text-lg font-bold text-white tracking-tight leading-none">
                  {footer.brandName || 'Agrasen'}
                </div>
                <div className="text-[7px] tracking-[0.2em] font-medium uppercase text-[#D4AF37]/60 leading-none mt-0.5">
                  {footer.brandTagline || 'Public School'}
                </div>
              </div>
            </div>
            
            <p className="text-white/40 text-xs leading-relaxed">
              {footer.brandDescription || 'Nurturing future leaders since 2011.'}
            </p>
            
            <div className="flex gap-2 mt-3">
              {(footer.socialLinks || []).map((social: any, index: number) => {
                const Icon = getSocialIcon(social.icon || social.platform);
                return (
                  <a 
                    key={index}
                    href={social.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#D4AF37] border border-white/5 hover:border-[#D4AF37] flex items-center justify-center text-white/30 hover:text-[#0B2447] transition-all duration-300 hover:scale-110 group"
                  >
                    <Icon size={12} className="group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1.5">
              {(footer.quickLinks || []).map((link: any, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.href || '#'} 
                    className="text-white/40 hover:text-[#D4AF37] text-[11px] transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admissions Links */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold mb-3 uppercase tracking-wider">Admissions</h4>
            <ul className="space-y-1.5">
              {(footer.admissionLinks || []).map((link: any, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.href || '#'} 
                    className="text-white/40 hover:text-[#D4AF37] text-[11px] transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold mb-3 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-white/40 text-[11px]">
                <MapPin size={12} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{footer.address || 'Noida Extension, Uttar Pradesh'}</span>
              </li>
              <li className="flex items-center gap-2 text-white/40 text-[11px]">
                <Phone size={12} className="text-[#D4AF37] flex-shrink-0" />
                <span>{footer.phone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center gap-2 text-white/40 text-[11px]">
                <Mail size={12} className="text-[#D4AF37] flex-shrink-0" />
                <span>{footer.email || 'info@agrasen.edu.in'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-[9px]">
            {footer.copyrightText || '© 2026 Agrasen Public School. All Rights Reserved.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[9px] text-white/20">
            {(footer.bottomLinks || []).map((link: any, index: number) => (
              <span key={index} className="flex items-center gap-3">
                <Link 
                  href={link.href || '#'} 
                  className="hover:text-white/40 transition-colors"
                >
                  {link.label}
                </Link>
                {index < (footer.bottomLinks || []).length - 1 && (
                  <span className="text-white/10">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;