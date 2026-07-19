import mongoose from 'mongoose';

const InfrastructureSchema = new mongoose.Schema({
  // Classrooms
  classroomsTitle: { type: String, default: 'Smart Classrooms' },
  classroomsDescription: { type: String, default: 'Our classrooms are designed to create an engaging and interactive learning environment. Equipped with smart boards, digital projectors, and ergonomic furniture.' },
  classroomsStats: {
    classrooms: { type: String, default: '50+' },
    smartBoards: { type: String, default: '100%' },
    studentRatio: { type: String, default: '30:1' },
    wifi: { type: String, default: 'Enabled' },
  },
  classroomsTags: { type: [String], default: ['💻 Smart Boards', '📚 Digital Library', '🎯 Interactive Learning'] },
  classroomsImages: { type: [String], default: ['/images/classroom1.jpg', '/images/classroom2.jpg', '/images/classroom3.jpg', '/images/classroom4.jpg'] },
  classroomsImageLabels: { type: [String], default: ['Smart Classroom 1', 'Smart Classroom 2', 'Smart Classroom 3', 'Smart Classroom 4'] },

  // Library
  libraryTitle: { type: String, default: 'Digital Library' },
  libraryDescription: { type: String, default: 'Our library is a treasure trove of knowledge with over 10,000 books, digital resources, and a peaceful reading environment that encourages a love for learning.' },
  libraryStats: {
    books: { type: String, default: '10,000+' },
    eResources: { type: String, default: '50+' },
    access: { type: String, default: '24/7' },
    seating: { type: String, default: '100+' },
  },
  libraryTags: { type: [String], default: ['📖 Fiction & Non-Fiction', '💻 Digital Resources'] },
  libraryImages: { type: [String], default: ['/images/library1.jpg', '/images/library2.jpg', '/images/library3.jpg', '/images/library4.jpg'] },
  libraryImageLabels: { type: [String], default: ['Library Section 1', 'Library Section 2', 'Library Section 3', 'Library Section 4'] },

  // Sports
  sportsTitle: { type: String, default: 'Sports & Games' },
  sportsDescription: { type: String, default: 'We believe in the holistic development of our students. Our sports facilities include indoor and outdoor games, professional coaching, and regular inter-school competitions.' },
  sportsStats: {
    facilities: { type: String, default: '5+' },
    coaches: { type: String, default: '10+' },
  },
  sportsTags: { type: [String], default: ['🏀 Basketball', '⚽ Football', '🏏 Cricket', '🏸 Badminton'] },
  sportsImages: { type: [String], default: ['/images/sports1.jpg', '/images/sports2.jpg', '/images/sports3.jpg', '/images/sports4.jpg'] },
  sportsImageLabels: { type: [String], default: ['Sports Facility 1', 'Sports Facility 2', 'Sports Facility 3', 'Sports Facility 4'] },

  // Playground
  playgroundTitle: { type: String, default: 'Playground & Outdoor' },
  playgroundDescription: { type: String, default: 'Our expansive playground provides ample space for outdoor activities, sports, and recreational games, promoting physical fitness and teamwork among students.' },
  playgroundStats: {
    area: { type: String, default: '5+' },
    capacity: { type: String, default: '1000+' },
  },
  playgroundTags: { type: [String], default: ['🌿 Green Campus', '🏃 Track & Field'] },
  playgroundImages: { type: [String], default: ['/images/playground1.jpg', '/images/playground2.jpg', '/images/playground3.jpg'] },
  playgroundImageLabels: { type: [String], default: ['Playground Area 1', 'Playground Area 2', 'Playground Area 3'] },

  // Transport
  transportTitle: { type: String, default: 'School Transport' },
  transportDescription: { type: String, default: 'Our safe and reliable transportation network ensures that students can travel to and from school comfortably. All buses are GPS-enabled with trained drivers and attendants.' },
  transportStats: {
    buses: { type: String, default: '20+' },
    routes: { type: String, default: '15+' },
    gps: { type: String, default: 'Enabled' },
    safety: { type: String, default: 'Safe' },
  },
  transportTags: { type: [String], default: ['🚌 AC Buses', '📍 Route Tracking'] },
  transportImages: { type: [String], default: ['/images/transport1.jpg', '/images/transport2.jpg', '/images/transport3.jpg'] },
  transportImageLabels: { type: [String], default: ['School Bus 1', 'School Bus 2', 'School Bus 3'] },

  // Laboratories
  laboratoriesTitle: { type: String, default: 'State-of-the-Art Labs' },
  laboratoriesDescription: { type: String, default: 'Our laboratories are equipped with modern equipment and technology, providing students with hands-on learning experiences in science, technology, and research.' },
  laboratoriesStats: {
    labs: { type: String, default: '15+' },
    equipment: { type: String, default: '1000+' },
  },
  laboratoriesTags: { type: [String], default: ['Physics Lab', 'Chemistry Lab', 'Computer Lab', 'Biology Lab'] },
  laboratoriesImages: { type: [String], default: ['/images/lab1.jpg', '/images/lab2.jpg', '/images/lab3.jpg', '/images/lab4.jpg'] },
  laboratoriesImageLabels: { type: [String], default: ['Physics Lab', 'Chemistry Lab', 'Computer Lab', 'Biology Lab'] },

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Infrastructure || mongoose.model('Infrastructure', InfrastructureSchema);