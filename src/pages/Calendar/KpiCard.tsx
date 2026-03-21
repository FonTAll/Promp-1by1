import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  val: number | string;
  color: string;
  IconComponent: LucideIcon;
  desc?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, val, color, IconComponent, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 relative overflow-hidden group h-full cursor-pointer">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none z-0">
      <IconComponent size={120} />
    </div>
    <div className="relative z-10 flex justify-between items-start">
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-3xl font-bold tracking-tight text-gray-900 truncate">{val}</h4>
        </div>
        {desc && (
          <p className="text-[10px] text-gray-500 font-medium mt-2 flex items-center gap-1.5 truncate uppercase">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }}></span>
            {desc}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100 bg-gray-50" style={{ color: color }}>
        <IconComponent size={24} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);
