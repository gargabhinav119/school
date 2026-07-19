import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  icon: { type: String, default: 'FileText' },
  label: { type: String, required: true },
  desc: { type: String, required: true },
});

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  designation: { type: String, required: true },
  photo: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, default: '10+ years experience' },
});

const AcademicsSchema = new mongoose.Schema({
  // Admission Section
  admissionTitle: { type: String, default: 'Admission Process' },
  admissionDescription: { type: String, default: 'Our admission process is designed to be simple and transparent. We welcome students who are eager to learn and grow with us.' },
  admissionSteps: { type: [StepSchema], default: [
    { icon: 'FileText', label: 'Fill Application', desc: 'Complete the online application form' },
    { icon: 'Calendar', label: 'Schedule Visit', desc: 'Book a campus visit & interaction' },
    { icon: 'CheckCircle', label: 'Submit Documents', desc: 'Upload required documents' },
    { icon: 'Award', label: 'Confirm Admission', desc: 'Pay fees & secure your seat' },
  ]},
  documents: { type: [String], default: [
    'Birth Certificate', 'Previous School Records', 'Transfer Certificate',
    'Passport Size Photos', 'Aadhar Card', 'Medical Certificate'
  ]},
  applyBtnText: { type: String, default: 'Apply Now' },
  
  // Quick Info
  session: { type: String, default: '2027-28' },
  classes: { type: String, default: 'Nursery-12' },
  ratio: { type: String, default: '30:1' },
  board: { type: String, default: 'CBSE' },
  helpline: { type: String, default: '+91 98765 43210' },
  
  // Staff Section
  staffTitle: { type: String, default: 'Our Staff' },
  staffDescription: { type: String, default: 'Our dedicated and experienced faculty members are committed to providing quality education and nurturing young minds.' },
  staffStats: {
    teachers: { type: String, default: '50+' },
    departments: { type: String, default: '10+' },
    experience: { type: String, default: '15+' },
    qualified: { type: String, default: '100%' },
  },
  staffTags: { type: [String], default: ['🎓 Ph.D. Holders', '🏆 Award Winning', '📚 Experienced'] },
  teachers: { type: [TeacherSchema], default: [
    { name: 'Dr. Meera Sharma', subject: 'Mathematics', designation: 'Head of Department', photo: '/images/teacher1.jpg', qualification: 'Ph.D. Mathematics', experience: '10+ years experience' },
    { name: 'Mr. Rajesh Kumar', subject: 'Physics', designation: 'Senior Teacher', photo: '/images/teacher2.jpg', qualification: 'M.Sc. Physics', experience: '10+ years experience' },
    { name: 'Mrs. Priya Singh', subject: 'Chemistry', designation: 'Senior Teacher', photo: '/images/teacher3.jpg', qualification: 'M.Sc. Chemistry', experience: '10+ years experience' },
    { name: 'Mr. Suresh Sharma', subject: 'English', designation: 'Head of Department', photo: '/images/teacher4.jpg', qualification: 'M.A. English', experience: '10+ years experience' },
  ]},
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Academics || mongoose.model('Academics', AcademicsSchema);