import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Briefcase, FileCode, CheckCircle, Clock, Calendar, Sparkles, BookOpen, ChevronRight, User, Settings, Star } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, appliedJobIds, savedJobIds, jobs, interviews } = useAppState();

  // Mock application analytics chart data
  const chartData = [
    { name: 'Jan', applications: 2 },
    { name: 'Feb', applications: 5 },
    { name: 'Mar', applications: 8 },
    { name: 'Apr', applications: 12 },
    { name: 'May', applications: 18 },
  ];

  // Map user resume parameters
  const resumeDetails = currentUser.resumeDetails;
  const atsScore = resumeDetails ? resumeDetails.atsScore : 0;

  // Filter recommended jobs based on matching skills (or show highest matching jobs)
  const recommendedJobs = jobs
    .filter(j => j.aiMatch >= 80)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
      
      {/* Left Sidebar Profile Section */}
      <aside className="w-full lg:w-64 flex flex-col gap-6 flex-shrink-0">
        
        {/* Profile Card */}
        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 backdrop-blur-xl rounded-3xl p-5 shadow-sm flex flex-col items-center text-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-lg mb-3"
          />
          <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{currentUser.name}</h3>
          <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 leading-snug">{currentUser.title}</p>
          
          <div className="h-px bg-slate-100 dark:bg-navy-850 w-full my-4" />
          
          <div className="flex justify-around w-full text-center">
            <div>
              <p className="text-base font-extrabold text-slate-800 dark:text-white">{appliedJobIds.length}</p>
              <p className="text-[9px] uppercase font-semibold text-slate-450 tracking-wider">Applied</p>
            </div>
            <div>
              <p className="text-base font-extrabold text-slate-800 dark:text-white">{savedJobIds.length}</p>
              <p className="text-[9px] uppercase font-semibold text-slate-450 tracking-wider">Saved</p>
            </div>
          </div>
        </div>

        {/* Dashboard shortcuts directory */}
        <div className="border border-slate-200/50 dark:border-navy-850 bg-white/50 dark:bg-navy-900/30 backdrop-blur-xl rounded-3xl p-3 flex flex-col gap-1">
          {[
            { icon: User, label: "My Applications", path: "/jobs" },
            { icon: FileCode, label: "Resume Analyzer", path: "/analyzer" },
            { icon: BookOpen, label: "Courses & Skills", path: "/opportunities" },
            { icon: Settings, label: "Account Settings", path: "/contact" }
          ].map(lnk => {
            const Icon = lnk.icon;
            return (
              <Link
                key={lnk.label}
                to={lnk.path}
                className="flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-900/60 dark:hover:text-white transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
                  {lnk.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Stats and Analytics Panel */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Top metrics catalog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-brand-500/10 text-brand-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800 dark:text-white">{appliedJobIds.length}</p>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Active Submissions</p>
            </div>
          </div>

          <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800 dark:text-white">{interviews.length}</p>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Interviews scheduled</p>
            </div>
          </div>

          <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-555">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800 dark:text-white">88%</p>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Average Match Rating</p>
            </div>
          </div>
        </div>

        {/* Central visual graphs and ATS rating row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Applications Area Chart */}
          <div className="md:col-span-2 border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Application Statistics</h4>
              <p className="text-[10px] text-slate-400">Timeline of candidate applications compiled monthly</p>
            </div>
            <div className="h-44 w-full text-xs font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b6beb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b6beb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0b0f19', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="applications" stroke="#3b6beb" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI ATS score card gauge */}
          <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full text-left">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                ATS Analyzer
                <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              </h4>
            </div>

            {currentUser.resumeUploaded ? (
              <div className="flex flex-col items-center gap-2 py-2">
                {/* Visual score circle */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="currentColor" className="text-slate-100 dark:text-navy-850" strokeWidth="6" fill="transparent" />
                    <circle cx="56" cy="56" r="48" stroke="currentColor" className="text-brand-500" strokeWidth="8" fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - atsScore / 100)}
                    />
                  </svg>
                  <span className="absolute text-xl font-extrabold text-slate-800 dark:text-white">{atsScore}%</span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">{resumeDetails.fileName}</p>
                  <p className="text-[9px] text-slate-450 dark:text-slate-400 mt-0.5">Scanned Successfully</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-400">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No Resume Uploaded</p>
                  <p className="text-[9px] text-slate-450 dark:text-slate-400 max-w-[150px] mx-auto mt-0.5 leading-snug">Drop your PDF to calculate dynamic matching metrics.</p>
                </div>
                <button
                  onClick={() => navigate('/analyzer')}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold shadow-md shadow-brand-500/10"
                >
                  Analyze Resume
                </button>
              </div>
            )}

            <div className="w-full h-px bg-slate-100 dark:bg-navy-850 my-2" />
            <Link to="/analyzer" className="text-[10px] font-bold text-brand-500 hover:underline">Improve Resume Profile</Link>
          </div>
        </div>

        {/* AI Recommended Jobs listings */}
        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                AI Compatible Openings
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-650 dark:text-brand-400">Curated</span>
              </h4>
              <p className="text-[10px] text-slate-400">Top corporate match recommendations based on tech keywords</p>
            </div>
            <Link to="/jobs" className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-0.5">Explore All <ChevronRight className="w-3 h-3" /></Link>
          </div>

          <div className="flex flex-col gap-3">
            {recommendedJobs.map(job => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="border border-slate-100 dark:border-navy-850 bg-white/50 dark:bg-navy-950/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-500/30 dark:hover:border-brand-400/30 hover:scale-[1.005] cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-900 flex items-center justify-center font-bold text-sm text-brand-500">
                    {job.logo}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white">{job.title}</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{job.company} • <span className="text-slate-400">{job.location}</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 flex-wrap">
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    {job.skills.slice(0, 3).map(s => (
                      <span key={s} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-500 dark:text-slate-400">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350">{job.salary}</span>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/15">
                      <Star className="w-3 h-3 fill-current" />
                      {job.aiMatch}% Match
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Sidebar Timeline & Alerts panel */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
        
        {/* Interviews schedule list */}
        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-500" />
            Interview Schedule
          </h4>
          
          <div className="flex flex-col gap-3">
            {interviews.length > 0 ? (
              interviews.map(int => (
                <div key={int.id} className="p-3.5 rounded-2xl border border-slate-100 dark:border-navy-850 bg-slate-50/50 dark:bg-navy-950/40 flex flex-col gap-1.5">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white">{int.role}</h5>
                    <span className="text-[9px] font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">{int.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-550 dark:text-slate-400">Interviewer: <span className="text-slate-700 dark:text-slate-300 font-semibold">{int.candidateName}</span></p>
                  
                  <div className="flex items-center gap-3 mt-1 text-[9px] font-bold text-slate-450 dark:text-slate-400 border-t border-slate-200/40 dark:border-navy-800 pt-1.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {int.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {int.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                No interviews scheduled.
              </div>
            )}
          </div>
        </div>

        {/* AI Career insights pill */}
        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-gradient-to-br from-brand-600 to-indigo-650 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="glow-mesh glow-purple top-0 right-0 w-32 h-32 opacity-35" />
          <div className="relative z-10 flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Career Sourcing Match
            </h4>
            <p className="text-sm font-extrabold leading-tight">TypeScript & Next.js skills are in high demand!</p>
            <p className="text-[10.5px] text-brand-100 leading-relaxed">
              We parsed 4 Stripe design requirements and found that developers who list active Next.js rendering concepts receive 3.5x higher search impressions.
            </p>
            <button
              onClick={() => navigate('/opportunities')}
              className="mt-2 w-full py-2.5 rounded-xl bg-white text-brand-650 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow"
            >
              Upskill Opportunities
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
};
