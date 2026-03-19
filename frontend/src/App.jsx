import React, { useState, useEffect } from 'react';
import { CalendarDays, AlertCircle, History, LayoutDashboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';
import ProposalCard from './components/ProposalCard';
import HistoryList from './components/HistoryList';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history/`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setCurrentProposal(null);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/propose/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCurrentProposal(data);
        fetchHistory(); // refresh history
      } else {
        setError(data.error || 'Failed to generate proposal.');
      }
    } catch (err) {
      setError('Network error. Please make sure the Django server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden selection:bg-blue-500/30 font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center sm:pb-8 border-b border-white/5 mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-2xl font-bold text-white cursor-pointer group" 
            onClick={() => {setCurrentProposal(null); setError(null);}}
          >
            <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-all duration-300">
              <CalendarDays size={32} className="text-blue-500" />
            </div>
            <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:from-white group-hover:to-white transition-all duration-300">
              AI Event Concierge
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 sm:gap-8"
          >
            <button 
              onClick={() => document.getElementById('history-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-medium text-sm sm:text-base group"
            >
              <History size={18} className="group-hover:rotate-[-20deg] transition-transform" />
              <span>History</span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="hidden md:flex items-center gap-2 text-slate-400 font-medium text-sm">
              <Sparkles size={16} className="text-yellow-500/50" />
              Powered by Gemini 1.5 Flash
            </div>
          </motion.div>
        </header>
        
        <main className="space-y-24">
          <section id="search-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-3xl mx-auto mt-8 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400"
                >
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-12"
                >
                  <LoadingSpinner />
                </motion.div>
              )}

              {!isLoading && currentProposal && (
                <motion.div 
                  key="proposal"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="mt-12"
                >
                  <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <LayoutDashboard size={20} className="text-blue-500" />
                      Current Result
                    </h2>
                    <button 
                      onClick={() => setCurrentProposal(null)}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      Clear result
                    </button>
                  </div>
                  <ProposalCard proposal={currentProposal} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section id="history-section" className="pt-24 border-t border-white/5 pb-20">
            <HistoryList history={history} onSelectHistory={(prop) => {
              setCurrentProposal(prop);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
