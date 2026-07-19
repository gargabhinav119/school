"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/home")
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
      const res = await fetch("/api/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Home page updated successfully!");
        router.push("/");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Home Page</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Hero Text Section */}
            <Section title="🏠 Hero Section">
              <Input label="School Name" value={data.schoolName} onChange={(v) => setData({...data, schoolName: v})} />
              <Input label="School Sub Name" value={data.schoolSubName} onChange={(v) => setData({...data, schoolSubName: v})} />
              <Input label="Tagline" value={data.tagline} onChange={(v) => setData({...data, tagline: v})} />
              <Input label="Main Message" value={data.mainMessage} onChange={(v) => setData({...data, mainMessage: v})} />
              <Input label="Admission Text" value={data.admissionText} onChange={(v) => setData({...data, admissionText: v})} />
              <Input label="Apply Button Text" value={data.applyBtnText} onChange={(v) => setData({...data, applyBtnText: v})} />
              <Input label="Visit Button Text" value={data.visitBtnText} onChange={(v) => setData({...data, visitBtnText: v})} />
            </Section>

            {/* Video Section */}
            <Section title="🎬 Video Background">
              <Input label="Video URL" value={data.videoUrl} onChange={(v) => setData({...data, videoUrl: v})} />
              <Input label="Poster Image URL" value={data.posterUrl} onChange={(v) => setData({...data, posterUrl: v})} />
            </Section>

            {/* Stats Section */}
            <Section title="📊 Stats">
              <ArrayObjectInput 
                label="Stats" 
                value={data.stats} 
                onChange={(v) => setData({...data, stats: v})}
                fields={[
                  { key: "value", placeholder: "Value (e.g., 12+)", type: "text" },
                  { key: "label", placeholder: "Label (e.g., Years of Excellence)", type: "text" },
                ]}
              />
            </Section>

            {/* Right Images Section */}
            <Section title="🖼️ Right Side Images">
              <ArrayObjectInput 
                label="Images" 
                value={data.images} 
                onChange={(v) => setData({...data, images: v})}
                fields={[
                  { key: "url", placeholder: "Image URL", type: "text" },
                  { key: "caption", placeholder: "Caption (e.g., 🏫 Our Campus)", type: "text" },
                  { key: "alt", placeholder: "Alt Text", type: "text" },
                ]}
              />
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