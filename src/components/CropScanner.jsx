import React, { useState, useEffect } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CropScanner() {
  const [scanState, setScanState] = useState('idle'); // 'idle', 'uploading', 'scanning', 'result'
  const [progress, setProgress] = useState(0);
  const [selectedLeaf, setSelectedLeaf] = useState(null);

  // Mock database of leaf types and their corresponding diagnosis
  const sampleLeaves = [
    {
      id: 'tomato',
      name: 'Tomato Leaf (Sample)',
      disease: 'Late Blight',
      confidence: '96%',
      treatment: 'Apply Copper Fungicide or Mancozeb.',
      dosage: '2.5g per liter of water. Spray thoroughly on both sides of the leaf.',
      prevention: 'Avoid overhead watering. Maintain proper spacing between tomato plants.',
      severity: 'High',
      color: 'from-amber-50 to-amber-100/70 border-amber-200 text-amber-950',
      svgType: 'blight'
    },
    {
      id: 'rice',
      name: 'Rice Leaf (Sample)',
      disease: 'Rice Blast (Magnaporthe oryzae)',
      confidence: '91%',
      treatment: 'Spray Tricyclazole 75 WP.',
      dosage: '0.6g per liter of water. Apply at early signs of neck or leaf blast.',
      prevention: 'Use balanced nitrogen fertilizer. Grow blast-resistant rice cultivars.',
      severity: 'Medium-High',
      color: 'from-orange-50 to-orange-100/70 border-orange-200 text-orange-950',
      svgType: 'blast'
    },
    {
      id: 'wheat',
      name: 'Wheat Leaf (Sample)',
      disease: 'Leaf Rust (Puccinia triticina)',
      confidence: '89%',
      treatment: 'Apply Propiconazole 25 EC fungicide.',
      dosage: '1ml per liter of water. Spray at first appearance of orange pustules.',
      prevention: 'Sow early-maturing rust-resistant wheat seed varieties.',
      severity: 'Medium',
      color: 'from-yellow-50 to-yellow-100/70 border-yellow-200 text-yellow-950',
      svgType: 'rust'
    }
  ];

  // Default diagnosis when user uploads a custom file
  const customLeafDiagnosis = {
    id: 'custom',
    name: 'Uploaded Crop Image',
    disease: 'Leaf Blight (Alternaria Solani)',
    confidence: '94%',
    treatment: 'Apply Copper Fungicide.',
    dosage: '2ml per liter of water. Repeat spray every 7-10 days if humid weather persists.',
    prevention: 'Rotate crops annually. Clean all farming equipment after touching infected beds.',
    severity: 'High',
    svgType: 'custom'
  };

  useEffect(() => {
    let timer;
    if (scanState === 'scanning') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setScanState('result');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [scanState]);

  const handleSelectSample = (sample) => {
    setSelectedLeaf(sample);
    setScanState('scanning');
  };

  const handleCustomUpload = (e) => {
    setSelectedLeaf(customLeafDiagnosis);
    setScanState('uploading');
    setTimeout(() => {
      setScanState('scanning');
    }, 850);
  };

  const resetScanner = () => {
    setScanState('idle');
    setSelectedLeaf(null);
    setProgress(0);
  };

  const renderLeafSVG = (type) => {
    switch (type) {
      case 'blight':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="12" fill="#dcfce7" />
            <path d="M50 85 C50 60 50 35 50 15" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 15 C30 40 25 70 50 85 C75 70 70 40 50 15 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
            <path d="M50 35 Q40 30 32 35 M50 50 Q38 45 30 52 M50 65 Q42 62 35 68 M50 35 Q60 30 68 35 M50 50 Q62 45 70 52 M50 65 Q58 62 65 68" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="36" cy="42" r="5" fill="#78350f" opacity="0.85" />
            <circle cx="34" cy="41" r="3" fill="#f59e0b" opacity="0.6" />
            <circle cx="62" cy="55" r="7" fill="#78350f" opacity="0.85" />
            <circle cx="60" cy="53" r="4.5" fill="#b45309" opacity="0.7" />
            <circle cx="48" cy="68" r="4.5" fill="#78350f" opacity="0.85" />
            <circle cx="50" cy="28" r="3.5" fill="#78350f" opacity="0.75" />
          </svg>
        );
      case 'blast':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="12" fill="#dcfce7" />
            <path d="M50 90 Q40 55 45 10 Q60 55 50 90 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M46 30 Q44 33 46 36 Q48 33 46 30 Z" fill="#78716c" stroke="#44403c" strokeWidth="0.5" />
            <path d="M48 45 Q45 50 48 55 Q51 50 48 45 Z" fill="#78716c" stroke="#44403c" strokeWidth="0.5" />
            <path d="M45 60 Q43 63 45 66 Q47 63 45 60 Z" fill="#a8a29e" stroke="#44403c" strokeWidth="0.5" />
            <ellipse cx="48" cy="50" rx="4" ry="7" fill="#fbbf24" opacity="0.3" />
            <ellipse cx="46" cy="33" rx="2" ry="4" fill="#fbbf24" opacity="0.3" />
          </svg>
        );
      case 'rust':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="12" fill="#fef08a" opacity="0.4" />
            <path d="M48 90 Q35 50 42 10 Q65 50 48 90 Z" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="43" cy="25" r="1.5" fill="#ea580c" />
            <circle cx="45" cy="27" r="1.5" fill="#ea580c" />
            <circle cx="41" cy="35" r="1.2" fill="#d97706" />
            <circle cx="46" cy="42" r="1.8" fill="#ea580c" />
            <circle cx="49" cy="46" r="1.2" fill="#ea580c" />
            <circle cx="44" cy="55" r="1.5" fill="#d97706" />
            <circle cx="51" cy="62" r="1.5" fill="#ea580c" />
            <circle cx="48" cy="68" r="1.8" fill="#d97706" />
            <circle cx="46" cy="74" r="1.2" fill="#ea580c" />
          </svg>
        );
      default:
        return (
          <div className="w-full h-full bg-emerald-50 flex flex-col items-center justify-center border border-dashed border-emerald-300 rounded-2xl p-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-2">
              <Camera className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-850">Custom Crop Image</span>
            <span className="text-[10px] text-slate-400 mt-1">Image processed successfully</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 flex flex-col text-slate-800">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Crop Diagnostic Scanner</h1>
        <p className="text-xs text-slate-500 font-medium">Instantly scan crop leaves to diagnose plant diseases</p>
      </div>

      {/* Screen Mode: IDLE */}
      {scanState === 'idle' && (
        <div className="flex-1 flex flex-col gap-5">
          {/* Viewfinder UI Mockup with Glowing Corners */}
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            
            {/* Viewfinder glowing corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500 rounded-tl-sm shadow-[-3px_-3px_10px_rgba(16,185,129,0.35)]" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-500 rounded-tr-sm shadow-[3px_-3px_10px_rgba(16,185,129,0.35)]" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-500 rounded-bl-sm shadow-[-3px_3px_10px_rgba(16,185,129,0.35)]" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500 rounded-br-sm shadow-[3px_3px_10px_rgba(16,185,129,0.35)]" />

            <div className="flex flex-col items-center max-w-[240px] relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-3.5 shadow-md">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Align Leaf Within Frame</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
                Ensure leaf is clear, well-lit, and fills the screen boundary
              </p>
            </div>

            {/* Custom file upload with Pulse Glow Animation */}
            <label className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-all duration-200 animate-pulse-glow">
              <Upload className="w-3.5 h-3.5" />
              Upload Leaf Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCustomUpload} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Test Samples Drawer */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Try Demo Leaf Samples</h2>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {sampleLeaves.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`w-full text-left px-4 py-3.5 border border-slate-100 bg-gradient-to-r ${sample.color} rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-card cursor-pointer`}
                >
                  <div>
                    <span className="text-xs font-extrabold block">{sample.name}</span>
                    <span className="text-[10px] opacity-75 font-medium">Simulate leaf with {sample.disease}</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/70 overflow-hidden border border-black/5 shadow-2xs">
                    {renderLeafSVG(sample.svgType)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen Mode: UPLOADING */}
      {scanState === 'uploading' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="relative w-16 h-16 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin" />
            <Upload className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Uploading Image...</h3>
          <p className="text-xs text-slate-400 font-medium">Processing file parameters and aligning dimensions</p>
        </div>
      )}

      {/* Screen Mode: SCANNING (3 seconds animation) */}
      {scanState === 'scanning' && (
        <div className="flex-1 flex flex-col justify-center items-center gap-6">
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-slate-950 border-2 border-emerald-500/50 overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.25)] flex items-center justify-center">
            
            {/* Leaf Image Placement */}
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-inner bg-slate-900 flex items-center justify-center border border-slate-800/40">
              {selectedLeaf && renderLeafSVG(selectedLeaf.svgType)}
            </div>

            {/* Laser Line Sweeping Animation */}
            <div className="absolute left-0 w-full h-1 bg-emerald-400 shadow-[0_0_16px_5px_rgba(52,211,153,0.85)] animate-scan" />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>

          <div className="w-full text-center">
            <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-center gap-1.5">
              Analyzing Foliage Disease...
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-3">Comparing features with crop database</p>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 max-w-xs mx-auto shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-700 transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 block mt-2.5">{progress}% completed</span>
          </div>
        </div>
      )}

      {/* Screen Mode: RESULT */}
      {scanState === 'result' && selectedLeaf && (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          
          {/* Top Result Banner */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-card flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5 shadow-2xs">
              <AlertCircle className="w-5.5 h-5.5" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] uppercase font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100/50 inline-block">
                Severity: {selectedLeaf.severity || 'High'}
              </span>
              <h3 className="text-base font-extrabold text-slate-950 mt-2">
                {selectedLeaf.disease}
              </h3>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-semibold">AI Match Confidence</span>
                <span className="text-sm font-black text-emerald-800">{selectedLeaf.confidence}</span>
              </div>
            </div>
          </div>

          {/* Actionable Treatment Plan */}
          <div className="bg-emerald-50/70 border border-emerald-100/60 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-card">
            <div className="flex items-center gap-1.5 mb-3.5 text-emerald-950 font-bold text-sm">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
              Suggested Treatment Plan
            </div>
            
            <div className="flex flex-col gap-3.5">
              <div>
                <span className="text-[9px] font-black text-emerald-800 uppercase block tracking-wider leading-none">Fungicide/Care Method</span>
                <p className="text-xs text-slate-800 font-semibold mt-1">{selectedLeaf.treatment}</p>
              </div>

              <div>
                <span className="text-[9px] font-black text-emerald-800 uppercase block tracking-wider leading-none">Recommended Dosage</span>
                <p className="text-xs text-slate-800 font-semibold mt-1">{selectedLeaf.dosage}</p>
              </div>
            </div>
          </div>

          {/* Prevention Advisory */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-card">
            <div className="flex items-center gap-1.5 mb-2.5 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4.5 h-4.5 text-slate-700 shrink-0" />
              Long-term Prevention
            </div>
            <p className="text-xs text-slate-650 leading-relaxed font-medium">
              {selectedLeaf.prevention}
            </p>
          </div>

          {/* Scan Another Button with Gradient and Press scaling */}
          <button
            onClick={resetScanner}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 mt-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Scan Another Crop Leaf
          </button>
        </div>
      )}

    </div>
  );
}
