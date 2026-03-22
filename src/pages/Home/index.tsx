import React from 'react';
import { Banner } from './components/Banner';
import { KpiCards } from './components/KpiCards';
import { StockAlerts } from './components/StockAlerts';
import { PendingTasks } from './components/PendingTasks';
import { Phone, Mail, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 pb-0 m-2">
      <div className="space-y-4">
        <Banner />
        <KpiCards />
        <StockAlerts />
        <PendingTasks />
      </div>
      
      {/* Footer from screenshot */}
      <footer className="pt-4 pb-0 flex flex-col items-center justify-center border-t border-slate-200/50 mt-auto">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <Settings size={12} className="text-[#ab8a3b]" />
          <span>WMS MASTER CORE</span>
          <span className="text-slate-300 mx-1">•</span>
          <span>SMART WAREHOUSE ARCHITECTURE</span>
          <span className="text-slate-300 mx-1">•</span>
          <span>VER 2026.1</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300">System by</span>
            <span className="text-[#111f42]">T All Intelligence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-[#E3624A]" />
            <span>082-5695654</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={12} className="text-[#E3624A]" />
            <span className="lowercase">tallintelligence.wms@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
