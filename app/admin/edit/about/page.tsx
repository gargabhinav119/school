"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditAbout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/about")
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
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/about-us");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit About Us</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Principal */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0B2447] mb-4">👩‍🏫 Principal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={data.principalName || ""}
                    onChange={(e) => setData({...data, principalName: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={data.principalPhoto || ""}
                    onChange={(e) => setData({...data, principalPhoto: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={data.principalDesignation || ""}
                    onChange={(e) => setData({...data, principalDesignation: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={data.principalMessage || ""}
                    onChange={(e) => setData({...data, principalMessage: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                {/* ✅ NEW - Experience Tag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Tag</label>
                  <input
                    type="text"
                    value={data.principalExperience || ""}
                    onChange={(e) => setData({...data, principalExperience: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="e.g., 25+ years of excellence in education"
                  />
                </div>
              </div>
            </div>

            {/* Chairman */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0B2447] mb-4">👨‍💼 Chairman</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={data.chairmanName || ""}
                    onChange={(e) => setData({...data, chairmanName: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={data.chairmanPhoto || ""}
                    onChange={(e) => setData({...data, chairmanPhoto: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={data.chairmanDesignation || ""}
                    onChange={(e) => setData({...data, chairmanDesignation: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={data.chairmanMessage || ""}
                    onChange={(e) => setData({...data, chairmanMessage: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                {/* ✅ NEW - Experience Tag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Tag</label>
                  <input
                    type="text"
                    value={data.chairmanExperience || ""}
                    onChange={(e) => setData({...data, chairmanExperience: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="e.g., Building a legacy of educational excellence"
                  />
                </div>
              </div>
            </div>

            {/* MD */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0B2447] mb-4">👨‍💻 Managing Director</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={data.mdName || ""}
                    onChange={(e) => setData({...data, mdName: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={data.mdPhoto || ""}
                    onChange={(e) => setData({...data, mdPhoto: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={data.mdDesignation || ""}
                    onChange={(e) => setData({...data, mdDesignation: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={data.mdMessage || ""}
                    onChange={(e) => setData({...data, mdMessage: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                {/* ✅ NEW - Experience Tag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Tag</label>
                  <input
                    type="text"
                    value={data.mdExperience || ""}
                    onChange={(e) => setData({...data, mdExperience: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="e.g., Driving innovation in education since 2011"
                  />
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0B2447] mb-4">🎯 Mission & Vision</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vision Items (comma separated)</label>
                  <input
                    type="text"
                    value={(data.visionItems || []).join(", ")}
                    onChange={(e) => setData({...data, visionItems: e.target.value.split(",").map(s => s.trim())})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Academic Excellence, Holistic Development, ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Items (comma separated)</label>
                  <input
                    type="text"
                    value={(data.missionItems || []).join(", ")}
                    onChange={(e) => setData({...data, missionItems: e.target.value.split(",").map(s => s.trim())})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Quality Education, Safe Environment, ..."
                  />
                </div>
              </div>
            </div>

            {/* Motto */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-[#0B2447] mb-4">🏛️ School Motto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motto</label>
                  <input
                    type="text"
                    value={data.motto || ""}
                    onChange={(e) => setData({...data, motto: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={data.mottoDescription || ""}
                    onChange={(e) => setData({...data, mottoDescription: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
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