import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  imageAlt: { type: String, default: '' },
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);