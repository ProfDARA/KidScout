export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface TalentScore {
  attribute: string;
  value: number; // 0 to 100
}

export interface ParentingChallenge {
  challenge: string;
  solution: string;
}

export interface AnalysisResult {
  mbti: string;
  childArchetype: string;
  summary: string;
  handwritingAnalysis: string;
  scores: TalentScore[];
  suggestedCareers: string[];
  educationPath: string[];
  parentingTips: string[];
  parentingChallenges: ParentingChallenge[];
}

export interface FormState {
  answers: Record<number, string>;
  handwritingImage: string | null; // Base64
}

export interface AppContextType {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult | null) => void;
  formState: FormState;
  setFormState: (state: FormState | ((prev: FormState) => FormState)) => void;
}