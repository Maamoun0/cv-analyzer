"use client";

import { useState } from "react";
import { rewriteSection } from "@/services/api";

export default function RewriteTool() {
  const [originalText, setOriginalText] = useState("");
  const [context, setContext] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!originalText.trim()) return;
    setLoading(true);
    try {
      const response = await rewriteSection(originalText, context);
      setSuggestion(response.suggested_text);
    } catch (err) {
      console.error("Rewrite failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    setOriginalText(suggestion || "");
    setSuggestion(null);
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
      <h3 className="text-xl font-bold font-outfit">AI Section Rewriter</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original Text</label>
          <textarea
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-300 focus:border-indigo-500 outline-none resize-none"
            placeholder="Paste the section you want to improve..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Context (Optional)</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 focus:border-indigo-500 outline-none"
            placeholder="e.g., Senior Software Engineer at a Fintech startup"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <button
          onClick={handleRewrite}
          disabled={loading || !originalText.trim()}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            loading || !originalText.trim()
              ? 'bg-slate-800 text-slate-500'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {loading ? "Generating Suggestion..." : "Improve with AI"}
        </button>
      </div>

      {suggestion && (
        <div className="mt-8 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 animate-in slide-in-from-bottom-4">
          <h4 className="text-indigo-400 font-bold mb-3">AI Suggestion</h4>
          <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">"{suggestion}"</p>
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors"
            >
              Accept Suggestion
            </button>
            <button
              onClick={() => setSuggestion(null)}
              className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
