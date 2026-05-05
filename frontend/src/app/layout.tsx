import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "CV Analyzer | AI-Powered Career Optimization",
  description: "Get instant ATS scores, SWOT analysis, and AI rewrites for your CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-50 antialiased`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Ambient Background Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
          
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
