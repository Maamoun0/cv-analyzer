"use client";

import { useEffect, useState } from "react";
import { getAnalysis } from "@/services/api";
import JobMatcher from "./JobMatcher";
import RewriteTool from "./RewriteTool";

interface AnalysisDashboardProps {
  jobId: string;
}

export default function AnalysisDashboard({ jobId }: AnalysisDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const response = await getAnalysis(jobId);
        if (response.status === "COMPLETED") {
          setData(response.result);
          setLoading(false);
        } else if (response.status === "FAILED") {
          setError("Analysis failed. Please try again.");
          setLoading(false);
        } else {
          // Poll every 3 seconds
          setTimeout(pollStatus, 3000);
        }
      } catch (err) {
        setError("Failed to fetch analysis status.");
        setLoading(false);
      }
    };

    pollStatus();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-20">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 animate-pulse">Running AI SWOT Analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl space-y-8 p-8 animate-fade-in">
      {/* Header / Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="60" className="stroke-slate-800 fill-none" strokeWidth="8" />
              <circle 
                cx="64" cy="64" r="60" 
                className="stroke-indigo-500 fill-none transition-all duration-1000" 
                strokeWidth="8" 
                strokeDasharray="377" 
                strokeDashoffset={377 - (377 * data.ats_score) / 100}
                strokeLinecap="round" 
              />
            </svg>
            <span className="absolute text-4xl font-bold font-outfit">{data.ats_score}</span>
          </div>
          <h3 className="text-xl font-bold font-outfit">ATS Match Score</h3>
          <p className="text-slate-400 text-sm mt-2">Based on current market standards</p>
        </div>

        <div className="md:col-span-2 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 grid grid-cols-2 gap-4">
          {Object.entries(data.breakdown || {}).map(([key, val]: [string, any]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-slate-400">{key}</span>
                <span className="text-slate-200">{val}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
          <h3 className="text-emerald-400 font-bold font-outfit mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {data.strengths?.map((s: string, i: number) => (
              <li key={i} className="text-slate-300 text-sm flex items-start">
                <span className="text-emerald-500 mr-2">•</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
          <h3 className="text-red-400 font-bold font-outfit mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Critical Weaknesses
          </h3>
          <ul className="space-y-3">
            {data.weaknesses?.map((w: string, i: number) => (
              <li key={i} className="text-slate-300 text-sm flex items-start">
                <span className="text-red-500 mr-2">•</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-xl font-bold font-outfit mb-6">AI Suggestions & Action Plan</h3>
        <div className="space-y-4">
          {data.suggestions?.map((item: any, i: number) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {item.category || "General"}
                </span>
              </div>
              <p className="text-slate-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-800" />
      <JobMatcher jobId={jobId} />
      
      <hr className="border-slate-800" />
      <RewriteTool />
    </div>
  );
}
