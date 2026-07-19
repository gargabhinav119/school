import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, required: true },
  alt: { type: String, default: '' },
});

const HomeSchema = new mongoose.Schema({
  // Hero Section
  schoolName: { type: String, default: 'AGRASEN' },
  schoolSubName: { type: String, default: 'Public School' },
  tagline: { type: String, default: 'Creativity • Innovation • Patriotism' },
  mainMessage: { type: String, default: '"Nurturing Future Leaders Since 2011"' },
  admissionText: { type: String, default: 'Admissions Open for Session 2027-28' },
  applyBtnText: { type: String, default: 'Apply Now' },
  visitBtnText: { type: String, default: 'Book a Campus Visit' },
  
  // Stats
  stats: { type: [StatSchema], default: [
    { value: '12+', label: 'Years of Excellence' },
    { value: '2500+', label: 'Students' },
    { value: '150+', label: 'Faculty Members' },
    { value: '100%', label: 'CBSE Affiliated' },
  ]},
  
  // Video
  videoUrl: { type: String, default: '/videos/school.mp4' },
  posterUrl: { type: String, default: '/images/hero-poster.jpg' },
  
  // Right Side Images
  images: { type: [ImageSchema], default: [
    { url: '/images/footer-school.jpg', caption: '🏫 Our Campus', alt: 'School Campus' },
    { url: '/images/footer-classroom.jpg', caption: '📚 Smart Class', alt: 'Smart Classroom' },
    { url: '/images/footer-sports.jpg', caption: '⚽ Sports', alt: 'Sports' },
    { url: '/images/footer-lab.jpg', caption: '🔬 Labs', alt: 'Labs' },
    { url: '/images/footer-library.jpg', caption: '📖 Library', alt: 'Library' },
  ]},
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Home || mongoose.model('Home', HomeSchema);