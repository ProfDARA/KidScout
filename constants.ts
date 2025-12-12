import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How does your child typically react when meeting new friends?",
    options: [
      "Very shy, hides behind parents",
      "Observes quietly before joining",
      "Friendly but waits to be approached",
      "Excited and jumps right in"
    ]
  },
  {
    id: 2,
    text: "When solving a puzzle or a problem, they usually...",
    options: [
      "Ask for help immediately",
      "Try random things until it works",
      "Sit quietly and think it through",
      "Get frustrated and move to another toy"
    ]
  },
  {
    id: 3,
    text: "What kind of activities does your child enjoy most?",
    options: [
      "Drawing, painting, or building legos",
      "Running, climbing, and sports",
      "Reading books or listening to stories",
      "Role-playing with dolls or action figures"
    ]
  },
  {
    id: 4,
    text: "How would you describe their energy level?",
    options: [
      "Calm and steady",
      "Bursts of high energy then rests",
      "Always on the go, non-stop",
      "Low energy, prefers sitting activities"
    ]
  },
  {
    id: 5,
    text: "When things don't go their way, they...",
    options: [
      "Cry but recover quickly",
      "Negotiate or try to explain their side",
      "Get angry and stubborn",
      "Withdraw and become silent"
    ]
  }
];

export const MOCK_RESULT_FALLBACK = {
  mbti: "ENFP",
  childArchetype: "The Creative Explorer",
  summary: "Your child shows a strong inclination towards creativity and social interaction. They are likely observant yet eager to express themselves through various mediums.",
  handwritingAnalysis: "The handwriting indicates strong pressure, suggesting high vitality and energy. The large size of the letters points towards a socially confident personality, while the rounded shapes suggest a friendly and cooperative nature.",
  scores: [
    { attribute: "Creativity", value: 85 },
    { attribute: "Logic", value: 60 },
    { attribute: "Empathy", value: 90 },
    { attribute: "Energy", value: 75 },
    { attribute: "Focus", value: 50 },
  ],
  suggestedCareers: ["Graphic Designer", "Teacher", "Event Planner", "Psychologist"],
  educationPath: ["Montessori based early learning", "Arts and Humanities focus", "Interactive group learning environments"],
  parentingTips: ["Encourage their artistic expression", "Be patient with their shifting focus", "Provide opportunities for social play"],
  parentingChallenges: [
    { challenge: "Difficulty focusing on one task", solution: "Break tasks into smaller, manageable chunks with breaks." },
    { challenge: "High emotional sensitivity", solution: "Validate feelings first before offering logical solutions." },
    { challenge: "Resistance to routine", solution: "Make routines fun or gamified rather than strict." }
  ]
};