import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  isAnswered: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswered,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !isAnswered && onSelectAnswer(index)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              isAnswered
                ? index === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : index === selectedAnswer
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-100'
                : selectedAnswer === index
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            } border-2 ${
              isAnswered && index === question.correctAnswer
                ? 'border-green-500'
                : isAnswered && index === selectedAnswer
                ? 'border-red-500'
                : selectedAnswer === index
                ? 'border-blue-500'
                : 'border-transparent'
            }`}
          >
            <span className="font-medium">{option}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};