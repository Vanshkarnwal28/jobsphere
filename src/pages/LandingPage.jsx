import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, LineChart, Award, ChevronDown, CheckCircle2, Bot, Star } from 'lucide-react';
import { TESTIMONIALS, FAQS, COMPANYS } from '../data/mockData';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const bentoFeatures = [
    {
      title: "Holographic Resume Scanner",
      desc: "Upload a standard PDF and watch our high-performance parser scan and rank it against target templates in real-time.",
      icon: Zap,
      color: "from-blue-500/10 to-indigo-500/10 text-brand-500",
      gridSpan: "md:col-span-2"
    },
    {
      title: "ATS Smart Matcher",
      desc: "Uncover missing high-impact industry keywords and get direct suggestions to double your review triggers.",
      icon: Target,
      color: "from-purple-500/10 to-pink-500/10 text-purple-500",
      gridSpan: "md:col-span-1"
    },
    {
      title: "Kanban Pipeline Suite",
      desc: "For recruiters, drag-and-drop applicant stages with automated visual stats metrics synchronized perfectly.",
      icon: LineChart,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-550",
      gridSpan: "md:col-span-1"
    },
    {
      title: "Student Challenges Hub",
      desc: "Enter competitive hackathons, interactive webinars, mentorship workshops, and challenge dashboards like Unstop.",
      icon: Award,
      color: "from-amber-500/10 to-orange-500/10 text-amber-500",
      gridSpan: "md:col-span-2"
    }
  ];

  return (
    <div className="flex flex-col gap-20 py-10">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-6 z-10 pt-10 md:pt-16">
        {/* Banner Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10 text-brand-650 dark:text-brand-400 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Future of AI Hiring is Here
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.1]"
        >
          Land Your Next Role With{' '}
          <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">
            JobSphere AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
        >
          An ultra-premium, AI-powered workspace mapping professional resume scans, student opportunities, and recruiters' Kanban pipelines on a single platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <button
            onClick={() => navigate('/analyzer')}
            className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Scan Your Resume
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/jobs')}
            className="px-8 py-3.5 rounded-2xl border border-slate-250 dark:border-navy-800 bg-white/40 dark:bg-navy-900/40 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Explore Job Openings
          </button>
        </motion.div>
      </section>

      {/* Trusted Companies */}
      <section className="border-y border-slate-200/50 dark:border-navy-800/40 py-10 bg-slate-100/30 dark:bg-navy-950/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Empowering candidates hired at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {COMPANYS.map((company, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                <span className="text-xl md:text-2xl font-bold font-mono">{company.logo}</span>
                <span className="text-xs font-semibold tracking-wider">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border border-slate-200/60 dark:border-navy-800/40 bg-white/50 dark:bg-navy-900/30 backdrop-blur-xl rounded-3xl">
          {[
            { value: "98.4%", label: "ATS Scan Precision" },
            { value: "480k+", label: "Successful Hires" },
            { value: "12,000+", label: "Active Sponsors" },
            { value: "14 Days", label: "Average Time-to-Hire" }
          ].map((stat, i) => (
            <div key={i} className="text-center flex flex-col gap-1.5">
              <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">{stat.value}</span>
              <span className="text-[10px] md:text-xs font-semibold text-slate-400 tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Scan Interactive Preview */}
      <section className="max-w-5xl mx-auto px-4 w-full z-10">
        <div className="border border-slate-250/60 dark:border-navy-850 bg-slate-100/50 dark:bg-navy-900/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="glow-mesh glow-blue top-0 left-0 w-60 h-60 opacity-10" />
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-850 dark:text-white">Smart Parsing Animation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Experience the futuristic neon glow scan immediately. We identify missing attributes and benchmark your score against linear benchmarks.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              {[
                "Instant Circular ATS Score calculation",
                "Extraction of critical tech keywords",
                "100% Client-side privacy-first PDF scanner"
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-350">
                  <CheckCircle2 className="w-4 h-4 text-emerald-555" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-80 h-56 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-950 p-4 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            {/* Holographic scanner effect line */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-laser shadow-lg shadow-brand-500/55" />
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-900 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-rose-500 flex items-center justify-center text-[8px] font-bold text-white">PDF</div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">resume_2026.pdf</span>
              </div>
              <span className="text-[9px] font-bold text-brand-500 animate-pulse bg-brand-500/10 px-2 py-0.5 rounded">Scanning</span>
            </div>

            <div className="flex-1 py-4 flex flex-col justify-center gap-2">
              <div className="h-2.5 bg-slate-100 dark:bg-navy-900 rounded-full w-3/4 animate-pulse" />
              <div className="h-2.5 bg-slate-100 dark:bg-navy-900 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="h-2.5 bg-slate-100 dark:bg-navy-900 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>

            <div className="flex items-center justify-between border-t border-slate-150 dark:border-navy-900 pt-2 text-[9px] font-semibold text-slate-400">
              <span>Checking Core Keywords...</span>
              <span className="text-slate-500">85% Complete</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white">Built for Scalable Hiring</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">JobSphere integrates features from Unstop, Naukri, and LinkedIn into a premium SaaS dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`${feat.gridSpan} border border-slate-200/60 dark:border-navy-800/40 bg-white/50 dark:bg-navy-900/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-brand-500/40 dark:hover:border-brand-400/40 transition-all duration-350 shadow-md group`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-850 dark:text-white mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Review Section */}
      <section className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white">Validated by Success</h2>
          <p className="text-xs text-slate-550 dark:text-slate-400 mt-2">Hear from candidates, developers, and recruiters using our platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="border border-slate-200/50 dark:border-navy-850 bg-white dark:bg-navy-900/40 rounded-3xl p-6 flex flex-col justify-between shadow-md"
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs italic text-slate-600 dark:text-slate-350 leading-relaxed mb-6">"{test.text}"</p>
              <div className="flex items-center gap-3">
                <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">{test.name}</p>
                  <p className="text-[10px] text-slate-450 dark:text-slate-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Collapsible section */}
      <section className="max-w-3xl mx-auto px-4 w-full flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-850 dark:text-white">Common Inquiries</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Clear answers regarding scanner privacy, recruiter modes, and pricing packages.</p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200/60 dark:border-navy-800/40 bg-white/40 dark:bg-navy-900/30 backdrop-blur-md rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {faq.question}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-350 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-350 leading-relaxed border-t border-slate-100 dark:border-navy-850">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
