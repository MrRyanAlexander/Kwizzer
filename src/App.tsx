import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { QuizCard } from './components/QuizCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import { questions } from './data/questions';
import type { QuizState, QuizStats } from './types';

function App() {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    answers: [],
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (selectedIndex: number) => {
    if (quizState.answers[quizState.currentQuestionIndex] !== undefined) return;

    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = selectedIndex;

    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: newAnswers,
    }));

    setTimeout(() => {
      if (quizState.currentQuestionIndex < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      } else {
        setQuizState(prev => ({ ...prev, showResults: true }));
      }
    }, 1500);
  };

  const getQuizStats = (): QuizStats => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    return {
      totalQuestions: questions.length,
      correctAnswers: quizState.score,
      accuracy: Math.round((quizState.score / questions.length) * 100),
      timeSpent,
    };
  };

  const restartQuiz = () => {
    setStartTime(Date.now());
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      answers: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Kwizzer</h1>
          </div>
          {!quizState.showResults && (
            <ProgressBar
              current={quizState.currentQuestionIndex + 1}
              total={questions.length}
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {!quizState.showResults ? (
            <QuizCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
              onSelectAnswer={handleAnswerSelect}
              isAnswered={quizState.answers[quizState.currentQuestionIndex] !== undefined}
            />
          ) : (
            <ResultsCard stats={getQuizStats()} onRestart={restartQuiz} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;