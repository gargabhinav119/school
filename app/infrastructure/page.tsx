"use client";
import { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useAdmin } from "@/app/context/AdminContext";
import Link from "next/link";
import { Edit, GraduationCap, Library, Dumbbell, Landmark, Bus, FlaskRound } from "lucide-react";

export default function Infrastructure() {
  const { isAdmin } = useAdmin();
  const [activeSection, setActiveSection] = useState("classrooms");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "classrooms", label: "Classrooms", icon: GraduationCap },
    { id: "library", label: "Library", icon: Library },
    { id: "sports", label: "Sports & Games", icon: Dumbbell },
    { id: "playground", label: "Playground", icon: Landmark },
    { id: "transport", label: "Transport", icon: Bus },
    { id: "laboratories", label: "Laboratories", icon: FlaskRound },
  ];

  useEffect(() => {
    fetch("/api/infrastructure")
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <TopNavbar />
        <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavbar />
      <main className="pt-16 md:pt-20 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] min-h-screen">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B2447] to-[#19376D] py-8 md:py-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 right-20 w-32 h-32 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xs font-semibold font-poppins tracking-[0.3em] uppercase">Infrastructure</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              World-Class <span className="text-[#D4AF37]">Facilities</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              State-of-the-art infrastructure for holistic learning and development
            </p>
          </div>
        </section>

        {/* Navigation Pills */}
        <section className="bg-white/80 backdrop-blur-sm border-b border-[#F8FAFC] sticky top-[68px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto py-2 gap-1.5 scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#D4AF37] text-[#0B2447] shadow-lg shadow-[#D4AF37]/25"
                        : "text-gray-500 hover:text-[#0B2447] hover:bg-[#D4AF37]/10"
                    }`}
                  >
                    <Icon size={14} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            {/* ✅ Pencil Icon - Only for Admin */}
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/admin/edit/infrastructure"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit size={16} /> Edit Infrastructure
                </Link>
              </div>
            )}
            {activeSection === "classrooms" && <ClassroomsSection data={data} />}
            {activeSection === "library" && <LibrarySection data={data} />}
            {activeSection === "sports" && <SportsSection data={data} />}
            {activeSection === "playground" && <PlaygroundSection data={data} />}
            {activeSection === "transport" && <TransportSection data={data} />}
            {activeSection === "laboratories" && <LaboratoriesSection data={data} />}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// CLASSROOMS SECTION
// ============================================================
function ClassroomsSection({ data }: { data: any }) {
  const title = data?.classroomsTitle || "Smart Classrooms";
  const description = data?.classroomsDescription || "Our classrooms are designed to create an engaging and interactive learning environment. Equipped with smart boards, digital projectors, and ergonomic furniture.";
  const stats = data?.classroomsStats || { classrooms: "50+", smartBoards: "100%", studentRatio: "30:1", wifi: "Enabled" };
  const tags = data?.classroomsTags || ["💻 Smart Boards", "📚 Digital Library", "🎯 Interactive Learning"];
  const images = data?.classroomsImages || ["/images/classroom1.jpg", "/images/classroom2.jpg", "/images/classroom3.jpg", "/images/classroom4.jpg"];
  const labels = data?.classroomsImageLabels || ["Smart Classroom 1", "Smart Classroom 2", "Smart Classroom 3", "Smart Classroom 4"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.classrooms}</div>
              <div className="text-gray-500 text-[9px] font-medium">Classrooms</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.smartBoards}</div>
              <div className="text-gray-500 text-[9px] font-medium">Smart Boards</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.studentRatio}</div>
              <div className="text-gray-500 text-[9px] font-medium">Student Ratio</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.wifi}</div>
              <div className="text-gray-500 text-[9px] font-medium">Wi-Fi</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>

        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LIBRARY SECTION
// ============================================================
function LibrarySection({ data }: { data: any }) {
  const title = data?.libraryTitle || "Digital Library";
  const description = data?.libraryDescription || "Our library is a treasure trove of knowledge with over 10,000 books, digital resources, and a peaceful reading environment.";
  const stats = data?.libraryStats || { books: "10,000+", eResources: "50+", access: "24/7", seating: "100+" };
  const tags = data?.libraryTags || ["📖 Fiction & Non-Fiction", "💻 Digital Resources"];
  const images = data?.libraryImages || ["/images/library1.jpg", "/images/library2.jpg", "/images/library3.jpg", "/images/library4.jpg"];
  const labels = data?.libraryImageLabels || ["Library Section 1", "Library Section 2", "Library Section 3", "Library Section 4"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.books}</div>
              <div className="text-gray-500 text-[9px] font-medium">Books</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.eResources}</div>
              <div className="text-gray-500 text-[9px] font-medium">E-Resources</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.access}</div>
              <div className="text-gray-500 text-[9px] font-medium">Access</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.seating}</div>
              <div className="text-gray-500 text-[9px] font-medium">Seating</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>

        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SPORTS SECTION
// ============================================================
function SportsSection({ data }: { data: any }) {
  const title = data?.sportsTitle || "Sports & Games";
  const description = data?.sportsDescription || "We believe in the holistic development of our students. Our sports facilities include indoor and outdoor games, professional coaching, and regular inter-school competitions.";
  const stats = data?.sportsStats || { facilities: "5+", coaches: "10+" };
  const tags = data?.sportsTags || ["🏀 Basketball", "⚽ Football", "🏏 Cricket", "🏸 Badminton"];
  const images = data?.sportsImages || ["/images/sports1.jpg", "/images/sports2.jpg", "/images/sports3.jpg", "/images/sports4.jpg"];
  const labels = data?.sportsImageLabels || ["Sports Facility 1", "Sports Facility 2", "Sports Facility 3", "Sports Facility 4"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.facilities}</div>
              <div className="text-gray-500 text-[9px] font-medium">Facilities</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.coaches}</div>
              <div className="text-gray-500 text-[9px] font-medium">Coaches</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PLAYGROUND SECTION
// ============================================================
function PlaygroundSection({ data }: { data: any }) {
  const title = data?.playgroundTitle || "Playground & Outdoor";
  const description = data?.playgroundDescription || "Our expansive playground provides ample space for outdoor activities, sports, and recreational games.";
  const stats = data?.playgroundStats || { area: "5+", capacity: "1000+" };
  const tags = data?.playgroundTags || ["🌿 Green Campus", "🏃 Track & Field"];
  const images = data?.playgroundImages || ["/images/playground1.jpg", "/images/playground2.jpg", "/images/playground3.jpg"];
  const labels = data?.playgroundImageLabels || ["Playground Area 1", "Playground Area 2", "Playground Area 3"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.area} Acres</div>
              <div className="text-gray-500 text-[9px] font-medium">Area</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.capacity}</div>
              <div className="text-gray-500 text-[9px] font-medium">Capacity</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TRANSPORT SECTION
// ============================================================
function TransportSection({ data }: { data: any }) {
  const title = data?.transportTitle || "School Transport";
  const description = data?.transportDescription || "Our safe and reliable transportation network ensures that students can travel to and from school comfortably.";
  const stats = data?.transportStats || { buses: "20+", routes: "15+", gps: "Enabled", safety: "Safe" };
  const tags = data?.transportTags || ["🚌 AC Buses", "📍 Route Tracking"];
  const images = data?.transportImages || ["/images/transport1.jpg", "/images/transport2.jpg", "/images/transport3.jpg"];
  const labels = data?.transportImageLabels || ["School Bus 1", "School Bus 2", "School Bus 3"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.buses}</div>
              <div className="text-gray-500 text-[9px] font-medium">Buses</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.routes}</div>
              <div className="text-gray-500 text-[9px] font-medium">Routes</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.gps}</div>
              <div className="text-gray-500 text-[9px] font-medium">GPS</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.safety}</div>
              <div className="text-gray-500 text-[9px] font-medium">Safety</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LABORATORIES SECTION
// ============================================================
function LaboratoriesSection({ data }: { data: any }) {
  const title = data?.laboratoriesTitle || "State-of-the-Art Labs";
  const description = data?.laboratoriesDescription || "Our laboratories are equipped with modern equipment and technology, providing students with hands-on learning experiences in science, technology, and research.";
  const stats = data?.laboratoriesStats || { labs: "15+", equipment: "1000+" };
  const tags = data?.laboratoriesTags || ["Physics Lab", "Chemistry Lab", "Computer Lab", "Biology Lab"];
  const images = data?.laboratoriesImages || ["/images/lab1.jpg", "/images/lab2.jpg", "/images/lab3.jpg", "/images/lab4.jpg"];
  const labels = data?.laboratoriesImageLabels || ["Physics Lab", "Chemistry Lab", "Computer Lab", "Biology Lab"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        <div className="md:w-[45%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.labs}</div>
              <div className="text-gray-500 text-[9px] font-medium">Labs</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-xl">{stats.equipment}</div>
              <div className="text-gray-500 text-[9px] font-medium">Equipment</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:w-[55%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {images.map((_: any, index: number) => (
                <span key={index} className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'}`}></span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
                <div className="rounded-xl overflow-hidden shadow-md h-[160px] md:h-[190px] relative group">
                  <img src={img} alt={labels[index] || `Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">{labels[index] || `Image ${index + 1}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}