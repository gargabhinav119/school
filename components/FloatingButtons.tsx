"use client";
import { MessageCircle, Phone, FileText } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-110 animate-bounce">
        <MessageCircle size={24} />
      </button>
      <button className="group bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 transition-all hover:scale-110">
        <Phone size={24} />
      </button>
      <button className="group bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full shadow-2xl shadow-gold-500/40 transition-all hover:scale-110">
        <FileText size={24} />
      </button>
    </div>
  );
};

export default FloatingButtons;