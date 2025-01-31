import { Brain, Trophy, Timer, BookOpen, ListChecks } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  title: string;
  topic: string;
  questionCount: number;
  duration: number;
}

export function StartScreen({ onStart, title, topic, questionCount, duration }: StartScreenProps) {
  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-xl shadow-xl p-10 text-center space-y-10">
        <div>
          <Brain className="w-24 h-24 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-white mb-2">{title}</h1>
          <p className="text-lg text-white opacity-80">{topic}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <ListChecks className="w-16 h-16 text-green-600" />
            <h3 className="text-2xl font-bold">{questionCount} Questions</h3>
            <p className="text-sm text-gray-600">Test your knowledge</p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <Timer className="w-16 h-16 text-purple-600" />
            <h3 className="text-2xl font-bold">{duration} Minutes</h3>
            <p className="text-sm text-gray-600">Time limit</p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <Trophy className="w-16 h-16 text-yellow-600" />
            <h3 className="text-2xl font-bold">Earn Points</h3>
            <p className="text-sm text-gray-600">Score high marks</p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <BookOpen className="w-16 h-16 text-blue-600" />
            <h3 className="text-2xl font-bold">Learn</h3>
            <p className="text-sm text-gray-600">Detailed solutions</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 px-8 bg-blue-600 text-white text-2xl rounded-xl hover:bg-blue-700 transition-all"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
  }
