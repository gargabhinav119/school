"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditActivities() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    images: [],
    imageAlt: "",
    tags: [],
    order: 0,
  });
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(res => {
        if (res.success) setActivities(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const activity of activities) {
        await fetch("/api/activities", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        });
      }
      alert("✅ Activities updated successfully!");
      router.push("/activities");
    } catch (error) {
      alert("❌ Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const addActivity = async () => {
    if (!newActivity.title.trim()) return;
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });
      const data = await res.json();
      if (data.success) {
        setActivities([...activities, data.data]);
        setNewActivity({ title: "", description: "", images: [], imageAlt: "", tags: [], order: 0 });
      }
    } catch (error) {
      alert("Failed to add activity");
    }
  };

  const deleteActivity = async (id: string) => {
    if (!confirm("Delete this activity?")) return;
    try {
      await fetch(`/api/activities?id=${id}`, { method: "DELETE" });
      setActivities(activities.filter(a => a._id !== id));
    } catch (error) {
      alert("Failed to delete activity");
    }
  };

  const updateActivity = (id: string, field: string, value: any) => {
    setActivities(activities.map(a => a._id === id ? { ...a, [field]: value } : a));
  };

  const addImageToActivity = (id: string) => {
    if (!newImage.trim()) return;
    const activity = activities.find(a => a._id === id);
    if (activity) {
      const images = [...(activity.images || []), newImage];
      updateActivity(id, 'images', images);
      setNewImage("");
    }
  };

  const removeImageFromActivity = (id: string, index: number) => {
    const activity = activities.find(a => a._id === id);
    if (activity) {
      const images = [...(activity.images || [])];
      images.splice(index, 1);
      updateActivity(id, 'images', images);
    }
  };

  const updateTags = (id: string, value: string) => {
    const tags = value.split(",").map(s => s.trim()).filter(Boolean);
    setActivities(activities.map(a => a._id === id ? { ...a, tags } : a));
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Activities</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Add New Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-[#0B2447] mb-4">➕ Add New Activity</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                placeholder="Activity Title (e.g., Annual Function)"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newActivity.imageAlt || ""}
                onChange={(e) => setNewActivity({ ...newActivity, imageAlt: e.target.value })}
                placeholder="Image Alt Text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newActivity.tags.join(", ")}
                onChange={(e) => setNewActivity({ ...newActivity, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                placeholder="Tags (comma separated: e.g., Event, Performance)"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={() => {
                      if (newImage.trim()) {
                        setNewActivity({ ...newActivity, images: [...newActivity.images, newImage] });
                        setNewImage("");
                      }
                    }}
                    className="bg-[#D4AF37] text-[#0B2447] px-4 py-2 rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newActivity.images.map((img: string, i: number) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          const images = [...newActivity.images];
                          images.splice(i, 1);
                          setNewActivity({ ...newActivity, images });
                        }}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={addActivity}
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Add Activity
              </button>
            </div>
          </div>

          {/* Existing Activities */}
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0B2447]">{activity.title}</h3>
                  <button
                    onClick={() => deleteActivity(activity._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={activity.title}
                      onChange={(e) => updateActivity(activity._id, 'title', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={activity.order || 0}
                      onChange={(e) => updateActivity(activity._id, 'order', parseInt(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={activity.description}
                    onChange={(e) => updateActivity(activity._id, 'description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={activity.imageAlt || ""}
                    onChange={(e) => updateActivity(activity._id, 'imageAlt', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={(activity.tags || []).join(", ")}
                    onChange={(e) => updateTags(activity._id, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Event, Performance, Annual"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={() => addImageToActivity(activity._id)}
                      className="bg-[#D4AF37] text-[#0B2447] px-4 py-2 rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(activity.images || []).map((img: string, i: number) => (
                      <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImageFromActivity(activity._id, i)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-gray-400 text-center py-8">No activities added yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}