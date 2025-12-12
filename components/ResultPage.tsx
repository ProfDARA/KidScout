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
          className="bg-white/[0.99] border-2 border-teal-600 text-teal-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
        >
          <RefreshCcw size={20} /> Start New Scout
        </button>
        <button 
          onClick={handlePrint}
          className="bg-gray-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-black transition shadow-md font-medium"
        >
          <Printer size={18} /> Print / Save PDF
        </button>
      </div>

      <div 
        id="report-content" 
        className="max-w-5xl mx-auto bg-white/[0.99] rounded-3xl shadow-xl overflow-hidden print:overflow-visible print:shadow-none animate-fade-in print:animate-none backdrop-blur-sm"
      >
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white text-center print:bg-teal-700 print:text-black border-b-0 print:border-b">
          <div className="uppercase tracking-wider text-sm font-semibold opacity-80 mb-2 print:text-gray-200">KidScout Report</div>
          <h1 className="text-4xl font-bold mb-2 print:text-white">{result.childArchetype}</h1>
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-bold border border-white/30 print:border-white/50 print:text-white">
             Potential MBTI Type: {result.mbti}
          </div>
        </div>

        <div className="p-8 space-y-10 print:space-y-6">
          
          {/* Summary & Chart */}
          <div className="grid md:grid-cols-2 gap-8 items-center print-break-inside-avoid">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">Scout Summary</h3>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">
                {result.summary}
              </p>
            </div>
            <div className="h-[300px] w-full bg-teal-50/50 rounded-xl p-4 border border-teal-100 print:border-0 print:bg-transparent">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.scores}>
                  <PolarGrid stroke="#94a3b8" />
                  <PolarAngleAxis dataKey="attribute" tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Talent"
                    dataKey="value"
                    stroke="#0d9488"
                    fill="#14b8a6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Handwriting Analysis - New Section */}
          <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100 print:border-0 print:bg-transparent print-break-inside-avoid">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-orange-500"><PenTool size={24} /></span>
              Handwriting Insights
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {result.handwritingAnalysis}
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full my-6 print:hidden"></div>

          {/* Details Grid - Now 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Careers */}
            <div className="bg-blue-50 rounded-xl p-6 print:bg-white print:border print:border-blue-200 print-break-inside-avoid">
              <div className="flex items-center gap-2 mb-4 text-blue-700">
                <Briefcase size={24} />
                <h3 className="font-bold text-lg">Potential Careers</h3>
              </div>
              <ul className="space-y-2">
                {result.suggestedCareers.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 print:bg-blue-600"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Track (was Education Path) */}
            <div className="bg-purple-50 rounded-xl p-6 print:bg-white print:border print:border-purple-200 print-break-inside-avoid">
               <div className="flex items-center gap-2 mb-4 text-purple-700">
                <Compass size={24} />
                <h3 className="font-bold text-lg">Growth Track</h3>
              </div>
              <ul className="space-y-2">
                {result.educationPath.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0 print:bg-purple-600"></span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parenting Tips */}
            <div className="bg-green-50 rounded-xl p-6 print:bg-white print:border print:border-green-200 print-break-inside-avoid">
              <div className="flex items-center gap-2 mb-4 text-green-700">
                <Heart size={24} />
                <h3 className="font-bold text-lg">Parenting Tips</h3>
              </div>
              <ul className="space-y-2">
                {result.parentingTips.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 print:bg-green-600"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parenting Challenges */}
            <div className="bg-orange-50 rounded-xl p-6 print:bg-white print:border print:border-orange-200 print-break-inside-avoid">
              <div className="flex items-center gap-2 mb-4 text-orange-700">
                <AlertTriangle size={24} />
                <h3 className="font-bold text-lg">Potential Challenges</h3>
              </div>
              <div className="space-y-4">
                {result.parentingChallenges?.map((item, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-bold text-orange-900 mb-1">{item.challenge}</p>
                    <p className="text-gray-700 italic">Try: {item.solution}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer footer */}
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500 print:bg-white print:mt-8 print:border-t">
          <p>Generated by KidScout AI. This is a suggestive tool and not a professional psychological diagnosis.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;