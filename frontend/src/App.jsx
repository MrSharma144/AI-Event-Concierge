import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    // TODO: implement API call in Step 6
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden selection:bg-blue-500/30 font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center sm:pb-8 border-b border-white/10 mb-12 gap-4">
          <div className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <CalendarDays size={32} className="text-blue-500" />
            </div>
            <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              AI Event Concierge
            </span>
          </div>
          <div className="text-slate-400 font-medium text-sm sm:text-base">
            Plan your corporate offsite in seconds
          </div>
        </header>
        
        <main>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {/* Results will be injected here in later steps */}
        </main>
      </div>
    </div>
  );
}

export default App;
