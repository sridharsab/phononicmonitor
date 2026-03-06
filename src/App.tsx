/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Activity, Map, Settings as SettingsIcon, ShieldAlert, HardDrive } from 'lucide-react';
import CommandCenter from './components/CommandCenter';
import AcousticLab from './components/AcousticLab';
import SensorGrid from './components/SensorGrid';
import Settings from './components/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('command');

  return (
    <div className="flex h-screen bg-[#2b2b2b] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e1e1e] border-r border-[#3a3a3a] flex flex-col">
        <div className="p-6 border-b border-[#3a3a3a]">
          <div className="flex items-center gap-3">
            <Activity className="text-[#00bcd4] w-8 h-8" />
            <div>
              <h1 className="font-bold text-lg tracking-wider text-white">PHONONIC</h1>
              <h2 className="text-xs text-[#00bcd4] tracking-widest uppercase">Audit DSS v1.0</h2>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <NavItem 
            icon={<Map size={20} />} 
            label="Command Center" 
            active={activeTab === 'command'} 
            onClick={() => setActiveTab('command')} 
          />
          <NavItem 
            icon={<Activity size={20} />} 
            label="Acoustic Lab" 
            active={activeTab === 'lab'} 
            onClick={() => setActiveTab('lab')} 
          />
          <NavItem 
            icon={<HardDrive size={20} />} 
            label="Sensor Grid" 
            active={activeTab === 'grid'} 
            onClick={() => setActiveTab('grid')} 
          />
          <NavItem 
            icon={<SettingsIcon size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="p-4 border-t border-[#3a3a3a]">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-[#00bcd4] animate-pulse"></div>
            <span className="text-gray-400">System Status: <span className="text-[#00bcd4] font-medium">ONLINE</span></span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-[#1e1e1e] border-b border-[#3a3a3a] px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-200">
            {activeTab === 'command' && 'Global Command Center'}
            {activeTab === 'lab' && 'Acoustic Analysis Lab'}
            {activeTab === 'grid' && 'Sensor Grid'}
            {activeTab === 'settings' && 'System Settings'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#ff5252]/10 text-[#ff5252] px-3 py-1.5 rounded-md border border-[#ff5252]/30 text-sm font-medium">
              <ShieldAlert size={16} />
              <span>2 Critical Alerts</span>
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'command' && <CommandCenter />}
          {activeTab === 'lab' && <AcousticLab />}
          {activeTab === 'grid' && <SensorGrid />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
        active 
          ? 'bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/30' 
          : 'text-gray-400 hover:bg-[#3a3a3a] hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
