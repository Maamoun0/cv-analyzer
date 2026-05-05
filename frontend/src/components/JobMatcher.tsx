"use client";

import { useState } from "react";
import { matchJD } from "@/services/api";

interface JobMatcherProps {
  jobId: string;
}

export default function JobMatcher({ jobId }: JobMatcherProps) {
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await matchJD(jobId, jdText);
      setResult(response);
    } catch (err) {
      setError("Failed to calculate match. Please check the Job Description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-xl font-bold font-outfit mb-4">Optimize for a Specific Role</h3>
        <p className="text-slate-400 text-sm mb-6">Paste the job description below to see how well you match and identify missing keywords.</p>
        
        <textarea
          className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none resize-none"
          placeholder="Paste Job Description here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
        />

        <button
          onClick={handleMatch}
          disabled={loading || !jdText.trim()}
          className={`mt-4 w-full py-4 rounded-xl font-bold transition-all ${
            loading || !jdText.trim()
              ? 'bg-slate-800 text-slate-500'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {loading ? "Calculating Match..." : "Analyze Match"}
        </button>
      </div>

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold font-outfit">Match Score</h4>
              <p className="text-slate-400 text-sm">Based on semantic relevance</p>
            </div>
            <div className={`text-4xl font-bold font-outfit ${
              result.match_score > 70 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {result.match_score}%
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
            <h4 className="text-amber-400 font-bold font-outfit mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Missing Keywords & Gaps
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.skill_gap?.map((skill: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                  {skill}
                </span>
              ))}
              {result.skill_gap?.length === 0 && <p className="text-slate-400 text-sm italic">No significant gaps detected!</p>}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h4 className="text-lg font-bold font-outfit mb-2">Relevance Summary</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{result.relevance_summary}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
