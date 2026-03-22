import React, { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, Users, Plus, Lock, UserCog } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';
import { dbService } from '../../services/dbService';
import { MENU_ITEMS } from '../../config/menu';
import { User } from './types';
import ConfidentialityStep from './ConfidentialityStep';
import OperationalRightsStep from './OperationalRightsStep';
import EditUserModal from './EditUserModal';

const UserPermissions: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'step1' | 'step2'>('step1');
  const [viewMode, setViewMode] = useState<'list' | 'matrix'>('list');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({ name: '', position: '', email: '', avatar: '' });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    fetchData();
    checkDbStatus();
  }, []);

  const checkDbStatus = async () => {
    const status = await dbService.getStatus();
    setDbConnected(status.connected);
  };

  const fetchData = async () => {
    try {
      const data = await dbService.getUserPermissions();
      if (data && data.length > 0) {
        setUsers(data.map(u => ({
          ...u,
          id: Number(u.id || (u as any).userId)
        })));
      } else {
        setUsers([
          { id: 1, name: 'Somchai Jaidee', position: 'Plant Manager', email: 'somchai@thaimungmee.com', avatar: 'https://i.pravatar.cc/150?img=11' },
          { id: 2, name: 'Suda Rakdee', position: 'Sales Head', email: 'suda@thaimungmee.com', avatar: 'https://i.pravatar.cc/150?img=5' },
          { id: 5, name: 'Admin System', position: 'System Admin', email: 'admin@thaimungmee.com', avatar: 'https://i.pravatar.cc/150?img=12' },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const [confidentialityMap, setConfidentialityMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENU_ITEMS.forEach(mod => {
      initial[mod.id] = mod.isConfidential || false;
      if (mod.subItems) {
        mod.subItems.forEach(sub => {
          initial[sub.id] = sub.isConfidential || mod.isConfidential || false;
        });
      }
    });
    return initial;
  });

  const [matrixPermissions, setMatrixPermissions] = useState<Record<number, Record<string, number[]>>>({});
  const [currentPermissions, setCurrentPermissions] = useState<Record<string, number[]>>({});

  useEffect(() => {
    if (users.length > 0) {
      const initial: Record<number, Record<string, number[]>> = {};
      users.forEach(user => {
        if (user.permissions) {
          try {
            initial[user.id] = JSON.parse(user.permissions);
          } catch (e) {
            initial[user.id] = {};
          }
        } else {
          initial[user.id] = {};
          MENU_ITEMS.forEach(mod => {
            const isModConfidential = mod.isConfidential;
            const defaultLevels = user.isDev ? [1, 2, 3, 4] : (isModConfidential ? [] : [1]);
            initial[user.id][mod.id] = defaultLevels;
            if (mod.subItems) {
              mod.subItems.forEach(sub => {
                const isSubConfidential = sub.isConfidential || isModConfidential;
                initial[user.id][sub.id] = user.isDev ? [1, 2, 3, 4] : (isSubConfidential ? [] : [1]);
              });
            }
          });
        }
      });
      setMatrixPermissions(initial);
    }
  }, [users]);

  const toggleConfidentiality = (id: string) => {
    setConfidentialityMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      position: user.position,
      email: user.email,
      avatar: user.avatar
    });
    setSelectedUserId(user.id);
    const userPerms = matrixPermissions[user.id] || {};
    setCurrentPermissions(userPerms);
    setModalStep(1);
    setIsEditModalOpen(true);
  };

  const handleNewUser = () => {
    setFormData({ name: '', position: '', email: '', avatar: '' });
    setSelectedUserId(null);
    
    const defaultPerms: Record<string, number[]> = {};
    MENU_ITEMS.forEach(mod => {
      const isModConfidential = confidentialityMap[mod.id];
      defaultPerms[mod.id] = isModConfidential ? [] : [1];
      if (mod.subItems) {
        mod.subItems.forEach(sub => {
          const isSubConfidential = confidentialityMap[sub.id];
          defaultPerms[sub.id] = isSubConfidential ? [] : [1];
        });
      }
    });
    
    setCurrentPermissions(defaultPerms);
    setModalStep(1);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      Swal.fire('Error', 'Please fill in Name and Email', 'error');
      return;
    }
    const userId = selectedUserId || Date.now();
    const userData = {
      ...formData,
      userId: userId.toString(),
      id: userId.toString(),
      permissions: JSON.stringify(currentPermissions)
    };

    try {
      if (dbConnected) {
        await dbService.saveUserPermission(userData);
      }
      
      setMatrixPermissions(prev => ({
        ...prev,
        [userId]: currentPermissions
      }));

      if (!selectedUserId) {
        setUsers(prev => [...prev, { ...formData, id: userId, permissions: userData.permissions }]);
      } else {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...formData, permissions: userData.permissions } : u));
      }

      Swal.fire({
        title: 'Saved!',
        text: `Permissions updated for ${formData.name}`,
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        setIsEditModalOpen(false);
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to save to database', 'error');
    }
  };

  return (
    <div className="relative flex-1 min-h-full font-sans overflow-hidden w-full flex flex-col">
      <div className="relative z-10 w-full flex flex-col flex-1 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#111f42] text-white shadow-lg shadow-[#111f42]/20">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Permissions</h1>
              <p className="text-gray-500 text-sm mt-1">Access Control & Authorization</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            {/* Main Steps Tabs */}
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
              <button 
                onClick={() => setActiveTab('step1')}
                className={`px-6 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'step1' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Lock size={14} /> Step 1: Confidentiality
              </button>
              <button 
                onClick={() => setActiveTab('step2')}
                className={`px-6 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'step2' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <UserCog size={14} /> Step 2: Operational Rights
              </button>
            </div>

            {activeTab === 'step2' && (
              <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex gap-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-[#F9F7F6] text-[#E3624A]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Users size={14} /> User List
                </button>
                <button 
                  onClick={() => setViewMode('matrix')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${viewMode === 'matrix' ? 'bg-[#F9F7F6] text-[#E3624A]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <LayoutDashboard size={14} /> Summary Matrix
                </button>
                <button 
                  onClick={handleNewUser}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 bg-[#111f42] text-white shadow-sm hover:bg-[#111f42]/90 ml-2"
                >
                  <Plus size={14} /> Add User
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'step1' && (
          <ConfidentialityStep 
            confidentialityMap={confidentialityMap} 
            toggleConfidentiality={toggleConfidentiality}
            expandedModules={expandedModules}
            toggleExpand={(id) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }))}
          />
        )}

        {activeTab === 'step2' && (
          <OperationalRightsStep 
            viewMode={viewMode}
            users={users}
            matrixPermissions={matrixPermissions}
            confidentialityMap={confidentialityMap}
            expandedModules={expandedModules}
            toggleExpand={(id) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }))}
            handleEditUser={handleEditUser}
          />
        )}

        <AnimatePresence>
          {isEditModalOpen && (
            <EditUserModal 
              formData={formData}
              handleInputChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              modalStep={modalStep}
              setModalStep={setModalStep}
              currentPermissions={currentPermissions}
              setCurrentPermissions={setCurrentPermissions}
              confidentialityMap={confidentialityMap}
              expandedModules={expandedModules}
              toggleExpand={(id) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }))}
              handleSave={handleSave}
              onClose={() => setIsEditModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserPermissions;
