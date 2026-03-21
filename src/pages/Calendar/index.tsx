import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Clock, 
  List, 
  LayoutGrid, 
  HelpCircle, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  CalendarDays, 
  Settings, 
  Palmtree
} from 'lucide-react';
import { CalendarEvent, EventFormState } from './types';
import { PALETTE, DAYS_OF_WEEK, INITIAL_EVENTS, TYPE_COLORS } from './constants';
import { KpiCard } from './KpiCard';
import { EventModal } from './EventModal';
import { GuideDrawer } from './GuideDrawer';

export default function Calendar() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 15)); // Default to March 2026
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Event Management States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  
  // Pagination States for List View
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);

  const [eventForm, setEventForm] = useState<EventFormState>({
    id: '', date: '', title: '', time: '', type: 'Production', priority: 'Normal', status: 'Scheduled', isHoliday: false
  });

  // Calendar Logic
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: null, dateStr: '', isToday: false, isWeekend: false });
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ 
        day: i, 
        dateStr,
        isToday: dateStr === new Date().toISOString().split('T')[0],
        isWeekend: (new Date(year, month, i).getDay() === 0 || new Date(year, month, i).getDay() === 6)
      });
    }
    return days;
  }, [currentDate]);

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      const matchSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.type.toLowerCase().includes(searchQuery.toLowerCase());
      const evMonth = ev.date.substring(0, 7);
      const currMonth = currentDate.toISOString().substring(0, 7);
      return matchSearch && (activeTab === 'list' ? true : evMonth === currMonth);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchQuery, currentDate, activeTab]);

  // Pagination Logic
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;

  // Handlers
  const handlePrevMonth = () => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)); setCurrentPage(1); };
  const handleNextMonth = () => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)); setCurrentPage(1); };
  const handleSetToday = () => { setCurrentDate(new Date()); setCurrentPage(1); };

  const openEventModal = (mode: 'create' | 'edit' | 'view', data: any = null, type: 'Event' | 'Holiday' = 'Event') => {
    setModalMode(mode);
    if (mode === 'create') {
      const isHolidays = type === 'Holiday';
      setEventForm({
        id: isHolidays ? `HL-${String(events.length + 1).padStart(3, '0')}` : `EV-${String(events.length + 1).padStart(3, '0')}`,
        date: data?.dateStr || new Date().toISOString().split('T')[0],
        title: isHolidays ? '*' : '',
        time: isHolidays ? 'All Day' : '08:00',
        type: isHolidays ? 'Holiday' : 'Production',
        priority: isHolidays ? 'High' : 'Normal',
        status: 'Scheduled',
        isHoliday: isHolidays
      });
    } else {
      setEventForm({ ...data });
    }
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.date) return;
    
    let processedTitle = eventForm.title;
    if (eventForm.isHoliday && !processedTitle.startsWith('*')) {
      processedTitle = '*' + processedTitle;
    }

    if (modalMode === 'create') {
      const newEntry: CalendarEvent = { 
        ...eventForm, 
        title: processedTitle,
        color: TYPE_COLORS[eventForm.type] || 'bg-gray-50 text-gray-700 border-gray-200' 
      };
      setEvents([...events, newEntry]);
    } else {
      setEvents(events.map(e => e.id === eventForm.id ? { ...eventForm, title: processedTitle, color: TYPE_COLORS[eventForm.type] } : e));
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              MES <span className="text-blue-600">CALENDAR</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Factory Schedule & Maintenance Planning</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('calendar')} 
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 rounded-lg ${activeTab === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <LayoutGrid size={14} /> Calendar
            </button>
            <button 
              onClick={() => setActiveTab('list')} 
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 rounded-lg ${activeTab === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <List size={14} /> Event List
            </button>
          </div>
          <button 
            onClick={() => setIsGuideOpen(true)} 
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-6 w-full">
        {/* KPI / Dashboard Header for Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-up">
          <KpiCard title="Active Schedules" val={filteredEvents.filter(e=>!e.isHoliday).length} color={PALETTE.primary} IconComponent={Clock} desc="Factory Operations" />
          <KpiCard title="Upcoming Holidays" val={events.filter(e=>e.isHoliday && new Date(e.date) >= new Date()).length} color={PALETTE.accent} IconComponent={Palmtree} desc="Staff Leave Planning" />
          <KpiCard title="Maintenance Logs" val={events.filter(e=>e.type==='Maintenance').length} color={PALETTE.gold} IconComponent={Settings} desc="Machine Health" />
          <KpiCard title="Scheduled Tasks" val={filteredEvents.length} color="#10b981" IconComponent={CalendarDays} desc="This Month" />
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up flex-1 min-h-[600px]">
          
          {/* Action Bar */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-600"><ChevronLeft size={20}/></button>
                <div className="px-4 text-sm font-bold text-gray-900 uppercase tracking-widest min-w-[180px] text-center">
                  {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button onClick={handleNextMonth} className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-600"><ChevronRight size={20}/></button>
              </div>
              <button onClick={handleSetToday} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 font-bold uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-all text-xs shadow-sm">Today</button>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search activities..." 
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-bold rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition-all shadow-sm" 
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEventModal('create', null, 'Event')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Plus size={16} strokeWidth={3} /> Add Event
                </button>
                <button onClick={() => openEventModal('create', null, 'Holiday')} className="px-5 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm hover:bg-red-600 transition-all flex items-center gap-2">
                  <Palmtree size={16} strokeWidth={2.5} /> Add Holiday
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'calendar' ? (
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-7 border-b border-gray-200">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <div key={idx} style={{ backgroundColor: day.color }} className="py-3 text-center text-xs font-bold tracking-widest text-white">
                      {day.label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 bg-gray-50/50 flex-1 auto-rows-fr">
                  {calendarDays.map((d, idx) => {
                    const dayEvents = events.filter(e => e.date === d.dateStr);
                    const isSunday = idx % 7 === 0;
                    const isSaturday = idx % 7 === 6;

                    return (
                      <div key={idx} className={`min-h-[120px] border-r border-b border-gray-200 p-2 transition-colors relative group ${!d.day ? 'bg-transparent opacity-30' : 'bg-white hover:bg-gray-50/80'} ${isSunday && d.day ? 'bg-red-50/20' : ''} ${isSaturday && d.day ? 'bg-violet-50/10' : ''}`}>
                        {d.day && (
                          <>
                            <div className="flex justify-between items-start mb-2">
                              <span className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm ${d.isToday ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600'} ${isSunday && !d.isToday ? 'text-red-500' : ''}`}>{d.day}</span>
                            </div>
                            <div className="space-y-1 overflow-y-auto max-h-[85px] pb-6">
                              {dayEvents.map((ev, i) => (
                                <div key={i} onClick={() => openEventModal('edit', ev)} className={`px-2 py-1 rounded-md text-[10px] font-bold border truncate shadow-sm cursor-pointer hover:scale-[1.02] transition-all ${ev.color}`}>
                                  {ev.title}
                                </div>
                              ))}
                            </div>
                            <button onClick={() => openEventModal('create', d, 'Event')} className="absolute bottom-2 right-2 w-6 h-6 bg-blue-100 rounded-lg shadow-sm flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all active:scale-90 hover:bg-blue-200">
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue-600">Title</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Priority</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedEvents.map((ev) => (
                      <tr key={ev.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900 uppercase">{new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className="text-xs text-gray-500 font-mono flex items-center gap-1 mt-0.5"><Clock size={12}/> {ev.time}</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-bold text-sm uppercase tracking-tight ${ev.isHoliday ? 'text-red-600' : 'text-gray-900'}`}>{ev.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${ev.color}`}>{ev.type}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ev.priority === 'High' || ev.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{ev.priority}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-gray-600">
                             {ev.status === 'Completed' ? <CheckCircle2 size={14} className="text-emerald-500"/> : <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>}
                             {ev.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2 opacity-40 group-hover:opacity-100 transition-all">
                            <button onClick={() => openEventModal('edit', ev)} className="p-2 border border-gray-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-all shadow-sm"><Pencil size={14}/></button>
                            <button onClick={() => handleDeleteEvent(ev.id)} className="p-2 border border-gray-200 rounded-lg text-red-600 hover:bg-red-50 transition-all shadow-sm"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination for List View */}
          {activeTab === 'list' && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Showing {paginatedEvents.length} schedules</div>
              <div className="flex items-center gap-1">
                <button onClick={()=>setCurrentPage(p=>Math.max(1, p-1))} disabled={currentPage===1} className="p-2 rounded-xl border border-gray-200 bg-white text-gray-900 disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all"><ChevronLeft size={16}/></button>
                <div className="flex items-center px-4 h-9 bg-white border border-gray-200 rounded-xl shadow-sm text-xs font-bold text-gray-700">PAGE {currentPage} / {totalPages}</div>
                <button onClick={()=>setCurrentPage(p=>Math.min(totalPages, p+1))} disabled={currentPage===totalPages} className="p-2 rounded-xl border border-gray-200 bg-white text-gray-900 disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all"><ChevronRight size={16}/></button>
              </div>
            </div>
          )}
        </div>
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        mode={modalMode} 
        form={eventForm} 
        setForm={setEventForm} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveEvent} 
      />

      <GuideDrawer 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </div>
  );
}
