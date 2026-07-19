"use client";
import { useState, useEffect } from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import FloatingButtons from "../../components/FloatingButtons";
import { useAdmin } from "../context/AdminContext";
import Link from "next/link";
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Calendar, 
  BookOpen, 
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Edit
} from "lucide-react";

// Icon mapping for dynamic icons
const iconMap: Record<string, any> = {
  FileText, Calendar, CheckCircle, Award, Users, GraduationCap, Clock, BookOpen, User, Mail, Phone, MapPin
};

export default function Academics() {
  const { isAdmin } = useAdmin();
  const [activeSection, setActiveSection] = useState("admission");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "admission", label: "Admission Process", icon: FileText },
    { id: "staff", label: "Staff", icon: Users },
  ];

  useEffect(() => {
    fetch("/api/academics")
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
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Academics</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
              Academic <span className="text-[#D4AF37]">Excellence</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm md:text-base font-light mt-2 max-w-2xl mx-auto">
              Nurturing minds through quality education and dedicated mentorship
            </p>
          </div>
        </section>

        {/* Navigation Pills */}
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

        {/* Content Sections */}
        <div className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/admin/edit/academics"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit size={16} /> Edit Academics
                </Link>
              </div>
            )}
            {activeSection === "admission" && <AdmissionSection data={data} />}
            {activeSection === "staff" && <StaffSection data={data} />}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// ADMISSION SECTION - Dynamic
