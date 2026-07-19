"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditNotices() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [newNotice, setNewNotice] = useState({ text: "", link: "#" });

  useEffect(() => {
    fetch("/api/notices")
      .then(res => res.json())
      .then(res => {
        if (res.success) setNotices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const notice of notices) {
        await fetch("/api/notices", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notice),
        });
      }
      alert("✅ Notices updated successfully!");
      router.push("/");
    } catch (error) {
      alert("❌ Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addNotice = async () => {
    if (!newNotice.text.trim()) return;
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });
      const data = await res.json();
      if (data.success) {
        setNotices([...notices, data.data]);
        setNewNotice({ text: "", link: "#" });
      }
    } catch (error) {
      alert("Failed to add notice");
    }
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
      setNotices(notices.filter(n => n._id !== id));
    } catch (error) {
      alert("Failed to delete notice");
    }
  };

  const toggleNotice = async (id: string, isActive: boolean) => {
    const notice = notices.find(n => n._id === id);
    if (!notice) return;
    try {
      await fetch("/api/notices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...notice, isActive: !isActive }),
      });
      setNotices(notices.map(n => n._id === id ? { ...n, isActive: !isActive } : n));
    } catch (error) {
      alert("Failed to toggle notice");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Notices</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0B2447] mb-4">📢 Add New Notice</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newNotice.text}
                onChange={(e) => setNewNotice({ ...newNotice, text: e.target.value })}
                placeholder="Notice text..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newNotice.link}
                onChange={(e) => setNewNotice({ ...newNotice, link: e.target.value })}
                placeholder="Link (optional)"
                className="w-48 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={addNotice}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Add
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#0B2447] mb-3">Existing Notices</h3>
              <div className="space-y-2">
                {notices.map((notice) => (
                  <div key={notice._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleNotice(notice._id, notice.isActive)}
                        className={`w-3 h-3 rounded-full ${notice.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                      <span className={`${notice.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                        {notice.text}
                      </span>
                      {notice.link && notice.link !== '#' && (
                        <a href={notice.link} target="_blank" className="text-xs text-[#D4AF37]">🔗</a>
                      )}
                    </div>
                    <button
                      onClick={() => deleteNotice(notice._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {notices.length === 0 && (
                  <p className="text-gray-400 text-sm">No notices added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}