import React from 'react';
import { Github, Twitter, Linkedin, Heart, ExternalLink, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-40 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-2xl font-black text-white mb-6">
              <div className="p-2 bg-blue-600/20 rounded-xl">
                <CalendarDays size={28} className="text-blue-500" />
              </div>
              <span>AI Event Concierge</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
              Revolutionizing corporate event planning through artificial intelligence. 
              Find the perfect venue, optimize budgets, and plan seamlessly in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Search', 'History', 'Features'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}-section`}
                    className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Built With</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Gemini 1.5 Flash
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                React & Vite
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Django REST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-sm font-medium flex items-center gap-1">
            © {currentYear} AI Event Concierge. Built with 
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> 
            by MrSharma
          </div>
          
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: 'https://github.com/MrSharma144' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all border border-white/5"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
