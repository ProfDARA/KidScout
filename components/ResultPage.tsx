import React, { useContext } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { Printer, RefreshCcw, Compass, Heart, Briefcase, AlertTriangle, PenTool } from 'lucide-react';
import { AppContext } from '../App';

interface ResultPageProps {
  onReset: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ onReset }) => {
  const { result } = useContext(AppContext);

  if (!result) return null;

  const handlePrint = () => {
    // Small timeout to ensure renders are settled if any
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="w-full px-4 print:p-0 print:w-full">
      
      {/* Navigation - Hidden in Print */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center no-print">
        <button 
          onClick={onReset} 
          className="bg-white/[0.99] border-2 border-indigo-600 text-indigo-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
        >
          <RefreshCcw size={20} /> Start New Scout
        </button>
        <button 
          onClick={handlePrint}
          className="bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-black transition shadow-md font-medium"
        >
          <Printer size={18} /> Print / Save PDF
        </button>
      </div>

      <div 
        id="report-content" 
        className="max-w-5xl mx-auto bg-white/[0.99] rounded-3xl shadow-2xl overflow-hidden print:overflow-visible print:shadow-none animate-fade-in print:animate-none backdrop-blur-sm border border-white/40"
      >
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 p-10 text-white text-center print:bg-white print:text-black border-b-0 print:border-b">
          <div className="uppercase tracking-widest text-xs font-bold opacity-70 mb-3 print:text-gray-500">KidScout Official Report</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 print:text-black tracking-tight">{result.childArchetype}</h1>
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-1.5 text-sm font-bold border border-white/20 print:border-black print:text-black text-indigo-100">
             Potential MBTI Type: <span className="text-white print:text-black">{result.mbti}</span>
          </div>
        </div>

        <div className="p-8 space-y-10 print:space-y-6">
          
          {/* Summary & Chart */}
          <div className="grid md:grid-cols-2 gap-8 items-center print-break-inside-avoid">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-fuchsia-500 pl-4">Scout Summary</h3>
              <p className="text-slate-600 leading-relaxed text-lg text-justify font-medium">
                {result.summary}
              </p>
            </div>
            <div className="h-[320px] w-full bg-gradient-to-br from-indigo-50/50 to-violet-50/50 rounded-2xl p-4 border border-indigo-50 print:border-0 print:bg-transparent relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.scores}>
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="attribute" tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Talent"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Handwriting Analysis */}
          <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100 print:border-0 print:bg-transparent print-break-inside-avoid">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <PenTool size={20} />
              </div>
              Handwriting Insights
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              {result.handwritingAnalysis}
            </p>
          </div>

          <div className="h-px bg-slate-100 w-full my-6 print:hidden"></div>

          {/* Details Grid - Now 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Careers */}
            <div className="bg-sky-50 rounded-2xl p-8 print:bg-white print:border print:border-sky-100 print-break-inside-avoid shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5 text-sky-700">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <Briefcase size={22} />
                </div>
                <h3 className="font-bold text-lg">Potential Careers</h3>
              </div>
              <ul className="space-y-3">
                {result.suggestedCareers.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="mt-2 w-1.5 h-1.5 bg-sky-400 rounded-full flex-shrink-0 print:bg-sky-600"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Track */}
            <div className="bg-violet-50 rounded-2xl p-8 print:bg-white print:border print:border-violet-100 print-break-inside-avoid shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-5 text-violet-700">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Compass size={22} />
                </div>
                <h3 className="font-bold text-lg">Growth Track</h3>
              </div>
              <ul className="space-y-3">
                {result.educationPath.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="mt-2 w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0 print:bg-violet-600"></span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parenting Tips */}
            <div className="bg-emerald-50 rounded-2xl p-8 print:bg-white print:border print:border-emerald-100 print-break-inside-avoid shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5 text-emerald-700">
                 <div className="p-2 bg-emerald-100 rounded-lg">
                  <Heart size={22} />
                </div>
                <h3 className="font-bold text-lg">Parenting Tips</h3>
              </div>
              <ul className="space-y-3">
                {result.parentingTips.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="mt-2 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0 print:bg-emerald-600"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parenting Challenges */}
            <div className="bg-rose-50 rounded-2xl p-8 print:bg-white print:border print:border-rose-100 print-break-inside-avoid shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5 text-rose-700">
                <div className="p-2 bg-rose-100 rounded-lg">
                   <AlertTriangle size={22} />
                </div>
                <h3 className="font-bold text-lg">Potential Challenges</h3>
              </div>
              <div className="space-y-5">
                {result.parentingChallenges?.map((item, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-bold text-rose-900 mb-1 text-base">{item.challenge}</p>
                    <p className="text-slate-700">Try: <span className="italic">{item.solution}</span></p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer footer */}
        <div className="bg-slate-50 p-6 text-center text-xs text-slate-400 print:bg-white print:mt-8 print:border-t">
          <p>Generated by KidScout AI. This is a suggestive tool and not a professional psychological diagnosis.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;