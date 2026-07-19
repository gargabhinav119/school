"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditAcademics() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/academics")
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
      const res = await fetch("/api/academics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/academics");
      } else {
        alert("❌ Failed to save changes");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Academics</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Admission Section */}
            <Section title="📋 Admission Section">
              <Input label="Title" value={data.admissionTitle} onChange={(v) => setData({...data, admissionTitle: v})} />
              <Textarea label="Description" value={data.admissionDescription} onChange={(v) => setData({...data, admissionDescription: v})} rows={2} />
              <Input label="Apply Button Text" value={data.applyBtnText} onChange={(v) => setData({...data, applyBtnText: v})} />
              
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Admission Steps</h3>
                <ArrayObjectInput 
                  label="Steps" 
                  value={data.admissionSteps} 
                  onChange={(v) => setData({...data, admissionSteps: v})}
                  fields={[
                    { key: "icon", placeholder: "Icon Name (FileText/Calendar/CheckCircle/Award)", type: "text" },
                    { key: "label", placeholder: "Label", type: "text" },
                    { key: "desc", placeholder: "Description", type: "text" },
                  ]}
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Required Documents</h3>
                <ArrayInput 
                  label="Documents" 
                  value={data.documents} 
                  onChange={(v) => setData({...data, documents: v})}
                />
              </div>
            </Section>

            {/* Quick Info */}
            <Section title="ℹ️ Quick Info">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Session" value={data.session} onChange={(v) => setData({...data, session: v})} />
                <Input label="Classes Offered" value={data.classes} onChange={(v) => setData({...data, classes: v})} />
                <Input label="Student-Teacher Ratio" value={data.ratio} onChange={(v) => setData({...data, ratio: v})} />
                <Input label="Board" value={data.board} onChange={(v) => setData({...data, board: v})} />
                <Input label="Helpline" value={data.helpline} onChange={(v) => setData({...data, helpline: v})} />
              </div>
            </Section>

            {/* Staff Section */}
            <Section title="👨‍🏫 Staff Section">
              <Input label="Title" value={data.staffTitle} onChange={(v) => setData({...data, staffTitle: v})} />
              <Textarea label="Description" value={data.staffDescription} onChange={(v) => setData({...data, staffDescription: v})} rows={2} />
              
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Staff Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Teachers" value={data.staffStats?.teachers} onChange={(v) => setData({...data, staffStats: {...data.staffStats, teachers: v}})} />
                  <Input label="Departments" value={data.staffStats?.departments} onChange={(v) => setData({...data, staffStats: {...data.staffStats, departments: v}})} />
                  <Input label="Avg Experience" value={data.staffStats?.experience} onChange={(v) => setData({...data, staffStats: {...data.staffStats, experience: v}})} />
                  <Input label="Qualified %" value={data.staffStats?.qualified} onChange={(v) => setData({...data, staffStats: {...data.staffStats, qualified: v}})} />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Staff Tags</h3>
                <ArrayInput 
                  label="Tags" 
                  value={data.staffTags} 
                  onChange={(v) => setData({...data, staffTags: v})}
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Teachers List</h3>
                <ArrayObjectInput 
                  label="Teachers" 
                  value={data.teachers} 
                  onChange={(v) => setData({...data, teachers: v})}
                  fields={[
                    { key: "name", placeholder: "Name", type: "text" },
                    { key: "subject", placeholder: "Subject", type: "text" },
                    { key: "designation", placeholder: "Designation", type: "text" },
                    { key: "photo", placeholder: "Photo URL", type: "text" },
                    { key: "qualification", placeholder: "Qualification", type: "text" },
                    { key: "experience", placeholder: "Experience", type: "text" },
                  ]}
                />
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

function Textarea({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        rows={rows}
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