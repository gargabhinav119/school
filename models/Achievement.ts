import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  rank: { type: Number, default: 0 },
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  description: { type: String, default: '' },
  students: { type: [StudentSchema], default: [] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);