import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export default function HistoryList({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-24">
      <div className="flex items-center gap-3 mb-8 px-4">
        <Clock className="text-slate-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Previous Plans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => (
          <button 
            key={item.id}
            onClick={() => onSelectHistory(item.proposal)}
            className="text-left bg-slate-800/30 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <p className="text-slate-300 font-medium mb-3 line-clamp-2 leading-relaxed italic">
                "{item.query}"
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-semibold px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">
                  {item.proposal?.venue_name}
                </span>
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">
                  {item.proposal?.estimated_cost}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 text-sm text-blue-400 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <span className="flex items-center font-medium">View details <ChevronRight size={16} /></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
