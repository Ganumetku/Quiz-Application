import React from 'react';
import { Trophy, Timer, Zap, Heart } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  streak: number;
  timeSpent: number;
  lives: number;
  maxLives: number;
  points: number;
}

export function QuizCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  streak, 
  timeSpent,
  lives,
  maxLives,
  points
}: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">Streak: {streak}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium">{points} pts</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        {Array.from({ length: maxLives }).map((_, index) => (
          <Heart
            key={index}
            className={`w-6 h-6 ${index < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
          />
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{question.description}</h3>
        {question.photo_url && (
          <img 
            src={question.photo_url} 
            alt="Question illustration" 
            className="w-full rounded-lg mb-4"
          />
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelect(option.description)}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option.description
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
}