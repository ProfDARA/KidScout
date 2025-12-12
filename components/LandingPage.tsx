import React from 'react';
import { Compass, PenTool, FileText, ArrowRight, Map, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  view: 'landing' | 'assessment' | 'result';
  onStart: () => void;
  children?: React.ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const LandingPage: React.FC<LandingPageProps> = ({ view, onStart, children, contentRef }) => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden">
      
      {/* Background Illustration */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat fixed"
        style={{
          // Using an image with a clear starry sky. Positioned to bottom right.
          backgroundImage: `url('https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2542&auto=format&fit=crop')`,
          backgroundPosition: 'center bottom', 
        }}
      >
        {/* Dark overlay for text readability, but neutral (no purple) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/20 to-transparent"></div>
      </div>

      {/* Main Container - z-10 ensures it sits above background */}
      <div className="z-10 w-full flex flex-col items-center flex-grow">
        
        {/* Header Section */}
        <header className={`w-full max-w-4xl px-6 text-center transition-all duration-500 ${view === 'landing' ? 'pt-20 pb-12' : 'pt-8 pb-8'}`}>
          {view === 'landing' ? (
            <>
              <div className="inline-block p-4 rounded-full bg-white/[0.99] text-teal-600 shadow-lg backdrop-blur-sm mb-8 scale-110">
                <Compass size={40} />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-fade-in drop-shadow-md">
                Kid<span className="text-teal-300">Scout</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-50 mb-8 drop-shadow-sm">
                Map Your Child's Future Among the Stars
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-sm">
                An intelligent guide for parents. We combine personality insights and handwriting analysis 
                to scout your child's hidden talents and suggest the best growth tracks.
              </p>
              <button 
                onClick={onStart}
                className="bg-white hover:bg-teal-50 text-teal-700 text-xl font-bold py-4 px-12 rounded-full shadow-xl transform transition hover:scale-105 flex items-center gap-3 mx-auto border-2 border-transparent hover:border-teal-200"
              >
                Start Scouting <ArrowRight size={22} />
              </button>
            </>
          ) : (
            /* Unified Symmetrical Header for Inner Pages */
            <div className="flex items-center justify-center gap-4 bg-white/[0.99] backdrop-blur-md py-3 px-8 rounded-full shadow-lg inline-flex mx-auto">
              <div 
                onClick={() => window.location.reload()}
                className="text-teal-600 cursor-pointer hover:text-teal-800 transition-colors flex items-center justify-center"
              >
                <Compass size={28} />
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
                  Kid<span className="text-teal-600">Scout</span>
                </h1>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600 font-medium">
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
                <div className="bg-white/[0.99] backdrop-blur-sm p-8 rounded-2xl shadow-xl border-b-4 border-blue-400 flex flex-col items-center text-center transform transition hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-inner">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">1. The Survey</h3>
                  <p className="text-gray-600">
                    Answer 5 quick questions about your child's daily habits, social style, and interests.
                  </p>
                </div>

                <div className="bg-white/[0.99] backdrop-blur-sm p-8 rounded-2xl shadow-xl border-b-4 border-orange-400 flex flex-col items-center text-center transform transition hover:-translate-y-1">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 shadow-inner">
                    <PenTool size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">2. The Handwriting</h3>
                  <p className="text-gray-600">
                    Upload a photo of their drawing or writing. Our AI detects subtle personality cues.
                  </p>
                </div>

                <div className="bg-white/[0.99] backdrop-blur-sm p-8 rounded-2xl shadow-xl border-b-4 border-teal-400 flex flex-col items-center text-center transform transition hover:-translate-y-1">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-4 shadow-inner">
                    <Map size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">3. The Map</h3>
                  <p className="text-gray-600">
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
        <footer className="mt-auto py-8 text-white/70 text-sm font-medium drop-shadow-md">
          <p>© {new Date().getFullYear()} KidScout. Unlocking potential, one child at a time.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;