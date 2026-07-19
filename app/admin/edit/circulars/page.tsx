"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditCirculars() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/circulars")
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
      const res = await fetch("/api/circulars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/circulars");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Circulars</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Holidays Section */}
            <Section title="📅 Holidays">
              <Input label="Title" value={data.holidaysTitle} onChange={(v) => setData({...data, holidaysTitle: v})} />
              <Textarea label="Description" value={data.holidaysDescription} onChange={(v) => setData({...data, holidaysDescription: v})} rows={2} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Total Holidays" value={data.holidaysStats?.total} onChange={(v) => setData({...data, holidaysStats: {...data.holidaysStats, total: v}})} />
                <Input label="Months" value={data.holidaysStats?.months} onChange={(v) => setData({...data, holidaysStats: {...data.holidaysStats, months: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.holidaysTags} onChange={(v) => setData({...data, holidaysTags: v})} />
              
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Holidays List</h3>
                <ArrayObjectInput 
                  label="Holidays" 
                  value={data.holidays} 
                  onChange={(v) => setData({...data, holidays: v})}
                  fields={[
                    { key: "month", placeholder: "Month", type: "text" },
                    { key: "date", placeholder: "Date (e.g., 26 Jan)", type: "text" },
                    { key: "name", placeholder: "Holiday Name", type: "text" },
                    { key: "color", placeholder: "Color (e.g., from-orange-400 to-orange-500)", type: "text" },
                  ]}
                />
              </div>
            </Section>

            {/* Notices Section */}
            <Section title="🔔 Notices">
              <Input label="Title" value={data.noticesTitle} onChange={(v) => setData({...data, noticesTitle: v})} />
              <Textarea label="Description" value={data.noticesDescription} onChange={(v) => setData({...data, noticesDescription: v})} rows={2} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Active Notices" value={data.noticesStats?.active} onChange={(v) => setData({...data, noticesStats: {...data.noticesStats, active: v}})} />
                <Input label="Updates" value={data.noticesStats?.updates} onChange={(v) => setData({...data, noticesStats: {...data.noticesStats, updates: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.noticesTags} onChange={(v) => setData({...data, noticesTags: v})} />
              
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0B2447] mb-2">Notices List</h3>
                <ArrayObjectInput 
                  label="Notices" 
                  value={data.notices} 
                  onChange={(v) => setData({...data, notices: v})}
                  fields={[
                    { key: "title", placeholder: "Notice Title", type: "text" },
                    { key: "date", placeholder: "Date (e.g., 15 Jan 2026)", type: "text" },
                    { key: "description", placeholder: "Description", type: "textarea" },
                    { key: "type", placeholder: "Type (Important/Event/Meeting/Update)", type: "text" },
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

// Helper Components
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
    if (newItem.title || newItem.name || newItem.month) {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
        {fields.map((field) => (
          <input
            key={field.key}
            type={field.type === "textarea" ? "text" : "text"}
            value={newItem[field.key] || ""}
            onChange={(e) => setNewItem({...newItem, [field.key]: e.target.value})}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            placeholder={field.placeholder}
          />
        ))}
        <button
          onClick={addItem}
          className="bg-[#D4AF37] text-[#0B2447] px-4 py-1.5 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all text-sm"
        >
          Add
        </button>
      </div>
      <div className="space-y-1">
        {(value || []).map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
            <span>{fields.map(f => item[f.key]).filter(Boolean).join(" - ")}</span>
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}