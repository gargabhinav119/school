"use client";
import { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useAdmin } from "@/app/context/AdminContext";
import { AdminGuard } from "@/components/AdminGuard";
import { AddStudentModal } from "@/components/AddStudentModal";
import { 
  GraduationCap, 
  Award, 
  Star,
  Trophy,
  Medal,
  Crown,
  Plus
} from "lucide-react";

export default function Result() {
  const { isAdmin } = useAdmin();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [students, setStudents] = useState<any>({ classX: [], classXII: [] });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const years = ["2024", "2023", "2022", "2021", "2020"];

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students?year=${selectedYear}`);
      const data = await res.json();
      
      if (data.success) {
        const classX = data.data.filter((s: any) => s.class === "X");
        const classXII = data.data.filter((s: any) => s.class === "XII");
        setStudents({ classX, classXII });
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedYear]);

  // Stats
  const totalStudents = students.classX.length + students.classXII.length;
  const highestPercentage = [...students.classX, ...students.classXII].reduce(
    (max, s) => Math.max(max, parseFloat(s.percentage) || 0),
    0
  );
  const above90 = [...students.classX, ...students.classXII].filter(
    (s) => parseFloat(s.percentage) >= 90
  ).length;

  return (
    <>
      <TopNavbar />
      <main className="pt-20 md:pt-24 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] min-h-screen">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B2447] to-[#19376D] py-8 md:py-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 right-20 w-32 h-32 border border-[#D4AF37] rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 border border-[#D4AF37] rounded-full"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xs font-semibold font-poppins tracking-[0.3em] uppercase">Results</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              Board <span className="text-[#D4AF37]">Results</span>
            </h1>
            <p className="text-[#D6D6D6] text-xs font-light mt-1 max-w-2xl mx-auto">
              CBSE Class X & XII Examination Results - Celebrating Excellence
            </p>
          </div>
        </section>

        {/* Year Selection Pills */}
        <section className="bg-white/80 backdrop-blur-sm border-b border-[#F8FAFC] sticky top-[72px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto py-2 gap-2 scrollbar-hide">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                    selectedYear === year
                      ? "bg-[#D4AF37] text-[#0B2447] shadow-lg shadow-[#D4AF37]/25"
                      : "text-gray-500 hover:text-[#0B2447] hover:bg-[#D4AF37]/10"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-gray-100">
                <div className="text-[#D4AF37] font-bold text-lg">
                  {highestPercentage > 0 ? highestPercentage + "%" : "N/A"}
                </div>
                <div className="text-gray-500 text-[8px] font-medium">Highest Percentage</div>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-gray-100">
                <div className="text-[#D4AF37] font-bold text-lg">100%</div>
                <div className="text-gray-500 text-[8px] font-medium">Pass Percentage</div>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-gray-100">
                <div className="text-[#D4AF37] font-bold text-lg">{totalStudents}</div>
                <div className="text-gray-500 text-[8px] font-medium">Total Students</div>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-gray-100">
                <div className="text-[#D4AF37] font-bold text-lg">{above90}</div>
                <div className="text-gray-500 text-[8px] font-medium">Above 90%</div>
              </div>
            </div>

            {/* Add Student Button - Only for Admin */}
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Plus size={16} /> Add New Student
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading students...</div>
            ) : (
              <>
                {/* ===== CLASS X ===== */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50 mb-5">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <GraduationCap size={16} className="text-blue-600" />
                      </div>
                      <h2 className="text-base font-bold text-[#0B2447]">Class X</h2>
                      <span className="text-[8px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        {students.classX.length} Students
                      </span>
                    </div>

                    {students.classX.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-4">No students found for Class X</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {students.classX.map((student: any, index: number) => (
                          <AdminGuard key={student._id} student={student} onSave={fetchStudents} onDelete={fetchStudents}>
                            <StudentCard student={student} index={index} />
                          </AdminGuard>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== CLASS XII ===== */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <GraduationCap size={16} className="text-purple-600" />
                      </div>
                      <h2 className="text-base font-bold text-[#0B2447]">Class XII</h2>
                      <span className="text-[8px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                        {students.classXII.length} Students
                      </span>
                    </div>

                    {students.classXII.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-4">No students found for Class XII</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {students.classXII.map((student: any, index: number) => (
                          <AdminGuard key={student._id} student={student} onSave={fetchStudents} onDelete={fetchStudents}>
                            <StudentCard student={student} index={index} />
                          </AdminGuard>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
      
      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal onClose={() => setShowAddModal(false)} onAdd={fetchStudents} />
      )}
    </>
  );
}

// ============================================================
// STUDENT CARD COMPONENT
// ============================================================
function StudentCard({ student, index }: { student: any; index: number }) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/80 flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 border-2 border-white">
          <Crown size={14} className="text-[#0B2447]" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center shadow-lg border-2 border-white">
          <Medal size={14} className="text-white" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center shadow-lg border-2 border-white">
          <Medal size={14} className="text-white" />
        </div>
      );
    } else {
      return (
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-md">
          <span className="text-[8px] font-bold text-gray-500">#{rank}</span>
        </div>
      );
    }
  };

  return (
    <div 
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all hover:-translate-y-1.5 ${
        index === 0 ? "ring-2 ring-[#D4AF37] ring-offset-2" : ""
      }`}
    >
      {/* Photo Section */}
      <div className="relative flex items-center justify-center pt-5 pb-2 h-[140px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={student.photo} 
            alt=""
            className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-all duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2447]/60 via-[#0B2447]/40 to-[#0B2447]/70"></div>
        <div className="absolute top-2 right-2 w-12 h-12 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          {index === 0 && (
            <div className="absolute -inset-2 rounded-full bg-[#D4AF37]/30 blur-xl animate-pulse"></div>
          )}
          
          <div className={`p-1 rounded-full bg-gradient-to-br ${
            index === 0 ? "from-[#D4AF37] to-[#D4AF37]/40" : 
            index === 1 ? "from-gray-300 to-gray-400" :
            index === 2 ? "from-amber-600 to-amber-400" :
            "from-gray-200 to-gray-300"
          } shadow-lg`}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/80">
              <img 
                src={student.photo} 
                alt={student.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>
          </div>
          
          <div className="absolute -bottom-1 -right-1">
            {getRankBadge(student.rank)}
          </div>
          
          {index === 0 && (
            <div className="absolute -top-1 -left-1">
              <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
                <Star size={10} className="fill-white text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 text-center bg-white">
        <h4 className="text-xs font-bold text-[#0B2447] truncate group-hover:text-[#D4AF37] transition-colors">
          {student.name}
        </h4>
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <Award size={10} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37]">{student.percentage}</span>
        </div>
        <div className="flex items-center justify-center gap-0.5 mt-1">
          <Star size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
          <Star size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
          <Star size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
          <Star size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
          <Star size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}