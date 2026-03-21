import React from 'react';
import { X, CalendarDays, Palmtree, Clock, Save } from 'lucide-react';
import { EventFormState } from './types';

interface EventModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  form: EventFormState;
  setForm: React.Dispatch<React.SetStateAction<EventFormState>>;
  onClose: () => void;
  onSave: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, mode, form, setForm, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-t-[8px] border-blue-600 flex flex-col animate-zoom-in">
        <div className="bg-blue-900 px-8 py-5 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            {form.isHoliday ? <Palmtree size={22} className="text-red-400" /> : <CalendarDays size={22} className="text-blue-400" />}
            <h2 className="text-lg font-bold uppercase tracking-wider">
              {mode === 'create' ? (form.isHoliday ? 'New Holiday' : 'Create Task') : 'Modify Entry'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6 bg-white flex-1 overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {form.isHoliday ? 'Holiday Name' : 'Task Description'}
            </label>
            <input 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
              className="w-full border-b-2 border-gray-200 bg-transparent py-2 text-sm font-bold text-gray-900 focus:border-blue-600 outline-none transition-colors" 
              placeholder={form.isHoliday ? "*Name of holiday..." : "Production lot / Maintenance detail..."} 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
              <input 
                type="date" 
                value={form.date} 
                onChange={e => setForm({ ...form, date: e.target.value })} 
                className="w-full border-b-2 border-gray-200 bg-transparent py-1.5 text-sm font-bold text-gray-900 focus:border-blue-600 outline-none transition-colors" 
              />
            </div>
            {!form.isHoliday && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time</label>
                <div className="relative">
                  <Clock size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" />
                  <input 
                    type="time" 
                    value={form.time} 
                    onChange={e => setForm({ ...form, time: e.target.value })} 
                    className="w-full pl-6 border-b-2 border-gray-200 bg-transparent py-1.5 text-sm font-bold text-gray-900 focus:border-blue-600 outline-none transition-colors" 
                  />
                </div>
              </div>
            )}
          </div>

          {!form.isHoliday && (
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <select 
                  value={form.type} 
                  onChange={e => setForm({ ...form, type: e.target.value })} 
                  className="w-full border-b-2 border-gray-200 bg-transparent py-1.5 text-xs font-bold text-gray-900 outline-none cursor-pointer focus:border-blue-600 transition-colors"
                >
                  <option>Production</option>
                  <option>Maintenance</option>
                  <option>Logistics</option>
                  <option>QC</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</label>
                <select 
                  value={form.priority} 
                  onChange={e => setForm({ ...form, priority: e.target.value })} 
                  className="w-full border-b-2 border-gray-200 bg-transparent py-1.5 text-xs font-bold text-gray-900 outline-none cursor-pointer focus:border-blue-600 transition-colors"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                <select 
                  value={form.status} 
                  onChange={e => setForm({ ...form, status: e.target.value })} 
                  className="w-full border-b-2 border-gray-200 bg-transparent py-1.5 text-xs font-bold text-blue-600 outline-none cursor-pointer uppercase focus:border-blue-600 transition-colors"
                >
                  <option>Scheduled</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 text-gray-500 font-bold uppercase text-xs hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            className={`px-8 py-2.5 rounded-xl font-bold uppercase text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 ${form.isHoliday ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            <Save size={16} /> Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};
