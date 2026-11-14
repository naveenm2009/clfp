import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardCard } from '../components/DashboardCard';
import { ItemCard } from '../components/ItemCard';
import { MatchCard } from '../components/MatchCard';
import { DemoProfileModal } from '../components/DemoProfileModal';
import { 
  User, 
  HelpCircle, 
  PackageSearch, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Edit3, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, items, matches, stats } = useApp();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-lost' | 'my-found' | 'my-matches'>('my-lost');

  // Filter items reported by current demo student
  const myLostItems = items.filter(
    (item) =>
      item.type === 'lost' &&
      (item.reporterName.toLowerCase() === profile.name.toLowerCase() ||
        item.reporterStudentId.toLowerCase() === profile.studentId.toLowerCase())
  );

  const myFoundItems = items.filter(
    (item) =>
      item.type === 'found' &&
      (item.reporterName.toLowerCase() === profile.name.toLowerCase() ||
        item.reporterStudentId.toLowerCase() === profile.studentId.toLowerCase())
  );

  // Matches where either the lost or found item belongs to this student
  const myMatches = matches.filter(
    (m) =>
      m.lostItem.reporterName.toLowerCase() === profile.name.toLowerCase() ||
      m.lostItem.reporterStudentId.toLowerCase() === profile.studentId.toLowerCase() ||
      m.foundItem.reporterName.toLowerCase() === profile.name.toLowerCase() ||
      m.foundItem.reporterStudentId.toLowerCase() === profile.studentId.toLowerCase()
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Student Profile Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{profile.name}</h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Roll No: <span className="font-semibold text-white">{profile.studentId}</span> • {profile.department}
            </p>
            <p className="text-xs text-slate-400">{profile.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/15 backdrop-blur-md"
          >
            <Edit3 className="w-4 h-4 text-teal-300" />
            <span>Switch / Edit Persona</span>
          </button>
          <Link
            to="/report-lost"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Report</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="My Lost Reports"
          value={myLostItems.length}
          subtitle="Items you reported lost"
          icon={HelpCircle}
          variant="navy"
        />
        <DashboardCard
          title="My Found Reports"
          value={myFoundItems.length}
          subtitle="Items you found & registered"
          icon={PackageSearch}
          variant="teal"
        />
        <DashboardCard
          title="My Possible Matches"
          value={myMatches.length}
          subtitle="Matches linked to your reports"
          icon={Sparkles}
          variant="amber"
          badge={myMatches.length > 0 ? 'Review Needed' : 'None'}
        />
        <DashboardCard
          title="Campus Total Returns"
          value={stats.totalReturned}
          subtitle="Campus-wide returned items"
          icon={CheckCircle2}
          variant="emerald"
        />
      </div>

      {/* Tabs for Student's Activity */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">My Campus Activity</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Demo Portal
            </span>
          </div>

          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('my-lost')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'my-lost'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Lost Items ({myLostItems.length})
            </button>
            <button
              onClick={() => setActiveTab('my-found')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'my-found'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Found Items ({myFoundItems.length})
            </button>
            <button
              onClick={() => setActiveTab('my-matches')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'my-matches'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Possible Matches ({myMatches.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: My Lost Items */}
        {activeTab === 'my-lost' && (
          <div>
            {myLostItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {myLostItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-semibold text-slate-700 text-base">You haven't reported any lost items</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Misplaced an ID card, water bottle, or books? Report it now so our smart matching can notify you when found.
                </p>
                <Link
                  to="/report-lost"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 text-white font-semibold text-xs transition-colors hover:bg-navy-800"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report Lost Item</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Found Items */}
        {activeTab === 'my-found' && (
          <div>
            {myFoundItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {myFoundItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                <PackageSearch className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-semibold text-slate-700 text-base">You haven't submitted any found items</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Found someone's lost keys or charger in a lab or classroom? Report it here to help a fellow classmate.
                </p>
                <Link
                  to="/report-found"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs transition-colors hover:bg-teal-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report Found Item</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: My Matches */}
        {activeTab === 'my-matches' && (
          <div>
            {myMatches.length > 0 ? (
              <div className="space-y-4">
                {myMatches.map((m, idx) => (
                  <MatchCard key={idx} match={m} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-semibold text-slate-700 text-base">No active matches for your items</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When a found report closely resembles one of your lost items (or vice-versa), our algorithm will automatically suggest it here.
                </p>
                <Link
                  to="/matches"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white font-semibold text-xs transition-colors hover:bg-amber-600"
                >
                  <span>View All Campus Matches ({matches.length})</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <DemoProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
