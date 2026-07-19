import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  // Principal
  principalName: { type: String, default: 'Dr. Meera Sharma' },
  principalPhoto: { type: String, default: '/images/principal.jpg' },
  principalMessage: { type: String, default: 'Education is the most powerful weapon which you can use to change the world. At Agrasen Public School, we believe in nurturing young minds with a perfect blend of traditional values and modern education. Our dedicated faculty and state-of-the-art infrastructure ensure that every child receives the best possible education.' },
  principalDesignation: { type: String, default: 'Principal, Agrasen Public School' },
  principalExperience: { type: String, default: '25+ years of excellence in education' }, // ✅ NEW
  
  // Chairman
  chairmanName: { type: String, default: 'Om Prakash Garg' },
  chairmanPhoto: { type: String, default: '/images/chairman.jpg' },
  chairmanMessage: { type: String, default: 'Education is not preparation for life; education is life itself. At Agrasen Public School, we are committed to providing an environment where every child can discover their true potential. Our vision is to create a learning ecosystem that fosters curiosity, creativity, and character.' },
  chairmanDesignation: { type: String, default: 'Chairman, Agrasen Public School' },
  chairmanExperience: { type: String, default: 'Building a legacy of educational excellence' }, // ✅ NEW
  
  // Managing Director
  mdName: { type: String, default: 'Shri Rajesh Garg' },
  mdPhoto: { type: String, default: '/images/md.jpg' },
  mdMessage: { type: String, default: 'Innovation is the key to excellence. At Agrasen Public School, we constantly strive to push the boundaries of educational excellence. Our focus is on creating an ecosystem where students are encouraged to think critically, solve problems creatively, and lead with integrity.' },
  mdDesignation: { type: String, default: 'Managing Director, Agrasen Public School' },
  mdExperience: { type: String, default: 'Driving innovation in education since 2011' }, // ✅ NEW
  
  // Mission & Vision
  visionItems: { type: [String], default: ['Academic Excellence', 'Holistic Development', 'Innovation & Creativity', 'Responsible Global Citizens', 'Safe & Inclusive Environment', 'Life Long Learning'] },
  missionItems: { type: [String], default: ['High Quality Education', 'Safe Learning Environment', 'Research & Innovation', 'Environmental Awareness', 'Yoga & Meditation', 'Self Defence Training', 'Healthy Lifestyle', 'Student Excellence'] },
  
  // Motto
  motto: { type: String, default: 'Creativity • Innovation • Patriotism' },
  mottoDescription: { type: String, default: 'We nurture world-class students with Creativity, Innovation and Patriotism.' },
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);