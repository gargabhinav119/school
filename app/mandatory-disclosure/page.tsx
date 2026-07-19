"use client";
import { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useAdmin } from "@/app/context/AdminContext";
import Link from "next/link";
import { 
  ChevronDown, ChevronUp, Building, FileText, Award, Users, GraduationCap,
  Phone, Mail, MapPin, Eye, School, User, Monitor, Wifi, Droplet,
  Video, UserCheck, FlaskRound, Library, Home, Heart, Edit
} from "lucide-react";

export default function MandatoryDisclosure() {
  const { isAdmin } = useAdmin();
  const [openSection, setOpenSection] = useState<number>(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "general", label: "General Information", icon: Building },
    { id: "documents", label: "Documents & Information", icon: FileText },
    { id: "results", label: "Results & Academics", icon: Award },
    { id: "staff", label: "Staff (Teaching)", icon: Users },
    { id: "infrastructure", label: "School Infrastructure", icon: School },
  ];

  useEffect(() => {
    fetch("/api/mandatory")
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
        <main className="pt-20 md:pt-24 bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

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
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Transparency</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Mandatory <span className="text-[#D4AF37]">Public Disclosure</span>
            </h1>
            <p className="text-[#D6D6D6] text-sm font-light mt-1 max-w-2xl mx-auto">
              Appendix – IX · CBSE required information for parents and stakeholders
            </p>
          </div>
        </section>

        {/* Navigation Pills */}
        <section className="bg-white/80 backdrop-blur-sm border-b border-[#F8FAFC] sticky top-[72px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto py-2 gap-1.5 scrollbar-hide">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = openSection === index;
                return (
                  <button
                    key={section.id}
                    onClick={() => setOpenSection(index)}
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
        <div className="py-4">
          <div className="max-w-6xl mx-auto px-4">
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/admin/edit/mandatory"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit size={16} /> Edit Mandatory
                </Link>
              </div>
            )}
            {openSection === 0 && <GeneralInformation data={data} />}
            {openSection === 1 && <DocumentsSection data={data} />}
            {openSection === 2 && <ResultsSection data={data} />}
            {openSection === 3 && <StaffSection data={data} />}
            {openSection === 4 && <InfrastructureSection data={data} />}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// ============================================================
// SECTION 1: GENERAL INFORMATION
// ============================================================
function GeneralInformation({ data }: { data: any }) {
  const info = data?.generalInfo || [
    { label: "Name of the School", value: "Agrasen Public School" },
    { label: "Affiliation No.", value: "531056" },
    { label: "School Code", value: "41078" },
    { label: "Complete Address with Pin Code", value: "3.5Km. Punhana Road, Hodal, Palwal, Haryana, 121106" },
    { label: "Principal Name & Qualification", value: "Deepika Choudhary" },
    { label: "School Email ID", value: "apshodal@gmail.com" },
    { label: "Contact Details", value: "08684946946" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <Building size={18} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B2447]">A: General Information</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">S.No.</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Information</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Details</th>
              </tr>
            </thead>
            <tbody>
              {info.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 text-[11px] text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">{item.label}</td>
                  <td className="px-4 py-2.5 text-[11px] text-gray-600">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gradient-to-r from-[#0B2447] to-[#19376D] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white"><Phone size={14} className="text-[#D4AF37]" /><span className="text-xs">08684946946</span></div>
          <div className="flex items-center gap-2 text-white"><Mail size={14} className="text-[#D4AF37]" /><span className="text-xs">apshodal@gmail.com</span></div>
          <div className="flex items-center gap-2 text-white"><MapPin size={14} className="text-[#D4AF37]" /><span className="text-xs">Palwal, Haryana</span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 2: DOCUMENTS & INFORMATION (FIXED - No N/A, Only Link)
// ============================================================
function DocumentsSection({ data }: { data: any }) {
  const documents = data?.documents || [
    { label: "Copies of Affiliation/Upgradation Letter", fileUrl: "#" },
    { label: "Copies of Societies/Trust/Company Registration", fileUrl: "#" },
    { label: "Copy of No Objection Certificate (NOC)", fileUrl: "#" },
    { label: "Copies of Recognition Certificate under RTE Act", fileUrl: "#" },
    { label: "Copy of Valid Building Safety Certificate", fileUrl: "#" },
    { label: "Copy of Valid Fire Safety Certificate", fileUrl: "#" },
    { label: "Copy of DEO Certificate", fileUrl: "#" },
    { label: "Copies of Valid Water, Health and Sanitation Certificates", fileUrl: "#" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <FileText size={18} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B2447]">B: Documents and Information</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">S.No.</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Documents/Information</th>
                <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-500">Documents</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc: any, index: number) => {
                const hasValidLink = doc.fileUrl && doc.fileUrl !== "#" && doc.fileUrl !== "";
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 text-[11px] text-gray-500">{index + 1}</td>
                    <td className="px-4 py-2.5 text-[11px] text-gray-600">{doc.label}</td>
                    <td className="px-4 py-2.5 text-center">
                      {hasValidLink ? (
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#D4AF37] hover:text-[#D4AF37]/70 transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <Eye size={14} /> View
                        </a>
                      ) : (
                        <span className="text-[11px] text-gray-400">No Link</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 3: RESULTS & ACADEMICS
// ============================================================
function ResultsSection({ data }: { data: any }) {
  const [showClassX, setShowClassX] = useState(true);
  const [showClassXII, setShowClassXII] = useState(false);

  const classXResults = data?.classXResults || [
    { year: "2017", registered: 31, passed: 31, percentage: "100", remarks: "Nil" },
    { year: "2018", registered: 51, passed: 37, percentage: "72.55", remarks: "Nil" },
    { year: "2019", registered: 52, passed: 46, percentage: "88.46", remarks: "Nil" },
    { year: "2020", registered: 62, passed: 61, percentage: "98.39", remarks: "Nil" },
    { year: "2021", registered: 71, passed: 71, percentage: "100", remarks: "Nil" },
  ];

  const classXIIResults = data?.classXIIResults || [
    { year: "2017", registered: 19, passed: 12, percentage: "63.16", remarks: "NA" },
    { year: "2018", registered: 24, passed: 18, percentage: "75", remarks: "NA" },
    { year: "2019", registered: 16, passed: 12, percentage: "75", remarks: "NA" },
    { year: "2020", registered: 38, passed: 38, percentage: "100", remarks: "NA" },
  ];

  const academicsDocs = data?.academicsDocs || [
    { name: "Fee Structure of the School", link: "#" },
    { name: "Annual Academic Calander", link: "#" },
    { name: "List of School Management Committee (SMC)", link: "#" },
    { name: "List of Parents Teachers Association (PTA) Members", link: "#" },
    { name: "Last Three-Year Result of the Board Examination as per Applicability", link: "#" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <Award size={18} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B2447]">C: Result and Academics</h2>
        </div>

        {/* Academics Documents */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">S.No.</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Documents/Information</th>
                <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-500">Documents</th>
              </tr>
            </thead>
            <tbody>
              {academicsDocs.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 text-[11px] text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2.5 text-[11px] text-gray-600">{item.name}</td>
                  <td className="px-4 py-2.5 text-center">
                    <a 
                      href={item.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#D4AF37] hover:text-[#D4AF37]/70 transition-colors font-medium flex items-center justify-center gap-1"
                    >
                      <Eye size={14} /> View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Class X Results */}
        <div className="mb-4">
          <button
            onClick={() => setShowClassX(!showClassX)}
            className="w-full flex items-center justify-between bg-[#0B2447] rounded-xl px-4 py-2 hover:bg-[#19376D] transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-[#D4AF37]" />
              <span className="text-white font-semibold text-sm">Result Class: X</span>
            </div>
            {showClassX ? <ChevronUp size={16} className="text-[#D4AF37]" /> : <ChevronDown size={16} className="text-[#D4AF37]" />}
          </button>
          
          {showClassX && (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-[9px] font-semibold text-gray-500">S.No.</th>
                    <th className="px-3 py-2 text-left text-[9px] font-semibold text-gray-500">Year</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">No. of Registered Students</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">No. of Students Passed</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">Pass Percentage</th>
                    <th className="px-3 py-2 text-right text-[9px] font-semibold text-gray-500">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {classXResults.map((result: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 text-[10px] text-gray-500">{index + 1}</td>
                      <td className="px-3 py-2 text-[10px] font-semibold text-[#0B2447]">{result.year}</td>
                      <td className="px-3 py-2 text-center text-[10px] text-gray-600">{result.registered}</td>
                      <td className="px-3 py-2 text-center text-[10px] text-gray-600">{result.passed}</td>
                      <td className={`px-3 py-2 text-center text-[10px] font-semibold ${parseFloat(result.percentage) >= 90 ? 'text-green-500' : 'text-[#D4AF37]'}`}>
                        {result.percentage}%
                      </td>
                      <td className="px-3 py-2 text-right text-[9px] text-gray-400">{result.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Class XII Results */}
        <div>
          <button
            onClick={() => setShowClassXII(!showClassXII)}
            className="w-full flex items-center justify-between bg-[#0B2447] rounded-xl px-4 py-2 hover:bg-[#19376D] transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-[#D4AF37]" />
              <span className="text-white font-semibold text-sm">Result Class: XII</span>
            </div>
            {showClassXII ? <ChevronUp size={16} className="text-[#D4AF37]" /> : <ChevronDown size={16} className="text-[#D4AF37]" />}
          </button>
          
          {showClassXII && (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-[9px] font-semibold text-gray-500">S.No.</th>
                    <th className="px-3 py-2 text-left text-[9px] font-semibold text-gray-500">Year</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">No. of Registered Students</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">No. of Students Passed</th>
                    <th className="px-3 py-2 text-center text-[9px] font-semibold text-gray-500">Pass Percentage</th>
                    <th className="px-3 py-2 text-right text-[9px] font-semibold text-gray-500">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {classXIIResults.map((result: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 text-[10px] text-gray-500">{index + 1}</td>
                      <td className="px-3 py-2 text-[10px] font-semibold text-[#0B2447]">{result.year}</td>
                      <td className="px-3 py-2 text-center text-[10px] text-gray-600">{result.registered}</td>
                      <td className="px-3 py-2 text-center text-[10px] text-gray-600">{result.passed}</td>
                      <td className={`px-3 py-2 text-center text-[10px] font-semibold ${parseFloat(result.percentage) >= 90 ? 'text-green-500' : 'text-[#D4AF37]'}`}>
                        {result.percentage}%
                      </td>
                      <td className="px-3 py-2 text-right text-[9px] text-gray-400">{result.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 4: STAFF (TEACHING)
// ============================================================
function StaffSection({ data }: { data: any }) {
  const staff = data?.staffData || {
    principal: 1,
    totalTeachers: 40,
    pgtTeachers: 12,
    tgtTeachers: 11,
    prtTeachers: 15,
    specialEducator: 1,
    counsellor: 1,
    teacherRatio: '1.5',
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <Users size={18} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B2447]">D: Staff (Teaching)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">S.No.</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Information</th>
                <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-500">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">1</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Principal</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{staff.principal}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">2</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Total No. of Teachers</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">
                  <div className="flex justify-center gap-2">
                    <span className="font-semibold text-[#D4AF37]">PGT: {staff.pgtTeachers}</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-semibold text-[#D4AF37]">TGT: {staff.tgtTeachers}</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-semibold text-[#D4AF37]">PRT: {staff.prtTeachers}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Total: {staff.totalTeachers}</div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">3</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Teachers Section Ratio</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{staff.teacherRatio}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">4</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Details of Special Educator</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{staff.specialEducator}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">5</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Details of Counsellor and Wellness Teacher</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{staff.counsellor}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-xl p-3 border border-[#D4AF37]/20 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div><span className="text-[9px] text-gray-600">Total Teaching Staff: <strong className="text-[#0B2447]">{staff.totalTeachers}</strong></span></div>
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div><span className="text-[9px] text-gray-600">Student-Teacher Ratio: <strong className="text-[#0B2447]">30:1</strong></span></div>
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div><span className="text-[9px] text-gray-600">Qualified Staff: <strong className="text-[#0B2447]">100%</strong></span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 5: SCHOOL INFRASTRUCTURE
// ============================================================
function InfrastructureSection({ data }: { data: any }) {
  const infra = data?.infrastructureData || {
    campusArea: '8603 Sq.mts.',
    classrooms: '45 Classrooms with 46.5 Sq.mts. each',
    physicsLab: '71 Sq.mts.',
    chemistryLab: '93 Sq.mts.',
    biologyLab: '47 Sq.mts.',
    mathsLab: '47 Sq.mts.',
    computerLab: '101 Sq.mts.',
    internet: 'Yes',
    girlsToilets: '12',
    boysToilets: '12',
    inspectionVideo: 'https://youtu.be/5VVvEBqgqFc',
  };

  const labDetails = `Physics Lab-${infra.physicsLab}, Chemistry Lab-${infra.chemistryLab}, Biology Lab-${infra.biologyLab}, Maths Lab-${infra.mathsLab} and Computer Science Lab with ${infra.computerLab}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100/50">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <School size={18} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B2447]">E: School Infrastructure</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">S.No.</th>
                <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-500">Information</th>
                <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-500">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">1</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Total Campus Area of the School (in Square Mtr)</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{infra.campusArea}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">2</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">No. and Size of the Class Rooms (in Sq Mtr)</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{infra.classrooms}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">3</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">No. and Size of Laboratories including Computer Labs (in Sq Mtr)</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{labDetails}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">4</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Internet Facility (Y/N)</td>
                <td className="px-4 py-2.5 text-center text-[11px] font-semibold text-green-500">{infra.internet}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">5</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">No. of Girls Toilets</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{infra.girlsToilets}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">6</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">No. of Boys Toilets</td>
                <td className="px-4 py-2.5 text-center text-[11px] text-gray-600">{infra.boysToilets}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-[11px] text-gray-500">7</td>
                <td className="px-4 py-2.5 text-[11px] font-medium text-[#0B2447]">Video of the Inspection of School covering the Infrastructure of the School</td>
                <td className="px-4 py-2.5 text-center">
                  <a 
                    href={infra.inspectionVideo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#D4AF37] hover:text-[#D4AF37]/70 transition-colors font-medium flex items-center justify-center gap-1"
                  >
                    <Video size={14} /> Watch Video
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gradient-to-r from-[#0B2447] to-[#19376D] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white"><Video size={16} className="text-[#D4AF37]" /><span className="text-xs">School Infrastructure Inspection Video</span></div>
          <a href={infra.inspectionVideo} target="_blank" rel="noopener noreferrer" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="inline"><polygon points="5 3 19 12 5 21 5 3" /></svg> Watch Now
          </a>
        </div>
      </div>
    </div>
  );
}