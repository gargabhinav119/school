import mongoose from 'mongoose';

const FooterLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
});

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: '' },
});

const FooterSchema = new mongoose.Schema({
  // Brand Section
  brandName: { type: String, default: 'Agrasen' },
  brandTagline: { type: String, default: 'Public School' },
  brandDescription: { type: String, default: 'Nurturing future leaders since 2011.' },
  
  // Quick Links
  quickLinks: { type: [FooterLinkSchema], default: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Admissions', href: '/admission-query' },
    { label: 'Academics', href: '/academics' },
    { label: 'Contact', href: '/contact-us' },
  ]},
  
  // Admissions Links
  admissionLinks: { type: [FooterLinkSchema], default: [
    { label: 'Apply Now', href: '/admission-query' },
    { label: 'Admission Process', href: '/admission-query' },
    { label: 'Book Campus Visit', href: '/admission-query' },
    { label: 'Fee Structure', href: '/admission-query' },
  ]},
  
  // Contact Info
  address: { type: String, default: 'Noida Extension, Uttar Pradesh' },
  phone: { type: String, default: '+91 98765 43210' },
  email: { type: String, default: 'info@agrasen.edu.in' },
  
  // Social Links
  socialLinks: { type: [SocialLinkSchema], default: [
    { platform: 'Facebook', url: 'https://facebook.com/agrasenpublicschool', icon: 'Facebook' },
    { platform: 'Instagram', url: 'https://instagram.com/agrasenpublicschool', icon: 'Instagram' },
    { platform: 'YouTube', url: 'https://youtube.com/agrasenpublicschool', icon: 'Youtube' },
    { platform: 'Twitter', url: 'https://twitter.com/agrasenpublicschool', icon: 'Twitter' },
  ]},
  
  // Bottom Bar
  copyrightText: { type: String, default: '© 2026 Agrasen Public School. All Rights Reserved.' },
  bottomLinks: { type: [FooterLinkSchema], default: [
    { label: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms' },
  ]},
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Footer || mongoose.model('Footer', FooterSchema);