"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditFooter() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/footer")
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
      const res = await fetch("/api/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Footer updated successfully!");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Footer</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Brand Section */}
            <Section title="🏷️ Brand Section">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Brand Name" value={data.brandName} onChange={(v) => setData({...data, brandName: v})} />
                <Input label="Brand Tagline" value={data.brandTagline} onChange={(v) => setData({...data, brandTagline: v})} />
                <div className="md:col-span-2">
                  <Input label="Brand Description" value={data.brandDescription} onChange={(v) => setData({...data, brandDescription: v})} />
                </div>
              </div>
            </Section>

            {/* Quick Links */}
            <Section title="🔗 Quick Links">
              <ArrayObjectInput 
                label="Quick Links" 
                value={data.quickLinks} 
                onChange={(v) => setData({...data, quickLinks: v})}
                fields={[
                  { key: "label", placeholder: "Label (e.g., About Us)", type: "text" },
                  { key: "href", placeholder: "URL (e.g., /about-us)", type: "text" },
                ]}
              />
            </Section>

            {/* Admissions Links */}
            <Section title="📋 Admissions Links">
              <ArrayObjectInput 
                label="Admissions Links" 
                value={data.admissionLinks} 
                onChange={(v) => setData({...data, admissionLinks: v})}
                fields={[
                  { key: "label", placeholder: "Label (e.g., Apply Now)", type: "text" },
                  { key: "href", placeholder: "URL (e.g., /admission-query)", type: "text" },
                ]}
              />
            </Section>

            {/* Contact */}
            <Section title="📞 Contact Info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Address" value={data.address} onChange={(v) => setData({...data, address: v})} />
                <Input label="Phone" value={data.phone} onChange={(v) => setData({...data, phone: v})} />
                <Input label="Email" value={data.email} onChange={(v) => setData({...data, email: v})} />
              </div>
            </Section>

            {/* Social Links */}
            <Section title="🌐 Social Links">
              <ArrayObjectInput 
                label="Social Links" 
                value={data.socialLinks} 
                onChange={(v) => setData({...data, socialLinks: v})}
                fields={[
                  { key: "platform", placeholder: "Platform (e.g., Facebook)", type: "text" },
                  { key: "url", placeholder: "URL", type: "text" },
                  { key: "icon", placeholder: "Icon Name (e.g., Facebook)", type: "text" },
                ]}
              />
            </Section>

            {/* Bottom Bar */}
            <Section title="📄 Bottom Bar">
              <div className="grid grid-cols-1 gap-4">
                <Input label="Copyright Text" value={data.copyrightText} onChange={(v) => setData({...data, copyrightText: v})} />
                <ArrayObjectInput 
                  label="Bottom Links" 
                  value={data.bottomLinks} 
                  onChange={(v) => setData({...data, bottomLinks: v})}
                  fields={[
                    { key: "label", placeholder: "Label (e.g., Privacy Policy)", type: "text" },
                    { key: "href", placeholder: "URL (e.g., /privacy-policy)", type: "text" },
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