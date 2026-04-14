// Campus Pace - Ultimate Force Update - 2026-04-11
// Campus Pace - Global Synchronization & Stabilization Update - 2026-04-11
// Campus Pace - Stable Upload & Sync Update - 2026-04-11
import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, Search, Bell, LayoutDashboard, Building2, 
  Calendar, TreePine, Settings, LogOut, FileText, 
  CloudOff, Download, ChevronRight, TrendingUp,
  BarChart3, PieChart, Users
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { calculateImpact } from '../lib/utils';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [impact, setImpact] = useState({ total_pages: 850000, department_stats: [] });

  useEffect(() => {
    fetch('/api/impact/summary').then(res => res.json()).then(setImpact);
  }, []);

  const stats = calculateImpact(impact.total_pages);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col fixed h-full z-20">
        <div className="p-8 flex items-center gap-2 text-on-surface">
          <Leaf className="text-primary w-8 h-8" />
          <span className="text-xl font-bold italic">Campus pace</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">Menu</p>
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<Building2 size={20} />} label="Departments" />
          <NavItem icon={<Calendar size={20} />} label="Semesters" />
          <NavItem icon={<TreePine size={20} />} label="Eco-Tracking" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
          
          <p className="px-4 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-8 mb-4">Insights</p>
          <NavItem icon={<BarChart3 size={20} />} label="Reports" />
          <NavItem icon={<PieChart size={20} />} label="Leaderboard" />
        </nav>

        <div className="p-6 border-t border-outline-variant">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border border-outline-variant">
              <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">{user?.name}</p>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase">{user?.role}</p>
            </div>
            <button onClick={logout} className="text-on-surface-variant hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm text-on-surface text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-container-lowest" />
            </button>
            <button className="px-6 py-2.5 organic-gradient text-on-primary text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              <Download size={18} /> Export Report
            </button>
          </div>
        </header>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-on-surface mb-2">Impact Dashboard</h1>
          <p className="text-on-surface-variant font-medium">Real-time metrics on paperless adoption and environmental savings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ImpactCard 
            icon={<TreePine />} 
            label="Trees Saved" 
            value="1,245" 
            trend="+12%" 
            color="primary"
          />
          <ImpactCard 
            icon={<CloudOff />} 
            label="CO2 Reduction" 
            value="450 kg" 
            trend="+8%" 
            color="blue"
          />
          <ImpactCard 
            icon={<FileText />} 
            label="Pages Saved" 
            value="850k" 
            trend="+25%" 
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <section className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-on-surface">Departmental Comparison</h2>
              <button className="text-sm font-bold text-primary hover:underline">View Details</button>
            </div>
            <div className="flex items-end justify-between h-64 gap-4 px-4">
              {[
                { label: 'Engineering', val: 85 },
                { label: 'Law', val: 45 },
                { label: 'Arts', val: 60 },
                { label: 'Sciences', val: 72 },
                { label: 'Business', val: 90 }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="w-full bg-surface-container-low rounded-t-xl relative h-full flex items-end overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-primary/20 group-hover:bg-primary/40 transition-colors relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{bar.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-on-surface">Semester-wise Adoption</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/40">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Current
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/40">
                  <div className="w-2 h-2 rounded-full bg-outline-variant" /> Previous
                </div>
              </div>
            </div>
            <div className="h-64 relative">
              {/* Simulated Line Chart */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path 
                  d="M0,180 L100,150 L200,100 L300,120 L400,40" 
                  fill="none" 
                  stroke="#006a2b" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="drop-shadow-lg"
                />
                <path 
                  d="M0,190 L100,170 L200,150 L300,160 L400,130" 
                  fill="none" 
                  stroke="var(--color-outline-variant)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="flex justify-between mt-4">
                {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'].map((sem, i) => (
                  <span key={i} className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{sem}</span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="bg-surface-container-lowest rounded-[2rem] shadow-sm border border-outline-variant overflow-hidden">
          <div className="p-8 border-b border-outline-variant flex items-center justify-between">
            <h2 className="text-xl font-black text-on-surface">Recent Eco-Actions</h2>
            <button className="text-sm font-bold text-primary hover:underline font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                  <th className="px-8 py-4">Department</th>
                  <th className="px-8 py-4">Action Type</th>
                  <th className="px-8 py-4">Saved</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { dept: "Engineering Dept", type: "Assignment Submission", saved: "1,200 Pages", date: "Oct 24, 2023", status: "Verified", color: "blue" },
                  { dept: "Law School", type: "Digital Examining", saved: "450 Pages", date: "Oct 23, 2023", status: "Verified", color: "purple" },
                  { dept: "Arts & Design", type: "Portfolio Review", saved: "320 Pages", date: "Oct 22, 2023", status: "Pending", color: "orange" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/30 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary`}>
                          <Building2 size={18} />
                        </div>
                        <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{row.dept}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{row.type}</td>
                    <td className="px-8 py-5 text-sm font-black text-on-surface">{row.saved}</td>
                    <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{row.date}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        row.status === 'Verified' ? 'bg-primary-container/30 text-primary' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
      active ? 'bg-primary-container/20 text-primary' : 'text-on-surface-variant/60 hover:bg-surface-container-low hover:text-on-surface'
    }`}>
      {icon}
      {label}
    </button>
  );
}

function ImpactCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary-container/20 text-primary',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant relative overflow-hidden group hover:border-primary/20 transition-all">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <div className="scale-[4]">{icon}</div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>
            {icon}
          </div>
          <h3 className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">{label}</h3>
        </div>
        <div>
          <p className="text-4xl font-black text-on-surface mb-2">{value}</p>
          <div className="flex items-center gap-2">
            <span className="flex items-center text-[10px] font-bold text-primary bg-primary-container/30 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1" /> {trend}
            </span>
            <span className="text-[10px] font-medium text-on-surface-variant/40">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
