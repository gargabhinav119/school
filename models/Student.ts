import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  percentage: { type: String, required: true },
  rank: { type: Number, required: true },
  class: { type: String, required: true },
  year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);