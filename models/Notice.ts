import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String, default: '#' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);