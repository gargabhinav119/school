"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
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
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Settings saved successfully!");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Top Bar Settings</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Contact Information */}
            <Section title="📞 Contact Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Phone Number" value={data.phone} onChange={(v) => setData({...data, phone: v})} />
                <Input label="Email" value={data.email} onChange={(v) => setData({...data, email: v})} />
                <Input label="Address" value={data.address} onChange={(v) => setData({...data, address: v})} />
              </div>
            </Section>

            {/* Social Media */}
            <Section title="🌐 Social Media Links">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Facebook" value={data.facebook} onChange={(v) => setData({...data, facebook: v})} />
                <Input label="Instagram" value={data.instagram} onChange={(v) => setData({...data, instagram: v})} />
                <Input label="YouTube" value={data.youtube} onChange={(v) => setData({...data, youtube: v})} />
                <Input label="Twitter" value={data.twitter} onChange={(v) => setData({...data, twitter: v})} />
              </div>
            </Section>

            {/* Other Settings */}
            <Section title="⚙️ Other Settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="ERP Login Link" value={data.erpLink} onChange={(v) => setData({...data, erpLink: v})} />
                <Input label="Admissions Text" value={data.admissionText} onChange={(v) => setData({...data, admissionText: v})} />
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