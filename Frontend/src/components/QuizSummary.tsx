import React from 'react';
import { Trophy, Timer, Star, RotateCcw, Heart } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface QuizSummaryProps {
  questions: QuizQuestion[];
  answers: Record<number, string>;
  score: number;
  timeSpent: number;
  maxStreak: number;
  onRestart: () => void;
  livesLeft: number;
  maxLives: number;
  correctAnswerMarks: number;
}

export function QuizSummary({ 
  questions, 
  answers, 
  score, 
  timeSpent, 
  maxStreak, 
  onRestart,
  livesLeft,
  maxLives,
  correctAnswerMarks
}: QuizSummaryProps) {
  const totalPossibleScore = questions.length * correctAnswerMarks;
  const percentage = Math.round((score / totalPossibleScore) * 100);

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Quiz Complete!</h2>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
          <Trophy className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Score</span>
          <span className="font-bold">{score}/{totalPossibleScore}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
          <Timer className="w-8 h-8 text-purple-500 mb-2" />
          <span className="text-sm text-gray-600">Time</span>
          <span className="font-bold">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
          <Star className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm text-gray-600">Max Streak</span>
          <span className="font-bold">{maxStreak}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
          <Heart className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-sm text-gray-600">Lives Left</span>
          <span className="font-bold">{livesLeft}/{maxLives}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#eab308' : '#ef4444'
            }}
          />
        </div>
        <p className="text-center mt-2 font-medium">{percentage}% Correct</p>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="font-semibold text-lg">Detailed Solutions</h3>
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium mb-2">Question {index + 1}</p>
            <p className="mb-2">{question.description}</p>
            <p className="text-sm text-gray-600 mb-2">Your answer: {answers[index] || 'Not answered'}</p>
            <p className="text-sm text-gray-600 mb-2">Correct answer: {
              question.options.find(opt => opt.is_correct)?.description
            }</p>
            {question.detailed_solution && (
              <div className="mt-2 text-sm">
                <p className="font-medium">Solution:</p>
                <p className="text-gray-600">{question.detailed_solution}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}