import React from 'react';
import { HelpCircle, X } from 'lucide-react';

interface GuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideDrawer: React.FC<GuideDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="bg-blue-900 px-8 py-6 flex justify-between items-center text-white border-b-4 border-blue-600">
          <div className="flex items-center gap-3">
            <HelpCircle size={22} className="text-blue-400" />
            <h3 className="text-lg font-bold uppercase tracking-wider">Calendar Guide</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-10 text-gray-600">
          <section>
            <h4 className="font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white font-mono w-6 h-6 rounded-full flex items-center justify-center text-[12px]">01</span> 
              การเพิ่มแผนงาน
            </h4>
            <p className="text-sm leading-relaxed">
              กดปุ่ม "Add Event" เพื่อเพิ่มตารางการผลิตหรือกิจกรรมโรงงาน ระบบจะแยกสีตามประเภทเพื่อให้ตรวจสอบได้ง่ายในมุมมองปฏิทิน
            </p>
          </section>
          <section>
            <h4 className="font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-red-500 text-white font-mono w-6 h-6 rounded-full flex items-center justify-center text-[12px]">02</span> 
              วันหยุดนักขัตฤกษ์
            </h4>
            <p className="text-sm leading-relaxed">
              ใช้ปุ่ม "Add Holiday" สำหรับวันหยุดสำคัญประจำปี โดยระบบจะแสดงตัวอักษรสีแดงและพื้นหลังวันสีแดงอ่อนในปฏิทินโดยอัตโนมัติ
            </p>
          </section>
        </div>
        <div className="p-6 border-t bg-white flex justify-end">
          <button onClick={onClose} className="px-8 py-3 bg-blue-900 text-white rounded-xl font-bold text-xs uppercase shadow-lg hover:bg-blue-800 transition-colors">
            ปิดคู่มือ
          </button>
        </div>
      </div>
    </div>
  );
};
