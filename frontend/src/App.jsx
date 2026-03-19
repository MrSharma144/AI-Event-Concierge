import React from 'react';
import { CalendarDays } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <CalendarDays size={32} color="#3b82f6" />
          <span className="gradient-text">AI Event Concierge</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
          Plan your corporate offsite in seconds
        </div>
      </header>
      
      <main>
        {/* Search Interface and Results will be injected here in later steps */}
      </main>
    </div>
  );
}

export default App;
