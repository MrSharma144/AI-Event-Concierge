import React from 'react';
import { MapPin, DollarSign, Sparkles, Building2 } from 'lucide-react';

export default function ProposalCard({ proposal }) {
  if (!proposal) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
      
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 shadow-inner">
            <Sparkles size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Perfect Fix</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">AI Curated Proposal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-3 text-blue-400">
            <Building2 size={20} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Venue</span>
          </div>
          <p className="text-xl font-bold text-white leading-tight">{proposal.venue_name}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-3 text-purple-400">
            <MapPin size={20} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Location</span>
          </div>
          <p className="text-xl font-bold text-white leading-tight">{proposal.location}</p>
        </div>

        <div className="bg-emerald-500/5 backdrop-blur-md rounded-3xl p-6 border border-emerald-500/10 hover:border-emerald-500/20 transition-colors">
          <div className="flex items-center gap-3 mb-3 text-emerald-400">
            <DollarSign size={20} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Estimation</span>
          </div>
          <p className="text-3xl font-black text-emerald-400">{proposal.estimated_cost}</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="bg-slate-950/50 rounded-[2rem] p-8 border border-white/5 shadow-inner">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Strategic Justification</h3>
          <p className="text-slate-300 leading-relaxed text-lg font-medium italic">
            "{proposal.justification}"
          </p>
        </div>
      </div>
    </div>
  );
}
