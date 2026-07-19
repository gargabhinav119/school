"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditMandatory() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/mandatory")
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/mandatory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/mandatory-disclosure");
      } else {
        const error = await res.json();
        alert("❌ Failed to save: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      alert("❌ Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <TopNavbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavbar />
      <main className="pt-24 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Mandatory Disclosure</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            
            {/* ===== A: GENERAL INFORMATION ===== */}
            <Section title="A: GENERAL INFORMATION">
              <ArrayObjectInput 
                label="Info Items" 
                value={data.generalInfo} 
                onChange={(v) => setData({...data, generalInfo: v})}
                fields={[
                  { key: "label", placeholder: "Label", type: "text" },
                  { key: "value", placeholder: "Value", type: "text" },
                ]}
              />
            </Section>

            {/* ===== B: DOCUMENTS & INFORMATION (FIXED) ===== */}
            <Section title="B: DOCUMENTS & INFORMATION">
              <div className="space-y-4">
                {(data.documents || []).map((doc: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                        <input
                          type="text"
                          value={doc.label || ""}
                          onChange={(e) => {
                            const newDocs = [...(data.documents || [])];
                            newDocs[index] = { ...newDocs[index], label: e.target.value };
                            setData({...data, documents: newDocs});
                          }}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Link (URL)</label>
                        <input
                          type="text"
                          value={doc.fileUrl || ""}
                          onChange={(e) => {
                            const newDocs = [...(data.documents || [])];
                            newDocs[index] = { ...newDocs[index], fileUrl: e.target.value };
                            setData({...data, documents: newDocs});
                          }}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newDocs = [...(data.documents || [])];
                        newDocs.splice(index, 1);
                        setData({...data, documents: newDocs});
                      }}
                      className="mt-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newDocs = [...(data.documents || []), { label: "", fileUrl: "" }];
                    setData({...data, documents: newDocs});
                  }}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  + Add Document
                </button>
              </div>
            </Section>

            {/* ===== C: RESULT AND ACADEMICS ===== */}
            <Section title="C: RESULT AND ACADEMICS">
              {/* Academics Documents */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">📋 Academics Documents</h3>
                <p className="text-xs text-gray-400 mb-3">S.NO. | DOCUMENTS/INFORMATION | LINK</p>
                <div className="space-y-3">
                  {(data.academicsDocs || []).map((doc: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={doc.name || ""}
                        onChange={(e) => {
                          const newDocs = [...(data.academicsDocs || [])];
                          newDocs[index] = { ...newDocs[index], name: e.target.value };
                          setData({...data, academicsDocs: newDocs});
                        }}
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                        placeholder="Document Name"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={doc.link || ""}
                          onChange={(e) => {
                            const newDocs = [...(data.academicsDocs || [])];
                            newDocs[index] = { ...newDocs[index], link: e.target.value };
                            setData({...data, academicsDocs: newDocs});
                          }}
                          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                          placeholder="Document Link (URL)"
                        />
                        <button
                          onClick={() => {
                            const newDocs = [...(data.academicsDocs || [])];
                            newDocs.splice(index, 1);
                            setData({...data, academicsDocs: newDocs});
                          }}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newDocs = [...(data.academicsDocs || []), { name: "", link: "" }];
                      setData({...data, academicsDocs: newDocs});
                    }}
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                  >
                    + Add Document
                  </button>
                </div>
              </div>

              {/* Class X Results */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-3">📊 Class X Results</h3>
                <Input label="Title" value={data.classXTitle} onChange={(v) => setData({...data, classXTitle: v})} />
                <Input label="Years Label" value={data.classXYears} onChange={(v) => setData({...data, classXYears: v})} />
                <ArrayObjectInput 
                  label="Class X Results Data" 
                  value={data.classXResults} 
                  onChange={(v) => setData({...data, classXResults: v})}
                  fields={[
                    { key: "year", placeholder: "Year", type: "text" },
                    { key: "registered", placeholder: "Registered", type: "text" },
                    { key: "passed", placeholder: "Passed", type: "text" },
                    { key: "percentage", placeholder: "Percentage", type: "text" },
                    { key: "remarks", placeholder: "Remarks", type: "text" },
                  ]}
                />
              </div>

              {/* Class XII Results */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-3">📊 Class XII Results</h3>
                <Input label="Title" value={data.classXIITitle} onChange={(v) => setData({...data, classXIITitle: v})} />
                <Input label="Years Label" value={data.classXIIYears} onChange={(v) => setData({...data, classXIIYears: v})} />
                <ArrayObjectInput 
                  label="Class XII Results Data" 
                  value={data.classXIIResults} 
                  onChange={(v) => setData({...data, classXIIResults: v})}
                  fields={[
                    { key: "year", placeholder: "Year", type: "text" },
                    { key: "registered", placeholder: "Registered", type: "text" },
                    { key: "passed", placeholder: "Passed", type: "text" },
                    { key: "percentage", placeholder: "Percentage", type: "text" },
                    { key: "remarks", placeholder: "Remarks", type: "text" },
                  ]}
                />
              </div>
            </Section>

            {/* ===== D: STAFF ===== */}
            <Section title="D: STAFF (TEACHING)">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Principal" value={data.staffData?.principal} onChange={(v) => setData({...data, staffData: {...data.staffData, principal: v}})} />
                <Input label="Total Teachers" value={data.staffData?.totalTeachers} onChange={(v) => setData({...data, staffData: {...data.staffData, totalTeachers: v}})} />
                <Input label="PGT Teachers" value={data.staffData?.pgtTeachers} onChange={(v) => setData({...data, staffData: {...data.staffData, pgtTeachers: v}})} />
                <Input label="TGT Teachers" value={data.staffData?.tgtTeachers} onChange={(v) => setData({...data, staffData: {...data.staffData, tgtTeachers: v}})} />
                <Input label="PRT Teachers" value={data.staffData?.prtTeachers} onChange={(v) => setData({...data, staffData: {...data.staffData, prtTeachers: v}})} />
                <Input label="Special Educator" value={data.staffData?.specialEducator} onChange={(v) => setData({...data, staffData: {...data.staffData, specialEducator: v}})} />
                <Input label="Counsellor" value={data.staffData?.counsellor} onChange={(v) => setData({...data, staffData: {...data.staffData, counsellor: v}})} />
                <Input label="Teacher Ratio" value={data.staffData?.teacherRatio} onChange={(v) => setData({...data, staffData: {...data.staffData, teacherRatio: v}})} />
              </div>
            </Section>

            {/* ===== E: INFRASTRUCTURE ===== */}
            <Section title="E: SCHOOL INFRASTRUCTURE">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Campus Area" value={data.infrastructureData?.campusArea} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, campusArea: v}})} />
                <Input label="Classrooms" value={data.infrastructureData?.classrooms} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, classrooms: v}})} />
                <Input label="Physics Lab" value={data.infrastructureData?.physicsLab} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, physicsLab: v}})} />
                <Input label="Chemistry Lab" value={data.infrastructureData?.chemistryLab} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, chemistryLab: v}})} />
                <Input label="Biology Lab" value={data.infrastructureData?.biologyLab} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, biologyLab: v}})} />
                <Input label="Computer Lab" value={data.infrastructureData?.computerLab} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, computerLab: v}})} />
                <Input label="Maths Lab" value={data.infrastructureData?.mathsLab} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, mathsLab: v}})} />
                <Input label="Internet" value={data.infrastructureData?.internet} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, internet: v}})} />
                <Input label="Girls Toilets" value={data.infrastructureData?.girlsToilets} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, girlsToilets: v}})} />
                <Input label="Boys Toilets" value={data.infrastructureData?.boysToilets} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, boysToilets: v}})} />
                <Input label="Inspection Video URL" value={data.infrastructureData?.inspectionVideo} onChange={(v) => setData({...data, infrastructureData: {...data.infrastructureData, inspectionVideo: v}})} />
              </div>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-[#0B2447] mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
      />
    </div>
  );
}

function ArrayInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [newItem, setNewItem] = useState("");
  
  const addItem = () => {
    if (newItem.trim()) {
      onChange([...(value || []), newItem.trim()]);
      setNewItem("");
    }
  };
  
  const removeItem = (index: number) => {
    const newList = [...(value || [])];
    newList.splice(index, 1);
    onChange(newList);
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
          placeholder="Add new item..."
        />
        <button
          onClick={addItem}
          className="bg-[#D4AF37] text-[#0B2447] px-4 py-2 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(value || []).map((item: string, index: number) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {item}
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ArrayObjectInput({ label, value, onChange, fields }: { label: string; value: any[]; onChange: (v: any[]) => void; fields: any[] }) {
  const [newItem, setNewItem] = useState<any>({});
  
  const addItem = () => {
    const hasValue = fields.some(f => newItem[f.key]?.trim());
    if (hasValue) {
      onChange([...(value || []), newItem]);
      setNewItem({});
    }
  };
  
  const removeItem = (index: number) => {
    const newList = [...(value || [])];
    newList.splice(index, 1);
    onChange(newList);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex flex-wrap gap-2 mb-2">
        {fields.map((field) => (
          <input
            key={field.key}
            type="text"
            value={newItem[field.key] || ""}
            onChange={(e) => setNewItem({...newItem, [field.key]: e.target.value})}
            className="flex-1 min-w-[120px] border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            placeholder={field.placeholder}
          />
        ))}
        <button
          onClick={addItem}
          className="bg-[#D4AF37] text-[#0B2447] px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-[#D4AF37]/90 transition-all"
        >
          Add
        </button>
      </div>
      <div className="space-y-1">
        {(value || []).map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
            <span className="truncate">
              {fields.map(f => item[f.key]).filter(Boolean).join(" | ")}
            </span>
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 ml-2">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}