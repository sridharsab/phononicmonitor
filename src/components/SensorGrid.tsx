import React, { useState } from 'react';
import { Filter, Search, Battery, BatteryMedium, BatteryLow, Signal, AlertCircle, CheckCircle2 } from 'lucide-react';

// Dummy data
const initialSensors = [
  { id: 'S-001', location: 'Golden Gate - North Pier', battery: 92, lastSignal: '2 mins ago', status: 'Healthy' },
  { id: 'S-002', location: 'Golden Gate - Mid Span', battery: 88, lastSignal: '5 mins ago', status: 'Healthy' },
  { id: 'S-003', location: 'Brooklyn Bridge - Cable A', battery: 45, lastSignal: '1 min ago', status: 'Warning' },
  { id: 'S-004', location: 'Brooklyn Bridge - Cable B', battery: 12, lastSignal: '12 mins ago', status: 'Critical' },
  { id: 'S-005', location: 'London Tower - Base', battery: 98, lastSignal: 'Just now', status: 'Healthy' },
  { id: 'S-006', location: 'Sydney Harbor - Arch', battery: 76, lastSignal: '3 mins ago', status: 'Healthy' },
  { id: 'S-007', location: 'Akashi Kaikyo - Suspenders', battery: 8, lastSignal: '1 hour ago', status: 'Critical' },
  { id: 'S-008', location: 'Millau Viaduct - P2', battery: 65, lastSignal: '4 mins ago', status: 'Healthy' },
  { id: 'S-009', location: 'Millau Viaduct - P3', battery: 62, lastSignal: '4 mins ago', status: 'Warning' },
  { id: 'S-010', location: 'Vasco da Gama - Section 4', battery: 89, lastSignal: '2 mins ago', status: 'Healthy' },
];

export default function SensorGrid() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredSensors = initialSensors.filter(s => {
    const matchesFilter = filter === 'All' || s.status === filter;
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || 
                          s.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBatteryIcon = (level: number) => {
    if (level > 70) return <Battery className="text-green-400 w-4 h-4" />;
    if (level > 20) return <BatteryMedium className="text-yellow-400 w-4 h-4" />;
    return <BatteryLow className="text-[#ff5252] w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20"><CheckCircle2 className="w-3 h-3" /> Healthy</span>;
      case 'Warning':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"><AlertCircle className="w-3 h-3" /> Warning</span>;
      case 'Critical':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#ff5252]/10 text-[#ff5252] border border-[#ff5252]/20"><AlertCircle className="w-3 h-3" /> Critical</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Toolbar */}
      <div className="p-4 border-b border-[#3a3a3a] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#252525]">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search sensors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00bcd4] transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="text-gray-400 w-4 h-4" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00bcd4] transition-colors appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Healthy">Healthy</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2b2b2b] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3a3a3a]">Sensor ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3a3a3a]">Location</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3a3a3a]">Battery</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3a3a3a]">Last Signal</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3a3a3a]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3a3a3a]">
            {filteredSensors.length > 0 ? (
              filteredSensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-[#252525] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-200 group-hover:text-[#00bcd4] transition-colors">{sensor.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {sensor.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getBatteryIcon(sensor.battery)}
                      <span className="text-sm text-gray-300">{sensor.battery}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Signal className={`w-4 h-4 ${sensor.lastSignal.includes('hour') ? 'text-gray-500' : 'text-[#00bcd4]'}`} />
                      <span className="text-sm text-gray-300">{sensor.lastSignal}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(sensor.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No sensors found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
