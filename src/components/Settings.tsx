import React, { useState } from 'react';
import { Sliders, Bell, Database, Save } from 'lucide-react';

export default function Settings() {
  const [sensitivity, setSensitivity] = useState(75);
  const [autoAlert, setAutoAlert] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#3a3a3a] flex items-center gap-3">
          <div className="p-2 bg-[#00bcd4]/10 rounded-lg">
            <Sliders className="text-[#00bcd4] w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Analysis Parameters</h3>
            <p className="text-sm text-gray-400">Configure the AI acoustic detection models.</p>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-200">Anomaly Sensitivity Threshold</label>
              <span className="text-sm font-mono text-[#00bcd4]">{sensitivity}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full h-2 bg-[#2b2b2b] rounded-lg appearance-none cursor-pointer accent-[#00bcd4]"
            />
            <p className="text-xs text-gray-500 mt-2">
              Higher values increase detection rates but may cause more false positives.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#3a3a3a] flex items-center gap-3">
          <div className="p-2 bg-[#ff5252]/10 rounded-lg">
            <Bell className="text-[#ff5252] w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Alert Configuration</h3>
            <p className="text-sm text-gray-400">Manage how and when you are notified.</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-200">Auto-Alert Mode</h4>
              <p className="text-xs text-gray-500 mt-1">Automatically dispatch maintenance crews on Critical status.</p>
            </div>
            <button 
              onClick={() => setAutoAlert(!autoAlert)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoAlert ? 'bg-[#ff5252]' : 'bg-[#3a3a3a]'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAlert ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#3a3a3a] flex items-center gap-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <Database className="text-gray-300 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Data Management</h3>
            <p className="text-sm text-gray-400">Storage and retention policies.</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Raw Audio Retention Period</label>
            <select 
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full bg-[#2b2b2b] border border-[#3a3a3a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bcd4] transition-colors appearance-none"
            >
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
              <option value="365">1 Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all
            ${saved ? 'bg-green-500 text-white' : 'bg-[#00bcd4] text-[#1e1e1e] hover:bg-[#00a0b5]'}`}
        >
          {saved ? (
            <>Saved Successfully</>
          ) : (
            <><Save size={18} /> Save Configuration</>
          )}
        </button>
      </div>
    </div>
  );
}
