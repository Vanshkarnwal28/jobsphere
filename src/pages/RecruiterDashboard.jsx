import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, FileCode, CheckCircle, Calendar, Plus, Mail, ChevronRight, Check, Trash2, ArrowRight } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';

export const RecruiterDashboard = () => {
  const { candidates, interviews, updateCandidateStage, scheduleInterview } = useAppState();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline', 'shortlist', 'schedule'
  const [candName, setCandName] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Sourcing stats
  const totalApplicants = candidates.length;
  const interviewingCount = candidates.filter(c => c.stage === 'Interviewing').length;
  const offeredCount = candidates.filter(c => c.stage === 'Offered').length;

  // Pipeline columns
  const columns = ['Applied', 'Screening', 'Shortlisted', 'Interviewing', 'Offered'];

  const chartData = [
    { name: 'React', volume: 8 },
    { name: 'TypeScript', volume: 6 },
    { name: 'Python', volume: 4 },
    { name: 'Figma', volume: 5 },
    { name: 'Go', volume: 3 },
  ];

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!candName || !role || !date || !time) {
      addToast('Please complete all form fields.', 'error');
      return;
    }

    scheduleInterview(candName, role, date, time);
    addToast(`Interview scheduled with ${candName}!`, 'success');
    
    // Reset form fields
    setCandName('');
    setRole('');
    setDate('');
    setTime('');
    setActiveTab('pipeline');
  };

  const handleAdvance = (candId, currentStage) => {
    const idx = columns.indexOf(currentStage);
    if (idx < columns.length - 1) {
      const nextStage = columns[idx + 1];
      updateCandidateStage(candId, nextStage);
      addToast(`Candidate advanced to ${nextStage}`, 'success');
    }
  };

  const handleDemote = (candId, currentStage) => {
    const idx = columns.indexOf(currentStage);
    if (idx > 0) {
      const prevStage = columns[idx - 1];
      updateCandidateStage(candId, prevStage);
      addToast(`Candidate demoted to ${prevStage}`, 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8 z-10 relative">
      
      {/* Headings */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-850 dark:text-white">Recruiter Suite</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Evaluate corporate applicants, schedule interviews, and organize Kanban pipeline stages.</p>
        </div>

        {/* Tab Toggle buttons */}
        <div className="border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 rounded-2xl p-1 flex gap-1 w-full sm:w-auto">
          {[
            { id: 'pipeline', label: 'Pipeline Board' },
            { id: 'shortlist', label: 'Candidate Grid' },
            { id: 'schedule', label: 'Book Interview' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow'
                  : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-navy-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recruiter Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-brand-500/10 text-brand-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white">{totalApplicants}</p>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Total Sourced</p>
          </div>
        </div>

        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white">{interviewingCount}</p>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Active Interviews</p>
          </div>
        </div>

        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-555">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white">{offeredCount}</p>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 uppercase font-semibold">Offers Extended</p>
          </div>
        </div>

        <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white">92%</p>
            <p className="text-[10px] text-slate-455 dark:text-slate-400 uppercase font-semibold">Avg ATS Match Rating</p>
          </div>
        </div>
      </div>

      {/* Main Tab content modules */}
      {activeTab === 'pipeline' && (
        <div className="flex flex-col gap-8">
          
          {/* Kanban Board columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4 items-start select-none">
            {columns.map(colName => {
              const colCandidates = candidates.filter(c => c.stage === colName);
              return (
                <div
                  key={colName}
                  className="flex-1 min-w-[220px] border border-slate-200/60 dark:border-navy-850 bg-slate-100/50 dark:bg-navy-900/30 rounded-2xl p-4 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/55 dark:border-navy-850 pb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{colName}</span>
                    <span className="text-[10px] font-bold bg-slate-200 dark:bg-navy-800 px-2 py-0.5 rounded text-slate-650 dark:text-slate-400">{colCandidates.length}</span>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[160px]">
                    {colCandidates.map(cand => (
                      <div
                        key={cand.id}
                        className="border border-slate-200 dark:border-navy-800/80 bg-white dark:bg-navy-950 p-3.5 rounded-xl shadow-sm flex flex-col gap-2 relative overflow-hidden group"
                      >
                        {/* Match ribbon */}
                        <div className="absolute top-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-indigo-500 w-full" />
                        
                        <div className="flex items-center gap-2">
                          <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover" />
                          <div className="min-w-0">
                            <h5 className="text-[11px] font-bold text-slate-800 dark:text-white truncate">{cand.name}</h5>
                            <p className="text-[9px] text-slate-450 truncate">{cand.title}</p>
                          </div>
                        </div>

                        <p className="text-[8.5px] text-slate-400">Position: <span className="text-slate-650 dark:text-slate-300 font-bold truncate">{cand.appliedFor}</span></p>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-navy-900 text-[10px] font-semibold">
                          <span className="text-brand-500 font-extrabold">{cand.atsScore}% ATS</span>
                          
                          {/* Sourcing Stage advancing toggles */}
                          <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            {columns.indexOf(colName) > 0 && (
                              <button
                                onClick={() => handleDemote(cand.id, colName)}
                                className="w-4 h-4 rounded bg-slate-100 dark:bg-navy-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 text-[9px] flex items-center justify-center font-bold"
                              >
                                ‹
                              </button>
                            )}
                            {columns.indexOf(colName) < columns.length - 1 && (
                              <button
                                onClick={() => handleAdvance(cand.id, colName)}
                                className="w-4 h-4 rounded bg-slate-100 dark:bg-navy-800 hover:bg-brand-500/10 hover:text-brand-500 text-slate-400 text-[9px] flex items-center justify-center font-bold"
                              >
                                ›
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'shortlist' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main shortlist Grid Table */}
          <div className="lg:col-span-2 border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-navy-800 pb-3">
                  <th className="text-[10px] uppercase font-bold text-slate-450 tracking-wider p-3">Applicant Name</th>
                  <th className="text-[10px] uppercase font-bold text-slate-455 tracking-wider p-3">Target Role</th>
                  <th className="text-[10px] uppercase font-bold text-slate-450 tracking-wider p-3 text-center">ATS Rating</th>
                  <th className="text-[10px] uppercase font-bold text-slate-455 tracking-wider p-3 text-center">Pipeline State</th>
                  <th className="text-[10px] uppercase font-bold text-slate-450 tracking-wider p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(cand => (
                  <tr key={cand.id} className="border-b border-slate-100/50 dark:border-navy-850 hover:bg-slate-50/50 dark:hover:bg-navy-950/20 transition-all">
                    <td className="p-3 flex items-center gap-3">
                      <img src={cand.avatar} alt={cand.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">{cand.name}</p>
                        <p className="text-[9px] text-slate-450 mt-1">{cand.email}</p>
                      </div>
                    </td>
                    <td className="p-3 text-xs font-bold text-slate-700 dark:text-slate-355">{cand.appliedFor}</td>
                    <td className="p-3 text-xs font-extrabold text-brand-500 text-center">{cand.atsScore}%</td>
                    <td className="p-3 text-center">
                      <span className="text-[9px] font-bold bg-brand-500/10 text-brand-650 dark:text-brand-400 px-2 py-0.5 rounded-full">{cand.stage}</span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => addToast(`Messaged ${cand.name}!`, 'success')}
                        className="text-[10px] font-bold text-brand-500 hover:underline flex items-center gap-0.5"
                      >
                        Contact <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar Chart Sourcing Volumes Column */}
          <div className="border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-850 dark:text-white">Competencies Sourced</h4>
              <p className="text-[10px] text-slate-400">Total shortlisted metrics cataloged by skill groups</p>
            </div>
            <div className="h-48 w-full text-xs font-semibold mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0b0f19', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  <Bar dataKey="volume" fill="#3b6beb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="max-w-xl mx-auto w-full border border-slate-200/60 dark:border-navy-800/40 bg-white/70 dark:bg-navy-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-500" />
              Schedule Candidate Interview
            </h4>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5">Scheduling an interview registers it dynamically in the Candidate Schedule timeline.</p>
          </div>

          <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate Name</label>
              <select
                value={candName}
                onChange={(e) => setCandName(e.target.value)}
                className="p-3 bg-slate-50/50 dark:bg-navy-950/40 border border-slate-200 dark:border-navy-800/50 rounded-xl outline-none text-xs text-slate-700 dark:text-slate-200 focus:border-brand-500"
                required
              >
                <option value="">Select Candidate...</option>
                {candidates.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Interview Position</label>
              <input
                type="text"
                placeholder="e.g. Senior UX Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 bg-slate-50/50 dark:bg-navy-950/40 border border-slate-200 dark:border-navy-800/50 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-3 bg-slate-50/50 dark:bg-navy-950/40 border border-slate-200 dark:border-navy-800/50 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Select Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-3 bg-slate-50/50 dark:bg-navy-950/40 border border-slate-200 dark:border-navy-800/50 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-brand-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all mt-2"
            >
              Schedule Sourcing Interview
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
