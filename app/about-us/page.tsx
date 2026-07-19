"use client";
import { useState, useEffect } from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import FloatingButtons from "../../components/FloatingButtons";
import { useAdmin } from "../context/AdminContext";
import { 
  Award, 
  Target, 
  Lightbulb, 
  Shield, 
  BookOpen, 
  Heart, 
  Users, 
  Globe, 
  Leaf, 
  Dumbbell, 
  Sparkles, 
  Eye, 
  TrendingUp, 
  CheckCircle,
  User,
  Star,
  Quote,
  Crown,
  Edit
} from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const { isAdmin } = useAdmin();
  const [activeSection, setActiveSection] = useState("principal");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "principal", label: "Principal", icon: User },
    { id: "chairman", label: "Chairman", icon: Crown },
    { id: "md", label: "MD", icon: Award },
    { id: "mission", label: "Mission", icon: Target },
    { id: "motto", label: "Motto", icon: Sparkles },
  ];

  useEffect(() => {
    fetch("/api/about")
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
      <main className="pt-16 md:pt-20 bg-gradient-to-b from-[#F8FAFC] to-white min-h-screen">
        
        {/* ===== HERO SECTION ===== */}
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
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">About Us</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              About <span className="text-[#D4AF37]">Agrasen</span> Public School
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              Shaping Future Leaders with Excellence, Innovation and Values Since 2011.
            </p>
          </div>
        </section>

        {/* ===== NAVIGATION PILLS ===== */}
        <section className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-[68px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto py-2 gap-1.5 scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
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

        {/* ===== CONTENT SECTIONS ===== */}
        <div className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/admin/edit/about"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit size={16} /> Edit About Us
                </Link>
              </div>
            )}
            {activeSection === "principal" && <PrincipalMessage data={data} />}
            {activeSection === "chairman" && <ChairmanMessage data={data} />}
            {activeSection === "md" && <ManagingDirectorMessage data={data} />}
            {activeSection === "mission" && <MissionVision data={data} />}
            {activeSection === "motto" && <SchoolMotto data={data} />}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// PRINCIPAL'S MESSAGE - Premium (Like Result Page)
// ============================================================
function PrincipalMessage({ data }: { data: any }) {
  const photo = data?.principalPhoto || "/images/principal.jpg";
  const name = data?.principalName || "Dr. Meera Sharma";
  const designation = data?.principalDesignation || "Principal, Agrasen Public School";
  const message = data?.principalMessage || "Education is the most powerful weapon which you can use to change the world. At Agrasen Public School, we believe in nurturing young minds with a perfect blend of traditional values and modern education. Our dedicated faculty and state-of-the-art infrastructure ensure that every child receives the best possible education. We focus on holistic development, encouraging students to explore their potential in academics, sports, arts, and beyond.";
  const experience = data?.principalExperience || "25+ years of excellence in education";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="md:flex">
        {/* Left - Photo Section (Like Result Page) */}
        <div className="md:w-[280px] lg:w-[320px] relative min-h-[280px] bg-gradient-to-br from-[#0B2447] to-[#19376D] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#D4AF37] rounded-full"></div>
          </div>
          {/* Glow Effect - Like Result Page */}
          <div className="absolute w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-500 hover:scale-105">
              <img src={photo} alt="Principal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles size={18} className="text-[#0B2447]" />
            </div>
          </div>
        </div>
        
        {/* Right - Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[#0B2447]">{name}</h3>
              <p className="text-[#D4AF37] font-medium text-sm md:text-base">{designation}</p>
            </div>
            <Quote size={32} className="text-[#D4AF37]/20 flex-shrink-0" />
          </div>
          
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-4"></div>
          
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
          
          {/* Badges - Like Result Page Stats */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">👩</span>
              <span className="text-[10px] text-gray-500 font-medium">{experience}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">🏫</span>
              <span className="text-[10px] text-gray-500 font-medium">CBSE Affiliated</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">⭐</span>
              <span className="text-[10px] text-gray-500 font-medium">Excellence Award</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHAIRMAN'S MESSAGE - Premium
// ============================================================
function ChairmanMessage({ data }: { data: any }) {
  const photo = data?.chairmanPhoto || "/images/chairman.jpg";
  const name = data?.chairmanName || "Om Prakash Garg";
  const designation = data?.chairmanDesignation || "Chairman, Agrasen Public School";
  const message = data?.chairmanMessage || "Education is not preparation for life; education is life itself. At Agrasen Public School, we are committed to providing an environment where every child can discover their true potential. Our vision is to create a learning ecosystem that fosters curiosity, creativity, and character.";
  const experience = data?.chairmanExperience || "Building a legacy of educational excellence";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="md:flex md:flex-row-reverse">
        {/* Left - Photo Section */}
        <div className="md:w-[280px] lg:w-[320px] relative min-h-[280px] bg-gradient-to-br from-[#0B2447] to-[#19376D] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border border-[#D4AF37] rounded-full"></div>
          </div>
          <div className="absolute w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-500 hover:scale-105">
              <img src={photo} alt="Chairman" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles size={18} className="text-[#0B2447]" />
            </div>
          </div>
        </div>
        
        {/* Right - Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[#0B2447]">{name}</h3>
              <p className="text-[#D4AF37] font-medium text-sm md:text-base">{designation}</p>
            </div>
            <Quote size={32} className="text-[#D4AF37]/20 flex-shrink-0" />
          </div>
          
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-4"></div>
          
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">🏆</span>
              <span className="text-[10px] text-gray-500 font-medium">{experience}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">⭐</span>
              <span className="text-[10px] text-gray-500 font-medium">Visionary Leader</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MANAGING DIRECTOR'S MESSAGE - Premium
// ============================================================
function ManagingDirectorMessage({ data }: { data: any }) {
  const photo = data?.mdPhoto || "/images/md.jpg";
  const name = data?.mdName || "Shri Rajesh Garg";
  const designation = data?.mdDesignation || "Managing Director, Agrasen Public School";
  const message = data?.mdMessage || "Innovation is the key to excellence. At Agrasen Public School, we constantly strive to push the boundaries of educational excellence. Our focus is on creating an ecosystem where students are encouraged to think critically, solve problems creatively, and lead with integrity.";
  const experience = data?.mdExperience || "Driving innovation in education since 2011";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="md:flex">
        {/* Left - Photo Section */}
        <div className="md:w-[280px] lg:w-[320px] relative min-h-[280px] bg-gradient-to-br from-[#0B2447] to-[#19376D] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#D4AF37] rounded-full"></div>
          </div>
          <div className="absolute w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-500 hover:scale-105">
              <img src={photo} alt="Managing Director" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles size={18} className="text-[#0B2447]" />
            </div>
          </div>
        </div>
        
        {/* Right - Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[#0B2447]">{name}</h3>
              <p className="text-[#D4AF37] font-medium text-sm md:text-base">{designation}</p>
            </div>
            <Quote size={32} className="text-[#D4AF37]/20 flex-shrink-0" />
          </div>
          
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-4"></div>
          
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">🚀</span>
              <span className="text-[10px] text-gray-500 font-medium">{experience}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-4 py-2 border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <span className="text-[#D4AF37] text-sm">💡</span>
              <span className="text-[10px] text-gray-500 font-medium">Innovation Expert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MISSION & VISION - Premium (Like Result Page Cards)
// ============================================================
function MissionVision({ data }: { data: any }) {
  const defaultVisionItems = [
    { icon: Award, label: "Academic Excellence", color: "from-yellow-400 to-yellow-500" },
    { icon: Users, label: "Holistic Development", color: "from-blue-400 to-blue-500" },
    { icon: Lightbulb, label: "Innovation", color: "from-purple-400 to-purple-500" },
    { icon: Globe, label: "Global Citizens", color: "from-green-400 to-green-500" },
    { icon: Shield, label: "Safe Environment", color: "from-red-400 to-red-500" },
    { icon: BookOpen, label: "Life Long Learning", color: "from-indigo-400 to-indigo-500" },
  ];

  const defaultMissionItems = [
    { icon: Award, label: "Quality Education" },
    { icon: Shield, label: "Safe Learning" },
    { icon: Lightbulb, label: "Research" },
    { icon: Leaf, label: "Environment" },
    { icon: Heart, label: "Yoga" },
    { icon: Dumbbell, label: "Self Defence" },
    { icon: CheckCircle, label: "Healthy Lifestyle" },
    { icon: TrendingUp, label: "Excellence" },
  ];

  const visionItems = data?.visionItems?.length ? data.visionItems.map((item: string) => {
    const found = defaultVisionItems.find(d => d.label === item);
    return found || { icon: Award, label: item, color: "from-gray-400 to-gray-500" };
  }) : defaultVisionItems;

  const missionItems = data?.missionItems?.length ? data.missionItems.map((item: string) => {
    const found = defaultMissionItems.find(d => d.label === item);
    return found || { icon: Award, label: item };
  }) : defaultMissionItems;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* ===== VISION ===== */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
              <Eye size={24} className="text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#0B2447]">Our Vision</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {visionItems.map((item: any, index: number) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="group bg-[#F8FAFC] rounded-xl p-4 text-center border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color || 'from-gray-400 to-gray-500'} mb-2 shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 group-hover:text-[#0B2447]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== MISSION ===== */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
              <Target size={24} className="text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#0B2447]">Our Mission</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {missionItems.map((item: any, index: number) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="group bg-[#F8FAFC] rounded-xl p-3.5 text-center border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-[#0B2447] mb-1.5 shadow-md group-hover:shadow-lg transition-all group-hover:scale-110">
                    <Icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[10px] font-medium text-gray-700 group-hover:text-[#0B2447]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// SCHOOL MOTTO - Premium
// ============================================================
function SchoolMotto({ data }: { data: any }) {
  const mottoItems = [
    { icon: Sparkles, label: "Creativity", color: "from-yellow-400 to-yellow-500" },
    { icon: Lightbulb, label: "Innovation", color: "from-purple-400 to-purple-500" },
    { icon: Heart, label: "Patriotism", color: "from-red-400 to-red-500" },
  ];

  const motto = data?.motto || "Creativity • Innovation • Patriotism";
  const description = data?.mottoDescription || "We nurture world-class students with Creativity, Innovation and Patriotism.";

  return (
    <div className="bg-gradient-to-br from-[#0B2447] to-[#19376D] rounded-2xl p-8 md:p-10 text-center border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#D4AF37]/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#D4AF37]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-[#D4AF37]/20 rounded-full"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Our Motto</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-4">
          {mottoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl shadow-[#D4AF37]/20`}>
                  <Icon size={28} className="text-white" />
                </div>
                <span className="text-white font-display font-bold text-2xl md:text-3xl">{item.label}</span>
                {index < mottoItems.length - 1 && (
                  <span className="text-[#D4AF37]/30 text-4xl font-light hidden md:block">•</span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 max-w-3xl mx-auto">
          <p className="text-[#D6D6D6] text-base md:text-lg font-light tracking-wide">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <span className="text-[#D6D6D6]/40 text-[10px] tracking-[0.2em] font-medium">EXCELLENCE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <span className="text-[#D6D6D6]/40 text-[10px] tracking-[0.2em] font-medium">INTEGRITY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <span className="text-[#D6D6D6]/40 text-[10px] tracking-[0.2em] font-medium">LEADERSHIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}