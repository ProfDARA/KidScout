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
          <div className="mb-6 bg-red-50/[0.99] border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Questions Section */}
          <div className="bg-white/[0.99] rounded-2xl shadow-sm p-6 sm:p-8 border-t-4 border-teal-500 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center gap-2">
              <span className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Personality Snapshot
            </h3>
            
            <div className="space-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <p className="font-semibold text-gray-800 mb-3">{q.text}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(q.id, option)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all text-sm
                          ${formState.answers[q.id] === option 
                            ? 'border-teal-500 bg-teal-50 text-teal-800 ring-1 ring-teal-500 shadow-sm' 
                            : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50 text-gray-600'
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
          <div className="bg-white/[0.99] rounded-2xl shadow-sm p-6 sm:p-8 border-t-4 border-orange-500 backdrop-blur-sm">
             <h3 className="text-xl font-bold text-orange-700 mb-6 flex items-center gap-2">
              <span className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Handwriting Sample
            </h3>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-800">
              <strong>Mission:</strong> Please ask your child to draw a picture or write a simple sentence like <em>"The quick brown fox jumps over the lazy dog"</em>. Take a clear photo and upload it.
            </div>

            {!formState.handwritingImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 hover:border-orange-400 transition-colors"
              >
                <Upload size={40} className="text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">Click to upload photo</p>
                <p className="text-gray-400 text-xs mt-1">JPG or PNG (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <img 
                  src={formState.handwritingImage} 
                  alt="Handwriting Sample" 
                  className="w-full h-64 object-contain"
                />
                <button 
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-sm transition"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle size={12} /> Uploaded
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              disabled={!canProceed()}
              onClick={handleSubmit}
              className={`
                px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2 shadow-lg transition-all transform
                ${canProceed() 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:scale-105 hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
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