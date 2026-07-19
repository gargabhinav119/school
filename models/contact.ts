import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  // Contact Info
  phone: { type: String, default: '+91 98765 43210' },
  phoneSecondary: { type: String, default: '+91 98765 43211' },
  email: { type: String, default: 'info@agrasen.edu.in' },
  emailSecondary: { type: String, default: 'admissions@agrasen.edu.in' },
  address: { type: String, default: 'Noida Extension, Uttar Pradesh' },
  addressFull: { type: String, default: 'Agrasen Public School, Noida Extension, Uttar Pradesh, India' },
  
  // Map
  mapUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0!2d77.0!3d28.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890' },
  
  // Social Media
  facebook: { type: String, default: 'https://facebook.com/agrasenpublicschool' },
  instagram: { type: String, default: 'https://instagram.com/agrasenpublicschool' },
  youtube: { type: String, default: 'https://youtube.com/agrasenpublicschool' },
  twitter: { type: String, default: 'https://twitter.com/agrasenpublicschool' },
  whatsapp: { type: String, default: 'https://wa.me/919876543210' },
  linkedin: { type: String, default: 'https://linkedin.com/company/agrasenpublicschool' },
  
  // Working Hours
  workingHours: {
    weekdays: { type: String, default: '7:30 AM - 2:30 PM' },
    saturday: { type: String, default: '7:30 AM - 12:30 PM' },
    sunday: { type: String, default: 'Closed' },
  },
  
  // Contact Form Fields
  formTitle: { type: String, default: 'Send us a Message' },
  formDescription: { type: String, default: 'Have questions? We\'d love to hear from you. Fill out the form and we\'ll get back to you soon.' },
  formButtonText: { type: String, default: 'Send Message' },
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);