import React, { useState, useEffect } from 'react';
import { CalendarDays, AlertCircle } from 'lucide-react';
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center sm:pb-8 border-b border-white/10 mb-12 gap-4">
          <div className="flex items-center gap-3 text-2xl font-bold text-white cursor-pointer" onClick={() => {setCurrentProposal(null); setError(null);}}>
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <CalendarDays size={32} className="text-blue-500" />
            </div>
            <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 hover:text-white transition-colors">
              AI Event Concierge
            </span>
          </div>
          <div className="text-slate-400 font-medium text-sm sm:text-base">
            Plan your corporate offsite in seconds
          </div>
        </header>
        
        <main>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          {error && (
            <div className="max-w-3xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          {!isLoading && currentProposal && <ProposalCard proposal={currentProposal} />}
          {!isLoading && !currentProposal && <HistoryList history={history} onSelectHistory={setCurrentProposal} />}
        </main>
      </div>
    </div>
  );
}

export default App;
