export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  answers: number[];
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
}