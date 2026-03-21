import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-end items-center shadow-sm z-10">
      <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-600" />
          <span>{formatDate(currentTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-600" />
          <span className="font-mono">{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
}
