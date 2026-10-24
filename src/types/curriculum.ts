export interface PracticalStep {
  step: number;
  title: string;
  instruction: string;
}

export interface ExampleConcept {
  title: string;
  explanation: string;
  badExample?: string;
  goodExample?: string;
}

export interface CopyableSnippet {
  type: 'prompt' | 'code' | 'terminal';
  title: string;
  content: string;
}

export interface HandsOnExercise {
  task: string;
  hint: string;
  solutionPrompt: string;
}

export interface DocLink {
  title: string;
  url: string;
  source: string;
}

export interface DetailedLesson {
  id: string;
  moduleId: string;
  lessonNumber: string;
  title: string;
  learningObjective: string;
  estimatedDuration: string;
  plainLanguageExplanation: string[];
  practicalSteps: PracticalStep[];
  exampleConcept?: ExampleConcept;
  copyableSnippet?: CopyableSnippet;
  handsOnExercise: HandsOnExercise;
  commonMistakes: string[];
  completionChecklist: string[];
  officialDocLinks: DocLink[];
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  tagline: string;
  description: string;
  prerequisites: string[];
  estimatedEffort: string;
  learningOutcomes: string[];
  lessons: DetailedLesson[];
}
