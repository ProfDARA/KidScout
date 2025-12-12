import React, { useState, createContext, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentPage from './components/AssessmentPage';
import ResultPage from './components/ResultPage';
import { AppContextType, AnalysisResult, FormState } from './types';

// Create Context
export const AppContext = createContext<AppContextType>({
  result: null,
  setResult: () => {},
  formState: { answers: {}, handwritingImage: null },
  setFormState: () => {},
});

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formState, setFormState] = useState<FormState>({
    answers: {},
    handwritingImage: null
  });

  // View State: 'landing' | 'assessment' | 'result'
  const [view, setView] = useState<'landing' | 'assessment' | 'result'>('landing');
  
  // Ref to scroll to content when view changes
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== 'landing' && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [view]);

  const handleStart = () => {
    setView('assessment');
  };

  const handleAssessmentComplete = () => {
    setView('result');
  };

  const handleReset = () => {
    setResult(null);
    setFormState({ answers: {}, handwritingImage: null });
    setView('landing');
  };

  return (
    <AppContext.Provider value={{ result, setResult, formState, setFormState }}>
      <LandingPage 
        view={view} 
        onStart={handleStart}
        contentRef={contentRef}
      >
        {view === 'assessment' && (
          <AssessmentPage onComplete={handleAssessmentComplete} />
        )}
        {view === 'result' && (
          <ResultPage onReset={handleReset} />
        )}
      </LandingPage>
    </AppContext.Provider>
  );
};

export default App;
