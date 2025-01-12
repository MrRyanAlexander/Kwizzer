import React from 'react';
import { motion } from 'framer-motion';
import { QuizStats } from '../types';
import { Trophy, Clock, Target } from 'lucide-react';

interface ResultsCardProps {
  stats: QuizStats;
  onRestart: () => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ stats, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mx-auto"
    >
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">Here's how you did:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Target className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-2xl font-bold text-blue-600">{stats.accuracy}%</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">✓</div>
          <p className="text-sm text-gray-600">Correct Answers</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.correctAnswers}/{stats.totalQuestions}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <Clock className="w-8 h-8 mx-auto text-purple-600 mb-2" />
          <p className="text-sm text-gray-600">Time Spent</p>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(stats.timeSpent / 60)}m {stats.timeSpent % 60}s
          </p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  );
};