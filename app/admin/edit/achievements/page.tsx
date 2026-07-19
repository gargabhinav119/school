"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditAchievements() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [newAchievement, setNewAchievement] = useState({ title: "", year: "", icon: "🏆", description: "" });

  useEffect(() => {
    fetch("/api/achievements")
      .then(res => res.json())
      .then(res => {
        if (res.success) setAchievements(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const ach of achievements) {
        await fetch("/api/achievements", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ach),
        });
      }
      alert("✅ Achievements updated successfully!");
      router.push("/");
    } catch (error) {
      alert("❌ Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addAchievement = async () => {
    if (!newAchievement.title.trim()) return;
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAchievement, students: [] }),
      });
      const data = await res.json();
      if (data.success) {
        setAchievements([...achievements, data.data]);
        setNewAchievement({ title: "", year: "", icon: "🏆", description: "" });
      }
    } catch (error) {
      alert("Failed to add achievement");
    }
  };

  const deleteAchievement = async (id: string) => {
    if (!confirm("Delete this achievement category?")) return;
    try {
      await fetch(`/api/achievements?id=${id}`, { method: "DELETE" });
      setAchievements(achievements.filter(a => a._id !== id));
    } catch (error) {
      alert("Failed to delete achievement");
    }
  };

  const addStudent = (achId: string) => {
    const ach = achievements.find(a => a._id === achId);
    if (!ach) return;
    const students = ach.students || [];
    students.push({ name: "", photo: "", rank: students.length + 1 });
    setAchievements(achievements.map(a => a._id === achId ? { ...a, students } : a));
  };

  const updateStudent = (achId: string, index: number, field: string, value: string) => {
    const ach = achievements.find(a => a._id === achId);
    if (!ach) return;
    const students = [...(ach.students || [])];
    students[index] = { ...students[index], [field]: field === 'rank' ? parseInt(value) : value };
    setAchievements(achievements.map(a => a._id === achId ? { ...a, students } : a));
  };

  const removeStudent = (achId: string, index: number) => {
    const ach = achievements.find(a => a._id === achId);
    if (!ach) return;
    const students = [...(ach.students || [])];
    students.splice(index, 1);
    setAchievements(achievements.map(a => a._id === achId ? { ...a, students } : a));
  };

  const updateAchievementField = (achId: string, field: string, value: string) => {
    setAchievements(achievements.map(a => a._id === achId ? { ...a, [field]: value } : a));
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Achievements</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Add New Category */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-[#0B2447] mb-4">🏆 Add New Achievement Category</h2>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                placeholder="Category Title (e.g., IIT JEE Toppers)"
                className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newAchievement.year}
                onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                placeholder="Year (e.g., 2024)"
                className="w-32 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newAchievement.icon}
                onChange={(e) => setNewAchievement({ ...newAchievement, icon: e.target.value })}
                placeholder="Icon (e.g., 🏆)"
                className="w-24 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={addAchievement}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* Achievement Categories */}
          <div className="space-y-6">
            {achievements.map((ach) => (
              <div key={ach._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ach.icon || '🏆'}</span>
                    <h3 className="text-lg font-bold text-[#0B2447]">{ach.title}</h3>
                    <span className="text-sm text-gray-400">({ach.year})</span>
                  </div>
                  <button
                    onClick={() => deleteAchievement(ach._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete Category
                  </button>
                </div>

                {/* ✅ Category Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Description</label>
                  <textarea
                    value={ach.description || ""}
                    onChange={(e) => updateAchievementField(ach._id, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe this achievement program (e.g., Agrasen Public School provides specialized IIT-JEE preparation...)"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Students */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#0B2447]">Students</h4>
                  {(ach.students || []).map((student: any, index: number) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-gray-50 rounded-lg p-3">
                      <input
                        type="text"
                        value={student.name || ""}
                        onChange={(e) => updateStudent(ach._id, index, 'name', e.target.value)}
                        placeholder="Student Name"
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                      <input
                        type="text"
                        value={student.photo || ""}
                        onChange={(e) => updateStudent(ach._id, index, 'photo', e.target.value)}
                        placeholder="Photo URL"
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={student.rank || ""}
                          onChange={(e) => updateStudent(ach._id, index, 'rank', e.target.value)}
                          placeholder="Rank"
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          onClick={() => removeStudent(ach._id, index)}
                          className="text-red-500 hover:text-red-700 text-sm px-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addStudent(ach._id)}
                    className="text-[#D4AF37] hover:text-[#D4AF37]/80 text-sm font-medium"
                  >
                    + Add Student
                  </button>
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <p className="text-gray-400 text-center py-8">No achievement categories added yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}