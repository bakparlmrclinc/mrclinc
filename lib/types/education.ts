export interface EducationModule {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  questionsCount: number;
  passScore: number;
  isRequired: boolean;
  prerequisiteModuleId?: number;
}

export interface ModuleProgress {
  moduleId: number;
  pdId: string;
  status: "not_started" | "in_progress" | "completed" | "failed";
  currentSection: number;
  quizAttempts: number;
  quizScore?: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

export interface QuizQuestion {
  id: string;
  moduleId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type TrainingCategory =
  | "first_contact"
  | "boundary_enforcement"
  | "channel_development"
  | "complex_cases"
  | "communication_skills";

export interface TrainingScenario {
  id: string;
  category: TrainingCategory;
  difficulty: "easy" | "medium" | "hard";
  title: string;
  situation: string;
  task: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrainingProgress {
  pdId: string;
  category: TrainingCategory;
  completedScenarios: string[];
  score: number;
  badge?: "bronze" | "silver" | "gold";
}
