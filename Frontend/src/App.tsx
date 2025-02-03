import React, { useState, useEffect } from 'react';
import { QuizCard } from './components/QuizCard';
import { QuizSummary } from './components/QuizSummary';
import { StartScreen } from './components/StartScreen';
import type { Quiz, QuizState } from './types';
import axios from 'axios';
// import { mockQuizData } from './mockData';

// const QUIZ_API = 'https://api.jsonserve.com/Uw5CrX';

function App() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: {},
    isComplete: false,
    streak: 0,
    timeSpent: 0,
    mistakes: 0
  });
  const [maxStreak, setMaxStreak] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const maxLives = 3 //quiz?.max_mistake_count ?? 3;
  const livesLeft = maxLives - quizState.mistakes;
  const correctAnswerMarks = Number(quiz?.correct_answer_marks ?? 4);
  const negativeMarks = Number(quiz?.negative_marks ?? 1);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    let timer: number;
    if (isStarted && !quizState.isComplete) {
      timer = window.setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeSpent: prev.timeSpent + 1
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, quizState.isComplete]);

 
  const fetchQuizData = async () => {
    try {
      // const response = await fetch('https://api.jsonserve.com/Uw5CrX'); // 
      const response = await axios.get('http://localhost:5000/quiz');

      if (!response) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.data;
      setQuiz(data); // Set the quiz data from the API response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!quiz) return;
    
    const currentQ = quiz.questions[quizState.currentQuestion];
    const isCorrect = currentQ.options.find(opt => 
      opt.description === answer && opt.is_correct
    );
    
    setQuizState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      setMaxStreak(Math.max(maxStreak, newStreak));

      const newScore = prev.score + (isCorrect ? correctAnswerMarks : -negativeMarks);
      const newMistakes = prev.mistakes + (isCorrect ? 0 : 1);
      const isLastQuestion = prev.currentQuestion === quiz.questions.length - 1;
      const isGameOver = newMistakes >= maxLives;

      return {
        ...prev,
        answers: { ...prev.answers, [prev.currentQuestion]: answer },
        score: Math.max(0, newScore),
        currentQuestion: isLastQuestion || isGameOver ? prev.currentQuestion : prev.currentQuestion + 1,
        isComplete: isLastQuestion || isGameOver,
        streak: newStreak,
        mistakes: newMistakes
      };
    });
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: {},
      isComplete: false,
      streak: 0,
      timeSpent: 0,
      mistakes: 0
    });
    setMaxStreak(0);
    setIsStarted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={fetchQuizData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isStarted ? (
        <StartScreen 
          onStart={handleStart}
          title={quiz.title}
          topic={quiz.topic}
          questionCount={quiz.questions_count}
          duration={quiz.duration}
        />
      ) : quizState.isComplete ? (
        <QuizSummary
          questions={quiz.questions}
          answers={quizState.answers}
          score={quizState.score}
          timeSpent={quizState.timeSpent}
          maxStreak={maxStreak}
          onRestart={handleRestart}
          livesLeft={livesLeft}
          maxLives={maxLives}
          correctAnswerMarks={correctAnswerMarks}
        />
      ) : (
        <QuizCard
          question={quiz.questions[quizState.currentQuestion]}
          selectedAnswer={quizState.answers[quizState.currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          streak={quizState.streak}
          timeSpent={quizState.timeSpent}
          lives={livesLeft}
          maxLives={maxLives}
          points={correctAnswerMarks}
        />
      )}
    </div>
  );
}

export default App;