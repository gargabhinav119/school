"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditContact() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/contact")
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
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/contact-us");
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
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold text-[#0B2447]">Edit Contact Page</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-5 py-1.5 rounded-full text-sm font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* ===== COLUMN 1 ===== */}
            <div className="space-y-4">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h2 className="text-sm font-bold text-[#0B2447] mb-3">📞 Contact Information</h2>
                <div className="grid grid-cols-1 gap-2.5">
                  <Input label="Primary Phone" value={data.phone} onChange={(v) => setData({...data, phone: v})} />
                  <Input label="Secondary Phone" value={data.phoneSecondary} onChange={(v) => setData({...data, phoneSecondary: v})} />
                  <Input label="Primary Email" value={data.email} onChange={(v) => setData({...data, email: v})} />
                  <Input label="Secondary Email" value={data.emailSecondary} onChange={(v) => setData({...data, emailSecondary: v})} />
                  <Input label="Address (Short)" value={data.address} onChange={(v) => setData({...data, address: v})} />
                  <Input label="Address (Full)" value={data.addressFull} onChange={(v) => setData({...data, addressFull: v})} />
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h2 className="text-sm font-bold text-[#0B2447] mb-3">🕐 Working Hours</h2>
                <div className="grid grid-cols-1 gap-2.5">
                  <Input label="Weekdays" value={data.workingHours?.weekdays} onChange={(v) => setData({...data, workingHours: {...data.workingHours, weekdays: v}})} />
                  <Input label="Saturday" value={data.workingHours?.saturday} onChange={(v) => setData({...data, workingHours: {...data.workingHours, saturday: v}})} />
                  <Input label="Sunday" value={data.workingHours?.sunday} onChange={(v) => setData({...data, workingHours: {...data.workingHours, sunday: v}})} />
                </div>
              </div>
            </div>

            {/* ===== COLUMN 2 ===== */}
            <div className="space-y-4">
              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h2 className="text-sm font-bold text-[#0B2447] mb-3">🌐 Social Media</h2>
                <div className="grid grid-cols-1 gap-2.5">
                  <Input label="Facebook" value={data.facebook} onChange={(v) => setData({...data, facebook: v})} />
                  <Input label="Instagram" value={data.instagram} onChange={(v) => setData({...data, instagram: v})} />
                  <Input label="YouTube" value={data.youtube} onChange={(v) => setData({...data, youtube: v})} />
                  <Input label="Twitter" value={data.twitter} onChange={(v) => setData({...data, twitter: v})} />
                  <Input label="WhatsApp" value={data.whatsapp} onChange={(v) => setData({...data, whatsapp: v})} />
                  <Input label="LinkedIn" value={data.linkedin} onChange={(v) => setData({...data, linkedin: v})} />
                </div>
              </div>

              {/* Map Only - No Form */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h2 className="text-sm font-bold text-[#0B2447] mb-3">🗺️ Map</h2>
                <div className="grid grid-cols-1 gap-2.5">
                  <Input label="Map Embed URL" value={data.mapUrl} onChange={(v) => setData({...data, mapUrl: v})} />
                  <p className="text-[9px] text-gray-400 mt-0.5">Get embed URL from Google Maps → Share → Embed Map</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ============================================================
// HELPER COMPONENTS - Compact
// ============================================================

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-gray-600 mb-0.5">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
      />
    </div>
  );
}