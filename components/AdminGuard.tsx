"use client";
import { useAdmin } from "@/app/context/AdminContext";
import { Pencil, X, Check, Trash2 } from "lucide-react";
import { useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
  student?: any;
  onSave?: (data: any) => void;
  onDelete?: (id: string) => void;
}

export function AdminGuard({ children, student, onSave, onDelete }: AdminGuardProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student || {});
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return <>{children}</>;
  }

  // If no student data (for Add button), just show children
  if (!student) {
    return <>{children}</>;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: student._id, ...editData }),
      });
      
      if (res.ok) {
        setIsEditing(false);
        if (onSave) onSave(editData);
        window.location.reload();
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/students?id=${student._id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        if (onDelete) onDelete(student._id);
        window.location.reload();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {!isEditing ? (
        <>
          {children}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-[#D4AF37] text-white shadow-lg hover:scale-110 z-10"
            title="Edit Student"
          >
            <Pencil size={14} />
          </button>
        </>
      ) : (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0B2447]">Edit Student</h3>
              <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  type="text"
                  value={editData.photo || ""}
                  onChange={(e) => setEditData({ ...editData, photo: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="/images/student1.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                  <input
                    type="text"
                    value={editData.percentage || ""}
                    onChange={(e) => setEditData({ ...editData, percentage: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="98.5%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                  <input
                    type="number"
                    value={editData.rank || ""}
                    onChange={(e) => setEditData({ ...editData, rank: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    value={editData.class || "X"}
                    onChange={(e) => setEditData({ ...editData, class: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="X">Class X</option>
                    <option value="XII">Class XII</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={editData.year || "2024"}
                    onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B2447] py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Saving..." : "Save Changes"}
                <Check size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}