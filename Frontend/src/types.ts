export interface QuizOption {
  id: number;
  description: string;
  question_id: number;
  is_correct: boolean;
  unanswered: boolean;
  photo_url: string | null;
}

export interface QuizQuestion {
  id: number;
  description: string;
  detailed_solution: string;
  difficulty_level: string | null;
  topic: string;
  options: QuizOption[];
  photo_url: string | null;
  photo_solution_url: string | null;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  topic: string;
  duration: number;
  negative_marks: string;
  correct_answer_marks: string;
  questions: QuizQuestion[];
  questions_count: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: Record<number, string>;
  isComplete: boolean;
  streak: number;
  timeSpent: number;
  mistakes: number;
}