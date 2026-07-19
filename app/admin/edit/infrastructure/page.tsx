"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

export default function EditInfrastructure() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/api/infrastructure")
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
      const res = await fetch("/api/infrastructure", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        alert("✅ Changes saved successfully!");
        router.push("/infrastructure");
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
            <h1 className="text-2xl font-bold text-[#0B2447]">Edit Infrastructure</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Classrooms */}
            <Section title="🏫 Classrooms">
              <Input label="Title" value={data.classroomsTitle} onChange={(v) => setData({...data, classroomsTitle: v})} />
              <Textarea label="Description" value={data.classroomsDescription} onChange={(v) => setData({...data, classroomsDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Classrooms Count" value={data.classroomsStats?.classrooms} onChange={(v) => setData({...data, classroomsStats: {...data.classroomsStats, classrooms: v}})} />
                <Input label="Smart Boards" value={data.classroomsStats?.smartBoards} onChange={(v) => setData({...data, classroomsStats: {...data.classroomsStats, smartBoards: v}})} />
                <Input label="Student Ratio" value={data.classroomsStats?.studentRatio} onChange={(v) => setData({...data, classroomsStats: {...data.classroomsStats, studentRatio: v}})} />
                <Input label="Wi-Fi" value={data.classroomsStats?.wifi} onChange={(v) => setData({...data, classroomsStats: {...data.classroomsStats, wifi: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.classroomsTags} onChange={(v) => setData({...data, classroomsTags: v})} />
              <ArrayInput label="Image URLs" value={data.classroomsImages} onChange={(v) => setData({...data, classroomsImages: v})} />
              <ArrayInput label="Image Labels" value={data.classroomsImageLabels} onChange={(v) => setData({...data, classroomsImageLabels: v})} />
            </Section>

            {/* Library */}
            <Section title="📚 Library">
              <Input label="Title" value={data.libraryTitle} onChange={(v) => setData({...data, libraryTitle: v})} />
              <Textarea label="Description" value={data.libraryDescription} onChange={(v) => setData({...data, libraryDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Books" value={data.libraryStats?.books} onChange={(v) => setData({...data, libraryStats: {...data.libraryStats, books: v}})} />
                <Input label="E-Resources" value={data.libraryStats?.eResources} onChange={(v) => setData({...data, libraryStats: {...data.libraryStats, eResources: v}})} />
                <Input label="Access" value={data.libraryStats?.access} onChange={(v) => setData({...data, libraryStats: {...data.libraryStats, access: v}})} />
                <Input label="Seating" value={data.libraryStats?.seating} onChange={(v) => setData({...data, libraryStats: {...data.libraryStats, seating: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.libraryTags} onChange={(v) => setData({...data, libraryTags: v})} />
              <ArrayInput label="Image URLs" value={data.libraryImages} onChange={(v) => setData({...data, libraryImages: v})} />
              <ArrayInput label="Image Labels" value={data.libraryImageLabels} onChange={(v) => setData({...data, libraryImageLabels: v})} />
            </Section>

            {/* Sports */}
            <Section title="⚽ Sports & Games">
              <Input label="Title" value={data.sportsTitle} onChange={(v) => setData({...data, sportsTitle: v})} />
              <Textarea label="Description" value={data.sportsDescription} onChange={(v) => setData({...data, sportsDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Facilities" value={data.sportsStats?.facilities} onChange={(v) => setData({...data, sportsStats: {...data.sportsStats, facilities: v}})} />
                <Input label="Coaches" value={data.sportsStats?.coaches} onChange={(v) => setData({...data, sportsStats: {...data.sportsStats, coaches: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.sportsTags} onChange={(v) => setData({...data, sportsTags: v})} />
              <ArrayInput label="Image URLs" value={data.sportsImages} onChange={(v) => setData({...data, sportsImages: v})} />
              <ArrayInput label="Image Labels" value={data.sportsImageLabels} onChange={(v) => setData({...data, sportsImageLabels: v})} />
            </Section>

            {/* Playground */}
            <Section title="🌿 Playground">
              <Input label="Title" value={data.playgroundTitle} onChange={(v) => setData({...data, playgroundTitle: v})} />
              <Textarea label="Description" value={data.playgroundDescription} onChange={(v) => setData({...data, playgroundDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Area (Acres)" value={data.playgroundStats?.area} onChange={(v) => setData({...data, playgroundStats: {...data.playgroundStats, area: v}})} />
                <Input label="Capacity" value={data.playgroundStats?.capacity} onChange={(v) => setData({...data, playgroundStats: {...data.playgroundStats, capacity: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.playgroundTags} onChange={(v) => setData({...data, playgroundTags: v})} />
              <ArrayInput label="Image URLs" value={data.playgroundImages} onChange={(v) => setData({...data, playgroundImages: v})} />
              <ArrayInput label="Image Labels" value={data.playgroundImageLabels} onChange={(v) => setData({...data, playgroundImageLabels: v})} />
            </Section>

            {/* Transport */}
            <Section title="🚌 Transport">
              <Input label="Title" value={data.transportTitle} onChange={(v) => setData({...data, transportTitle: v})} />
              <Textarea label="Description" value={data.transportDescription} onChange={(v) => setData({...data, transportDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Buses" value={data.transportStats?.buses} onChange={(v) => setData({...data, transportStats: {...data.transportStats, buses: v}})} />
                <Input label="Routes" value={data.transportStats?.routes} onChange={(v) => setData({...data, transportStats: {...data.transportStats, routes: v}})} />
                <Input label="GPS" value={data.transportStats?.gps} onChange={(v) => setData({...data, transportStats: {...data.transportStats, gps: v}})} />
                <Input label="Safety" value={data.transportStats?.safety} onChange={(v) => setData({...data, transportStats: {...data.transportStats, safety: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.transportTags} onChange={(v) => setData({...data, transportTags: v})} />
              <ArrayInput label="Image URLs" value={data.transportImages} onChange={(v) => setData({...data, transportImages: v})} />
              <ArrayInput label="Image Labels" value={data.transportImageLabels} onChange={(v) => setData({...data, transportImageLabels: v})} />
            </Section>

            {/* Laboratories */}
            <Section title="🔬 Laboratories">
              <Input label="Title" value={data.laboratoriesTitle} onChange={(v) => setData({...data, laboratoriesTitle: v})} />
              <Textarea label="Description" value={data.laboratoriesDescription} onChange={(v) => setData({...data, laboratoriesDescription: v})} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Labs" value={data.laboratoriesStats?.labs} onChange={(v) => setData({...data, laboratoriesStats: {...data.laboratoriesStats, labs: v}})} />
                <Input label="Equipment" value={data.laboratoriesStats?.equipment} onChange={(v) => setData({...data, laboratoriesStats: {...data.laboratoriesStats, equipment: v}})} />
              </div>
              <ArrayInput label="Tags" value={data.laboratoriesTags} onChange={(v) => setData({...data, laboratoriesTags: v})} />
              <ArrayInput label="Image URLs" value={data.laboratoriesImages} onChange={(v) => setData({...data, laboratoriesImages: v})} />
              <ArrayInput label="Image Labels" value={data.laboratoriesImageLabels} onChange={(v) => setData({...data, laboratoriesImageLabels: v})} />
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