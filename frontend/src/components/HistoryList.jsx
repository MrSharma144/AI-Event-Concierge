import React, { useState } from 'react';
import { Clock, ChevronRight, Sparkles, X, MapPin, DollarSign, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HistoryList({ history, onSelectHistory }) {
  const [selectedRecord, setSelectedRecord] = useState(null);

  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-24 pb-32">
      <div className="flex items-center gap-3 mb-10 px-4">
        <Clock className="text-blue-500" size={28} />
        <h2 className="text-3xl font-black text-white tracking-tight">Previous Plans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {history.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group cursor-pointer bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-blue-500/30 p-6 rounded-3xl transition-all duration-300 shadow-xl"
            onClick={() => setSelectedRecord(item)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <Building2 size={20} />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-black/40 px-2 py-1 rounded-full border border-white/5">
                {item.created_at ? new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Recently'}
              </span>
            </div>

            <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
              {item.proposals && item.proposals.length > 0 ? item.proposals[0].venue_name : 'No Venue'}
              {item.proposals && item.proposals.length > 1 && (
                <span className="ml-2 text-xs text-blue-500">+{item.proposals.length - 1} more</span>
              )}
            </h3>
            <p className="text-slate-400 text-sm italic line-clamp-2 leading-relaxed opacity-60">
              "{item.query}"
            </p>

            <div className="mt-6 flex justify-between items-center bg-white/5 p-3 rounded-2xl">
              <span className="text-emerald-400 font-bold text-sm tracking-tight">
                {item.proposals && item.proposals.length > 0 ? item.proposals[0].estimated_cost : 'N/A'}
              </span>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal - Details Popup */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedRecord(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950/90 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl scrollbar-hide"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedRecord(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8 text-blue-400">
                <Sparkles size={24} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">
                  {selectedRecord.proposals?.length > 1 ? `${selectedRecord.proposals.length} Proposals Found` : 'Individual Proposal'}
                </span>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Your Query:</p>
                  <p className="text-slate-300 italic font-medium">"{selectedRecord.query}"</p>
                </div>

                <div className="space-y-6">
                  {selectedRecord.proposals?.map((prop, idx) => (
                    <div key={idx} className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-bold text-white">{prop.venue_name}</h4>
                        <span className="text-emerald-400 font-bold">{prop.estimated_cost}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={14} />
                        <span>{prop.location}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed italic">"{prop.justification}"</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      onSelectHistory(selectedRecord);
                      setSelectedRecord(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    View in Main Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
