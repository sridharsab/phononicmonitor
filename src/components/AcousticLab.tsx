import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, Play, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export default function AcousticLab() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ status: string, score: number, rms: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate dummy waveform data
  const generateWaveform = (isCritical: boolean) => {
    return Array.from({ length: 100 }).map((_, i) => ({
      x: i,
      y: isCritical 
        ? Math.sin(i * 0.5) * (Math.random() * 50 + 50) + (i > 40 && i < 60 ? Math.random() * 200 - 100 : 0) // Crack anomaly
        : Math.sin(i * 0.2) * (Math.random() * 20 + 10)
    }));
  };

  const [waveData, setWaveData] = useState(generateWaveform(false));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      
      // Reset waveform to flat/noise before analysis
      setWaveData(Array.from({ length: 100 }).map((_, i) => ({ x: i, y: Math.random() * 10 - 5 })));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.name.endsWith('.wav')) {
        setFile(selectedFile);
        setResult(null);
        setWaveData(Array.from({ length: 100 }).map((_, i) => ({ x: i, y: Math.random() * 10 - 5 })));
      } else {
        alert("Please upload a .wav file");
      }
    }
  };

  const analyzeAudio = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const isCritical = file.name.toLowerCase().includes('crack') || Math.random() > 0.7;
      
      setWaveData(generateWaveform(isCritical));
      
      setResult({
        status: isCritical ? 'CRITICAL DETECTED' : 'NORMAL OPERATION',
        score: isCritical ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 20) + 80,
        rms: isCritical ? 0.85 + Math.random() * 0.1 : 0.1 + Math.random() * 0.2
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Upload & Controls */}
      <div className="space-y-6">
        <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Audio Input</h3>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
              ${file ? 'border-[#00bcd4] bg-[#00bcd4]/5' : 'border-[#3a3a3a] hover:border-gray-500 hover:bg-[#252525]'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".wav" 
              onChange={handleFileChange}
            />
            
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-[#00bcd4]/20 rounded-full text-[#00bcd4]">
                  <FileAudio size={32} />
                </div>
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <UploadCloud size={32} className="text-gray-400" />
                <div>
                  <p className="text-gray-300 font-medium">Drag & drop .wav file</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={analyzeAudio}
            disabled={!file || isAnalyzing}
            className={`w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
              ${!file 
                ? 'bg-[#2b2b2b] text-gray-500 cursor-not-allowed' 
                : isAnalyzing 
                  ? 'bg-[#00bcd4]/50 text-white cursor-wait' 
                  : 'bg-[#00bcd4] text-[#1e1e1e] hover:bg-[#00a0b5]'}`}
          >
            {isAnalyzing ? (
              <>
                <Activity className="animate-pulse" size={20} />
                Processing Signal...
              </>
            ) : (
              <>
                <Play size={20} />
                Run Acoustic Analysis
              </>
            )}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className={`bg-[#1e1e1e] border rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4
            ${result.status === 'CRITICAL DETECTED' ? 'border-[#ff5252] shadow-[0_0_20px_rgba(255,82,82,0.15)]' : 'border-[#00bcd4]'}`}>
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Analysis Result</h3>
            <div className={`text-xl font-bold mb-6 ${result.status === 'CRITICAL DETECTED' ? 'text-[#ff5252]' : 'text-[#00bcd4]'}`}>
              {result.status}
            </div>
            
            <div className="flex items-end justify-between border-t border-[#3a3a3a] pt-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Structural Integrity Score</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${result.score < 50 ? 'text-[#ff5252]' : 'text-white'}`}>
                    {result.score}
                  </span>
                  <span className="text-gray-500">/100</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">RMS Energy</p>
                <p className="text-lg font-mono text-gray-200">{result.rms.toFixed(3)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Visualizations */}
      <div className="lg:col-span-2 space-y-6">
        {/* Waveform */}
        <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-200">Raw Waveform</h3>
            <div className="text-xs font-mono text-gray-500">Time Domain</div>
          </div>
          <div className="h-[250px] w-full bg-[#252525] rounded-lg border border-[#3a3a3a] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waveData}>
                <YAxis domain={[-150, 150]} hide />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke={result?.status === 'CRITICAL DETECTED' ? '#ff5252' : '#00bcd4'} 
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spectrogram (Simulated with CSS Grid/Heatmap concept) */}
        <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-200">Spectrogram</h3>
            <div className="text-xs font-mono text-gray-500">Frequency Domain</div>
          </div>
          <div className="h-[200px] w-full bg-[#252525] rounded-lg border border-[#3a3a3a] overflow-hidden relative">
            {/* Simulated Spectrogram using CSS gradients */}
            <div className="absolute inset-0 opacity-80 flex">
              {Array.from({ length: 50 }).map((_, i) => {
                // Generate a column of the spectrogram
                const isAnomaly = result?.status === 'CRITICAL DETECTED' && i > 20 && i < 30;
                const intensity = isAnomaly ? 80 + Math.random() * 20 : 10 + Math.random() * 30;
                
                return (
                  <div key={i} className="flex-1 flex flex-col-reverse">
                    {Array.from({ length: 20 }).map((_, j) => {
                      // Higher frequencies (higher j) usually have less energy unless there's a crack
                      const cellIntensity = isAnomaly && j > 10 
                        ? intensity * (Math.random() * 0.5 + 0.5) 
                        : intensity * (1 - j/20) * Math.random();
                      
                      // Map intensity to color (dark blue -> cyan -> yellow -> red)
                      let color = '#252525';
                      if (cellIntensity > 80) color = '#ff5252';
                      else if (cellIntensity > 50) color = '#fbbf24';
                      else if (cellIntensity > 20) color = '#00bcd4';
                      else if (cellIntensity > 5) color = '#0c4a6e';

                      return (
                        <div 
                          key={`cell-${i}-${j}`} 
                          className="flex-1 w-full transition-colors duration-1000"
                          style={{ backgroundColor: color }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            {!result && !isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#252525]/80 backdrop-blur-sm">
                <p className="text-gray-500 text-sm">Run analysis to view spectrogram</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
