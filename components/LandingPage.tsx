import React from 'react';
import { Compass, PenTool, FileText, ArrowRight, Map } from 'lucide-react';

interface LandingPageProps {
  view: 'landing' | 'assessment' | 'result';
  onStart: () => void;
  children?: React.ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const LandingPage: React.FC<LandingPageProps> = ({ view, onStart, children, contentRef }) => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden text-slate-800">
      
      {/* Background Illustration */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat fixed"
        style={{
          // Deep galaxy/starry night image
          backgroundImage: `url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2678&auto=format&fit=crop')`,
          backgroundPosition: 'center bottom', 
        }}
      >
        {/* Modern dark overlay with a slight violet tint for theme harmony */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-900/40 to-indigo-950/90"></div>
      </div>

      {/* Main Container - z-10 ensures it sits above background */}
      <div className="z-10 w-full flex flex-col items-center flex-grow">
        
        {/* Header Section */}
        <header className={`w-full max-w-4xl px-6 text-center transition-all duration-500 ${view === 'landing' ? 'pt-20 pb-12' : 'pt-8 pb-8'}`}>
          {view === 'landing' ? (
            <>
              <div className="inline-block p-4 rounded-full bg-white/[0.99] text-indigo-600 shadow-xl backdrop-blur-sm mb-8 scale-110 animate-bounce-slow">
                <Compass size={40} />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-fade-in drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                Kid<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">Scout</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-indigo-100 mb-8 drop-shadow-md">
                Map Your Child's Future Among the Stars
              </h2>
              <p className="text-lg md:text-xl text-indigo-50/90 max-w-2xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-sm">
                An intelligent guide for parents. We combine personality insights and handwriting analysis 
                to scout your child's hidden talents and suggest the best growth tracks.
              </p>
              <button 
                onClick={onStart}
                className="group bg-white hover:bg-indigo-50 text-indigo-700 text-xl font-bold py-4 px-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transform transition hover:scale-105 flex items-center gap-3 mx-auto border-2 border-transparent hover:border-indigo-200"
              >
                Start Scouting 
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={22} />
                </span>
              </button>
            </>
          ) : (
            /* Unified Symmetrical Header for Inner Pages */
            <div className="flex items-center justify-center gap-4 bg-white/[0.99] backdrop-blur-md py-3 px-8 rounded-full shadow-lg inline-flex mx-auto border border-indigo-50">
              <div 
                onClick={() => window.location.reload()}
                className="text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors flex items-center justify-center"
              >
                <Compass size={28} />
              </div>
              <div className="w-px h-6 bg-indigo-100"></div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                  Kid<span className="text-indigo-600">Scout</span>
                </h1>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">
                  {view === 'assessment' ? 'Assessment' : 'Report'}
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Dynamic Content Section */}
        <div ref={contentRef} className="w-full flex-grow flex flex-col items-center">
          {view === 'landing' ? (
            /* How it works - Only visible on Landing View */
            <section className="w-full bg-transparent pt-8 pb-16 px-6">
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 animate-fade-in-up">
                <div className="bg-white/[0.95] backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-indigo-500/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 shadow-inner rotate-3">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">1. The Survey</h3>
                  <p className="text-slate-600">
                    Answer 5 quick questions about your child's daily habits, social style, and interests.
                  </p>
                </div>

                <div className="bg-white/[0.95] backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-fuchsia-500/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-2xl flex items-center justify-center text-fuchsia-600 mb-4 shadow-inner -rotate-2">
                    <PenTool size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2. The Handwriting</h3>
                  <p className="text-slate-600">
                    Upload a photo of their drawing or writing. Our AI detects subtle personality cues.
                  </p>
                </div>

                <div className="bg-white/[0.95] backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-cyan-500/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-4 shadow-inner rotate-1">
                    <Map size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">3. The Map</h3>
                  <p className="text-slate-600">
                    Get a comprehensive "Growth Track" report with career ideas and parenting strategies.
                  </p>
                </div>
              </div>
            </section>
          ) : (
            /* Expanded Application Content */
            <div className="w-full max-w-5xl animate-fade-in pb-12">
              {children}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto py-8 text-indigo-200/60 text-sm font-medium drop-shadow-md">
          <p>© {new Date().getFullYear()} KidScout. Unlocking potential, one child at a time.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;