import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 max-w-lg mx-auto text-center gap-6 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-pulse">
      <Loader2 className="animate-spin text-blue-500" size={56} />
      <div>
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI is planning your event...
        </span>
      </div>
      <p className="text-slate-400 text-base">
        Analyzing venues, optimizing locations, and calculating estimates so you don't have to.
      </p>
    </div>
  );
}
