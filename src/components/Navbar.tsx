import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DemoProfileModal } from './DemoProfileModal';
import { 
  Compass, 
  Search, 
  Sparkles, 
  LayoutDashboard, 
  ShieldCheck, 
  PlusCircle, 
  Menu, 
  X,
  User,
  CheckCircle2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { profile, matches } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lost Items', path: '/lost-items' },
    { name: 'Found Items', path: '/found-items' },
    { 
      name: 'Possible Matches', 
      path: '/matches',
      badge: matches.length > 0 ? matches.length : undefined
    },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Admin Desk', path: '/admin' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-navy-900 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-navy-950 group-hover:text-teal-700 transition-colors">
                    Campus Lost & Found
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    Portal
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Student Belongings Recovery System
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      active
                        ? 'text-teal-700 bg-teal-50/80 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge !== undefined && (
                      <span className="text-[11px] font-bold bg-amber-500 text-white px-1.5 py-0.2 rounded-full shadow-2xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions & Demo Profile */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                to="/report-lost"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4 text-teal-400" />
                <span>Report Lost</span>
              </Link>
              <Link
                to="/report-found"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Report Found</span>
              </Link>

              {/* Demo Profile pill */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all text-left shadow-2xs"
                title="Switch demo student profile"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300"
                />
                <div className="hidden xl:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight">{profile.name}</span>
                  <span className="text-[10px] text-slate-500 leading-none">{profile.studentId}</span>
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-600"
                title="Demo profile"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <Link
                to="/report-lost"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-900 text-white font-semibold text-xs text-center"
              >
                <PlusCircle className="w-4 h-4 text-teal-400" />
                <span>Report Lost</span>
              </Link>
              <Link
                to="/report-found"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-600 text-white font-semibold text-xs text-center"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Report Found</span>
              </Link>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'text-teal-700 bg-teal-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge !== undefined && (
                      <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                        {link.badge} matches
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Demo Profile Switcher Modal */}
      <DemoProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};
