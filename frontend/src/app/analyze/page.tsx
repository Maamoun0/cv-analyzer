"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import AnalysisDashboard from "@/components/AnalysisDashboard";

export default function AnalyzePage() {
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-20 flex flex-col items-center">
      <div className="mb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
          {jobId ? "Analysis in Progress" : "Get Your Professional Score"}
        </h1>
        <p className="text-slate-400">
          {jobId 
            ? "Our AI is currently reviewing every section of your CV." 
            : "Upload your CV and let our AI models evaluate it against 50+ ATS criteria."}
        </p>
      </div>

      {!jobId ? (
        <UploadForm onUploadSuccess={setJobId} />
      ) : (
        <AnalysisDashboard jobId={jobId} />
      )}
      
      {jobId && (
        <button 
          onClick={() => setJobId(null)}
          className="mt-8 text-slate-500 hover:text-slate-300 text-sm underline underline-offset-4"
        >
          Upload another CV
        </button>
      )}
    </div>
  );
}
