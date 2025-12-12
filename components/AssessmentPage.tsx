import React, { useState, useRef, useContext } from 'react';
import { Upload, X, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { QUESTIONS } from '../constants';
import { AppContext } from '../App';
import { analyzeChildProfile } from '../services/geminiService';
import LoadingOverlay from './LoadingOverlay';

interface AssessmentPageProps {
  onComplete: () => void;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({ onComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formState, setFormState, setResult } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (qId: number, value: string) => {
    setFormState({
      ...formState,
      answers: { ...formState.answers, [qId]: value }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please upload an image under 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, handwritingImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormState(prev => ({ ...prev, handwritingImage: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canProceed = () => {
    const allQuestionsAnswered = QUESTIONS.every(q => formState.answers[q.id]);
    const imageUploaded = !!formState.handwritingImage;
    return allQuestionsAnswered && imageUploaded;
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setLoading(true);
    setError(null);

    try {
      const analysis = await analyzeChildProfile(formState);
      setResult(analysis);
      onComplete();
    } catch (err) {
      console.error(err);
      setError("We encountered an issue connecting to the AI service. Please check your internet or try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay />;

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="mb-6 bg-red-50/[0.99] border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-2 shadow-sm">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Questions Section */}
          <div className="bg-white/[0.99] rounded-3xl shadow-xl p-6 sm:p-8 border-t-8 border-indigo-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold shadow-inner">1</span>
              Personality Snapshot
            </h3>
            
            <div className="space-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <p className="font-semibold text-slate-700 mb-4 text-lg">{q.text}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(q.id, option)}
                        className={`text-left px-5 py-4 rounded-xl border transition-all text-sm font-medium
                          ${formState.answers[q.id] === option 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200 shadow-md transform -translate-y-0.5' 
                            : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Handwriting Upload Section */}
          <div className="bg-white/[0.99] rounded-3xl shadow-xl p-6 sm:p-8 border-t-8 border-fuchsia-500 backdrop-blur-sm">
             <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-fuchsia-100 text-fuchsia-700 w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold shadow-inner">2</span>
              Handwriting Sample
            </h3>
            
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 mb-6 text-sm text-indigo-800 flex flex-col gap-2">
              <p className="font-bold uppercase tracking-wide text-xs text-indigo-400">Mission</p>
              <p>Please ask your child to draw a picture or write a simple sentence like <em>"The quick brown fox jumps over the lazy dog"</em>. Take a clear photo and upload it.</p>
            </div>

            {!formState.handwritingImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border-3 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-fuchsia-50 hover:border-fuchsia-400 transition-all duration-300"
              >
                <div className="bg-slate-100 group-hover:bg-white p-4 rounded-full mb-4 transition-colors">
                  <Upload size={32} className="text-slate-400 group-hover:text-fuchsia-500" />
                </div>
                <p className="text-slate-600 font-bold text-lg group-hover:text-fuchsia-700">Click to upload photo</p>
                <p className="text-slate-400 text-sm mt-1">JPG or PNG (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
                <img 
                  src={formState.handwritingImage} 
                  alt="Handwriting Sample" 
                  className="w-full h-64 object-contain p-4"
                />
                <button 
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 p-2 rounded-full shadow-md transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-3 right-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <CheckCircle size={14} /> Uploaded
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6 pb-8">
            <button
              disabled={!canProceed()}
              onClick={handleSubmit}
              className={`
                px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 shadow-xl transition-all transform
                ${canProceed() 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 hover:shadow-indigo-500/30 hover:shadow-2xl' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
              `}
            >
              Generate Report <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;