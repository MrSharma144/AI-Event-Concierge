import React from 'react';
import { MapPin, DollarSign, Sparkles, Building2 } from 'lucide-react';

export default function ProposalCard({ proposal }) {
  if (!proposal) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all hover:border-blue-500/30">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-blue-400" size={28} />
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          AI Venue Proposal
        </h2>
      </div>

      <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Venue Name</p>
                <p className="text-xl font-semibold text-white">{proposal.venue_name}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Location</p>
                <p className="text-lg text-white">{proposal.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Estimated Cost</p>
              <p className="text-2xl font-bold text-emerald-400">{proposal.estimated_cost}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
          Why this fits your event
        </h3>
        <p className="text-slate-300 leading-relaxed text-lg bg-slate-800/30 p-5 rounded-2xl border border-white/5">
          {proposal.justification}
        </p>
      </div>
    </div>
  );
}
