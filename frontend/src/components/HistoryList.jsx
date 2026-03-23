import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, Sparkles, X, MapPin, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HistoryList({ history, onSelectHistory }) {
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Background scroll lock logic
  useEffect(() => {
    if (selectedRecord) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRecord]);

  if (!history || history.length === 0) return null;

  const fallbackImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="w-full max-w-6xl mx-auto mt-24 pb-32">
      <div className="flex items-center gap-3 mb-10 px-4">
        <Clock className="text-blue-500" size={28} />
        <h2 className="text-3xl font-black text-white tracking-tight">Previous Plans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {history.map((item) => {
          const mainPhoto = item.proposals && item.proposals.length > 0 ? item.proposals[0].image_url : fallbackImage;
          
          return (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-blue-500/30 rounded-[2rem] transition-all duration-300 shadow-xl overflow-hidden flex flex-col"
              onClick={() => setSelectedRecord(item)}
            >
              {/* Card Image Wrapper */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={mainPhoto || fallbackImage} 
                  alt="Event Venue" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                   <span className="text-[10px] font-mono text-slate-300">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Recently'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                    <Building2 size={18} />
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {item.proposals && item.proposals.length > 0 ? item.proposals[0].venue_name : 'No Venue'}
                  {item.proposals && item.proposals.length > 1 && (
                    <span className="ml-2 text-xs text-blue-500">+{item.proposals.length - 1} more</span>
                  )}
                </h3>
                <p className="text-slate-400 text-sm italic line-clamp-2 leading-relaxed opacity-60 mb-4 flex-1">
                  "{item.query}"
                </p>

                <div className="mt-auto flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:border-blue-500/20 transition-colors">
                  <span className="text-emerald-400 font-bold text-sm tracking-tight">
                    {item.proposals && item.proposals.length > 0 ? item.proposals[0].estimated_cost : 'N/A'}
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          );
        })}
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
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-2xl scrollbar-hide flex flex-col"
            >
              {/* Header with Background Image (from first proposal) */}
              <div className="relative h-60 w-full flex-shrink-0">
                <img 
                  src={selectedRecord.proposals?.[0]?.image_url || fallbackImage} 
                  alt="Venue" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all border border-white/10 z-20"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-6 left-10 z-10">
                  <div className="flex items-center gap-3 text-blue-400 mb-2">
                    <Sparkles size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                      {selectedRecord.proposals?.length > 1 ? `${selectedRecord.proposals.length} Proposals Found` : 'Individual Proposal'}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white">Event Summary</h3>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Your Original Request:</p>
                  <p className="text-slate-300 italic font-medium leading-relaxed">"{selectedRecord.query}"</p>
                </div>

                <div className="space-y-8">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] px-2">Detailed Options</h4>
                  {selectedRecord.proposals?.map((prop, idx) => (
                    <div key={idx} className="group/item bg-slate-900/30 p-2 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex flex-col md:flex-row gap-6 p-4">
                        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                          <img src={prop.image_url || fallbackImage} alt={prop.venue_name} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <h5 className="text-xl font-bold text-white group-hover/item:text-blue-400 transition-colors">{prop.venue_name}</h5>
                            <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-lg text-sm">{prop.estimated_cost}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <MapPin size={14} />
                            <span>{prop.location}</span>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-white/5 pl-4 py-1">"{prop.justification}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      onSelectHistory(selectedRecord);
                      setSelectedRecord(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3"
                  >
                    Load into Dashboard
                    <ChevronRight size={18} />
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
