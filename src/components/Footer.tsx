import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Compass, RotateCcw, MapPin, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetDemoData } = useApp();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-12 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-navy-800">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Campus Lost & Found
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Lost something? Let's help you find it." A centralized, transparent platform connecting students across campus to recover misplaced belongings quickly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-950 text-teal-400 border border-teal-800 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Campus Design Thinking Prototype</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Portal Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/lost-items" className="hover:text-teal-400 transition-colors">Lost Belongings List</Link>
              </li>
              <li>
                <Link to="/found-items" className="hover:text-teal-400 transition-colors">Found Items Inventory</Link>
              </li>
              <li>
                <Link to="/matches" className="hover:text-teal-400 transition-colors">Smart Matching Engine</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-teal-400 transition-colors">Admin Verification Desk</Link>
              </li>
            </ul>
          </div>

          {/* Campus Desk Info */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Campus Helpdesk</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Student Welfare Centre, Ground Floor, Room 102</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Monday – Friday: 09:00 AM – 05:30 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>lostandfound@campus.edu</span>
              </li>
            </ul>
          </div>

          {/* Prototype Controls */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Reviewer Sandbox</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Need to restart the demonstration with a fresh sample dataset of matched items?
            </p>
            <button
              onClick={resetDemoData}
              className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-all hover:border-teal-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Demo Data</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Stores data in browser LocalStorage. No backend or paid API required.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Campus Lost & Found Portal. Designed for College Design Thinking Showcase.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
