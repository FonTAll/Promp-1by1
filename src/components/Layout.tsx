import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import SecurityGuard from './SecurityGuard';
import Watermark from './Watermark';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <SecurityGuard>
      {isAuthenticated && <Watermark />}
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 pt-8 flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </SecurityGuard>
  );
}
