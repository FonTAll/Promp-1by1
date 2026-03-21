import { CalendarEvent } from './types';

export const PALETTE = {
  primary: '#1e3a8a', // blue-900
  accent: '#ef4444',  // red-500
  gold: '#f59e0b',    // amber-500
  sunday: '#ef4444',  // red-500
  saturday: '#8b5cf6',// violet-500
  bg: '#f8fafc'       // slate-50
};

export const DAYS_OF_WEEK = [
  { label: 'SUN', color: PALETTE.sunday },
  { label: 'MON', color: PALETTE.primary },
  { label: 'TUE', color: PALETTE.primary },
  { label: 'WED', color: PALETTE.primary },
  { label: 'THU', color: PALETTE.primary },
  { label: 'FRI', color: PALETTE.primary },
  { label: 'SAT', color: PALETTE.saturday }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  { id: 'HL-001', date: '2026-01-01', title: '*วันขึ้นปีใหม่', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-002', date: '2026-04-06', title: '*วันจักรี', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-003', date: '2026-04-13', title: '*วันสงกรานต์', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-004', date: '2026-04-14', title: '*วันสงกรานต์', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-005', date: '2026-04-15', title: '*วันสงกรานต์', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-006', date: '2026-05-01', title: '*วันแรงงานแห่งชาติ', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-007', date: '2026-06-03', title: '*วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-008', date: '2026-07-28', title: '*วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-009', date: '2026-08-12', title: '*วันแม่แห่งชาติ', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-010', date: '2026-10-13', title: '*วันนวมินทรมหาราช', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-011', date: '2026-10-23', title: '*วันปิยมหาราช', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-012', date: '2026-12-05', title: '*วันพ่อแห่งชาติ (วันชาติ)', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-013', date: '2026-12-10', title: '*วันรัฐธรรมนูญ', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  { id: 'HL-014', date: '2026-12-31', title: '*วันสิ้นปี', time: 'All Day', type: 'Holiday', priority: 'High', status: 'Confirmed', color: 'bg-red-50 text-red-600 border-red-100', isHoliday: true },
  
  // Furniture Factory Mock Data
  { id: 'EV-001', date: '2026-03-09', title: 'Monthly QC Audit', time: '09:00', type: 'QC', priority: 'High', status: 'Scheduled', color: 'bg-purple-50 text-purple-700 border-purple-100', isHoliday: false },
  { id: 'EV-002', date: '2026-03-12', title: 'PM: CNC Router M-04', time: '13:00', type: 'Maintenance', priority: 'Critical', status: 'Confirmed', color: 'bg-amber-50 text-amber-700 border-amber-100', isHoliday: false },
  { id: 'EV-003', date: '2026-03-15', title: 'Teak Wood Batch Arrival', time: '10:00', type: 'Logistics', priority: 'Normal', status: 'Scheduled', color: 'bg-teal-50 text-teal-700 border-teal-100', isHoliday: false },
  { id: 'EV-004', date: '2026-03-18', title: 'Prod: Leather Sofa Lot 45', time: '08:00', type: 'Production', priority: 'High', status: 'Confirmed', color: 'bg-blue-50 text-blue-700 border-blue-100', isHoliday: false },
  { id: 'EV-005', date: '2026-03-20', title: 'Shift Supervisor Meeting', time: '15:30', type: 'Meeting', priority: 'Normal', status: 'Confirmed', color: 'bg-slate-50 text-slate-700 border-slate-100', isHoliday: false },
];

export const TYPE_COLORS: Record<string, string> = {
  'Production': 'bg-blue-50 text-blue-700 border-blue-100',
  'Maintenance': 'bg-amber-50 text-amber-700 border-amber-100',
  'Logistics': 'bg-teal-50 text-teal-700 border-teal-100',
  'QC': 'bg-purple-50 text-purple-700 border-purple-100',
  'Meeting': 'bg-slate-50 text-slate-700 border-slate-100',
  'Holiday': 'bg-red-50 text-red-600 border-red-100'
};
