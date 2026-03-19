import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
        Design the perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">corporate offsite</span>
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
        Tell our AI what type of event you need, your budget, and timeframe. We'll find the perfect venue.
      </p>
      
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-center p-2 rounded-3xl sm:rounded-full max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/20"
      >
        <div className="hidden sm:block pl-6 pr-2">
          <Search className="text-slate-400" size={24} />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., A 10-person leadership retreat in the mountains for 3 days with a $4k budget" 
          disabled={isLoading}
          className="w-full bg-transparent border-none text-white text-lg p-4 sm:p-2 outline-none placeholder:text-slate-500 rounded-2xl"
        />
        <button 
          type="submit" 
          disabled={!query.trim() || isLoading}
          className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none py-4 sm:py-3 px-8 rounded-2xl sm:rounded-full text-lg font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isLoading ? 'Planning...' : (
            <>
              Plan Event
              <Sparkles size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
