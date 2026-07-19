import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  phone: { type: String, default: '+91 98765 43210' },
  email: { type: String, default: 'info@agrasen.edu.in' },
  address: { type: String, default: 'Noida Extension, UP' },
  facebook: { type: String, default: 'https://facebook.com/agrasenpublicschool' },
  instagram: { type: String, default: 'https://instagram.com/agrasenpublicschool' },
  youtube: { type: String, default: 'https://youtube.com/agrasenpublicschool' },
  twitter: { type: String, default: 'https://twitter.com/agrasenpublicschool' },
  erpLink: { type: String, default: 'https://erp.agrasen.edu.in' },
  admissionText: { type: String, default: 'Admissions Open 2027-28' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);