// ============================================================
function AdmissionSection({ data }: { data: any }) {
  const steps = data?.admissionSteps || [
    { icon: 'FileText', label: 'Fill Application', desc: 'Complete the online application form' },
    { icon: 'Calendar', label: 'Schedule Visit', desc: 'Book a campus visit & interaction' },
    { icon: 'CheckCircle', label: 'Submit Documents', desc: 'Upload required documents' },
    { icon: 'Award', label: 'Confirm Admission', desc: 'Pay fees & secure your seat' },
  ];

  const documents = data?.documents || [
    'Birth Certificate', 'Previous School Records', 'Transfer Certificate',
    'Passport Size Photos', 'Aadhar Card', 'Medical Certificate'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        {/* Left Side - Text */}
        <div className="md:w-[50%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Academics</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">
            Admission <span className="text-[#D4AF37]">Process</span>
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {data?.admissionDescription || "Our admission process is designed to be simple and transparent. We welcome students who are eager to learn and grow with us."}
          </p>

          {/* Steps */}
          <div className="grid grid-cols-2 gap-3">
            {steps.map((step: any, index: number) => {
              const Icon = iconMap[step.icon] || FileText;
              return (
                <div key={index} className="bg-[#F8FAFC] rounded-xl p-3 border border-gray-100 hover:border-[#D4AF37]/40 transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-[#0B2447]">{step.label}</p>
                      <p className="text-[8px] text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Documents */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0B2447] mb-2">Required Documents</p>
            <div className="flex flex-wrap gap-1.5">
              {documents.map((doc: string, index: number) => (
                <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <button className="mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1 shadow-lg shadow-[#D4AF37]/25">
            {data?.applyBtnText || 'Apply Now'} <ArrowRight size={12} />
          </button>
        </div>

        {/* Right Side - Quick Info */}
        <div className="md:w-[50%] p-6 md:p-8 bg-[#F8FAFC] flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-2xl">{data?.session || '2027-28'}</div>
              <div className="text-gray-500 text-[10px] font-medium">Academic Session</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-2xl">{data?.classes || 'Nursery-12'}</div>
              <div className="text-gray-500 text-[10px] font-medium">Classes Offered</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-2xl">{data?.ratio || '30:1'}</div>
              <div className="text-gray-500 text-[10px] font-medium">Student-Teacher Ratio</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-2xl">{data?.board || 'CBSE'}</div>
              <div className="text-gray-500 text-[10px] font-medium">Board Affiliation</div>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#D4AF37]" />
              <span className="text-xs text-gray-600">Admission Helpline: <strong className="text-[#0B2447]">{data?.helpline || '+91 98765 43210'}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STAFF SECTION - Dynamic
// ============================================================
function StaffSection({ data }: { data: any }) {
  const teachers = data?.teachers || [
    { name: 'Dr. Meera Sharma', subject: 'Mathematics', designation: 'Head of Department', photo: '/images/teacher1.jpg', qualification: 'Ph.D. Mathematics', experience: '10+ years experience' },
    { name: 'Mr. Rajesh Kumar', subject: 'Physics', designation: 'Senior Teacher', photo: '/images/teacher2.jpg', qualification: 'M.Sc. Physics', experience: '10+ years experience' },
    { name: 'Mrs. Priya Singh', subject: 'Chemistry', designation: 'Senior Teacher', photo: '/images/teacher3.jpg', qualification: 'M.Sc. Chemistry', experience: '10+ years experience' },
    { name: 'Mr. Suresh Sharma', subject: 'English', designation: 'Head of Department', photo: '/images/teacher4.jpg', qualification: 'M.A. English', experience: '10+ years experience' },
  ];

  const stats = data?.staffStats || { teachers: '50+', departments: '10+', experience: '15+', qualified: '100%' };
  const tags = data?.staffTags || ['🎓 Ph.D. Holders', '🏆 Award Winning', '📚 Experienced'];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
      <div className="md:flex">
        {/* Left Side - Text */}
        <div className="md:w-[40%] p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-medium">Academics</span>
          </div>
          <h2 className="text-xl font-bold text-[#0B2447]">
            Our <span className="text-[#D4AF37]">Staff</span>
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 rounded-full my-3"></div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {data?.staffDescription || "Our dedicated and experienced faculty members are committed to providing quality education and nurturing young minds."}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-base">{stats.teachers}</div>
              <div className="text-gray-500 text-[9px] font-medium">Teachers</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-base">{stats.departments}</div>
              <div className="text-gray-500 text-[9px] font-medium">Departments</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-base">{stats.experience}+</div>
              <div className="text-gray-500 text-[9px] font-medium">Years Avg. Experience</div>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center border border-gray-100 hover:border-[#D4AF37]/30 transition-all">
              <div className="text-[#D4AF37] font-bold text-base">{stats.qualified}</div>
              <div className="text-gray-500 text-[9px] font-medium">Qualified</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-[9px] bg-[#F8FAFC] text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side - Horizontal Scroll Teachers */}
        <div className="md:w-[60%] p-5 md:p-6 bg-[#F8FAFC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] text-gray-400 font-medium">← Swipe to explore →</span>
            <div className="flex gap-1">
              {teachers.map((_: any, index: number) => (
                <span key={index} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30"></span>
              ))}
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {teachers.map((teacher: any, index: number) => (
              <div key={index} className="flex-shrink-0 w-[220px] md:w-[240px] snap-start">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#D4AF37]/40 group">
                  {/* Photo */}
                  <div className="relative h-[160px] md:h-[180px] overflow-hidden">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-white text-[10px] font-medium bg-[#D4AF37]/80 px-2 py-0.5 rounded-full">
                        {teacher.designation}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-[#0B2447]">{teacher.name}</h4>
                    <p className="text-[#D4AF37] text-xs font-medium">{teacher.subject}</p>
                    <p className="text-gray-400 text-[9px] mt-0.5">{teacher.qualification}</p>
                    
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                        <User size={10} className="text-[#D4AF37]" />
                      </div>
                      <span className="text-[8px] text-gray-400">{teacher.experience || '10+ years experience'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1 mt-3">
            {teachers.map((_: any, index: number) => (
              <span key={index} className="w-1 h-1 rounded-full bg-[#D4AF37]/30"></span>
            ))}
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
            <span className="text-[8px] text-gray-300 ml-2">{teachers.length} Teachers</span>
          </div>
        </div>
      </div>
    </div>
  );
}