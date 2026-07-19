import mongoose from 'mongoose';

// Schema for individual holiday
const HolidaySchema = new mongoose.Schema({
  month: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, default: 'from-blue-400 to-blue-500' },
  icon: { type: String, default: 'Award' },
});

// Schema for individual notice
const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String, default: 'Bell' },
});

const CircularsSchema = new mongoose.Schema({
  // Holidays Section
  holidaysTitle: { type: String, default: 'List of Holidays' },
  holidaysDescription: { type: String, default: 'Academic calendar with all scheduled holidays and important dates for the session 2027-28.' },
  holidaysStats: {
    total: { type: String, default: '15+' },
    months: { type: String, default: '12' },
  },
  holidaysTags: { type: [String], default: ['🏛️ National Holidays', '🎉 Festivals', '📚 Academic Breaks'] },
  holidays: [HolidaySchema],
  
  // Notices Section
  noticesTitle: { type: String, default: 'Official Notices' },
  noticesDescription: { type: String, default: 'Stay updated with all official notifications, announcements, and important information from the school administration.' },
  noticesStats: {
    active: { type: String, default: '6' },
    updates: { type: String, default: 'New' },
  },
  noticesTags: { type: [String], default: ['🔔 Important', '🎪 Events', '📋 Updates'] },
  notices: [NoticeSchema],
  
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Circulars || mongoose.model('Circulars', CircularsSchema);