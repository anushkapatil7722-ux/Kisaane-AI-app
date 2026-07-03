import React from 'react';

export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-2 sm:p-6 overflow-hidden">
      {/* Outer Glow / Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(34,197,94,0.1),transparent_60%)] pointer-events-none" />
      
      {/* Phone Wrapper (Visible Mockup on Desktop, Clean Fullscreen on Mobile) */}
      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-[844px] bg-[#fcfdfa] sm:rounded-[50px] sm:shadow-[0_0_0_12px_#1e293b,0_0_0_13px_#334155,0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col border border-slate-800/80 sm:border-4 sm:border-slate-800">
        
        {/* Top Spacer for curved corners on desktop */}
        <div className="hidden sm:block h-6 shrink-0 bg-[#fdfdfc]" />

        {/* Dynamic App Content Area */}
        <div className="flex-1 w-full overflow-hidden flex flex-col bg-[#fdfdfc]">
          {children}
        </div>

        {/* Home Indicator (iOS Bar style) */}
        <div className="h-5 w-full bg-[#fdfdfc] flex items-center justify-center pb-1 z-40 sm:block hidden shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
