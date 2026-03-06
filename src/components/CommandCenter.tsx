import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Activity, Radio, AlertTriangle, DollarSign } from 'lucide-react';

const fatigueData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  index: 40 + Math.random() * 20 + (i > 18 ? Math.random() * 30 : 0) // Spike towards the end
}));

// Dummy map data (x, y coordinates representing a stylized map)
const mapSensors = [
  { id: 'S-01', x: 20, y: 30, status: 'healthy', z: 100 },
  { id: 'S-02', x: 40, y: 60, status: 'healthy', z: 100 },
  { id: 'S-03', x: 50, y: 40, status: 'healthy', z: 100 },
  { id: 'S-04', x: 70, y: 80, status: 'critical', z: 150 },
  { id: 'S-05', x: 80, y: 20, status: 'healthy', z: 100 },
  { id: 'S-06', x: 30, y: 70, status: 'warning', z: 120 },
  { id: 'S-07', x: 60, y: 50, status: 'healthy', z: 100 },
  { id: 'S-08', x: 90, y: 60, status: 'critical', z: 150 },
];

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Structures Monitored" value="142" icon={<Activity className="text-[#00bcd4]" />} />
        <KpiCard title="Sensors Active" value="1,204" icon={<Radio className="text-[#00bcd4]" />} />
        <KpiCard title="Critical Alerts" value="2" icon={<AlertTriangle className="text-[#ff5252]" />} isAlert />
        <KpiCard title="Est. Savings" value="$2.4M" icon={<DollarSign className="text-[#00bcd4]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2 bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Global Sensor Network</h3>
          <div className="h-[400px] w-full relative bg-[#252525] rounded-lg border border-[#3a3a3a] overflow-hidden">
            {/* Stylized grid background */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#3a3a3a 1px, transparent 1px), linear-gradient(90deg, #3a3a3a 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}></div>
            
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
                <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1e1e1e] border border-[#3a3a3a] p-3 rounded shadow-xl">
                          <p className="font-medium text-white">{data.id}</p>
                          <p className={`text-sm ${data.status === 'critical' ? 'text-[#ff5252]' : data.status === 'warning' ? 'text-yellow-400' : 'text-[#00bcd4]'}`}>
                            Status: {data.status.toUpperCase()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Healthy" 
                  data={mapSensors.filter(s => s.status === 'healthy')} 
                  fill="#00bcd4" 
                  opacity={0.8}
                />
                <Scatter 
                  name="Warning" 
                  data={mapSensors.filter(s => s.status === 'warning')} 
                  fill="#fbbf24" 
                  opacity={0.8}
                />
                <Scatter 
                  name="Critical" 
                  data={mapSensors.filter(s => s.status === 'critical')} 
                  fill="#ff5252" 
                  opacity={0.9}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00bcd4]"></div><span className="text-gray-400">Healthy</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span className="text-gray-400">Warning</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5252]"></div><span className="text-gray-400">Critical</span></div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Global Fatigue Index (24h)</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fatigueData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" vertical={false} />
                <XAxis dataKey="time" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#3a3a3a', color: '#fff' }}
                  itemStyle={{ color: '#00bcd4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="index" 
                  stroke="#00bcd4" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#00bcd4', stroke: '#2b2b2b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, isAlert = false }: { title: string, value: string, icon: React.ReactNode, isAlert?: boolean }) {
  return (
    <div className={`bg-[#1e1e1e] border ${isAlert ? 'border-[#ff5252]/50 shadow-[0_0_15px_rgba(255,82,82,0.1)]' : 'border-[#3a3a3a]'} rounded-xl p-6 flex items-center justify-between`}>
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${isAlert ? 'text-[#ff5252]' : 'text-white'}`}>{value}</p>
      </div>
      <div className={`p-4 rounded-lg ${isAlert ? 'bg-[#ff5252]/10' : 'bg-[#2b2b2b]'}`}>
        {icon}
      </div>
    </div>
  );
}
