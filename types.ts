
export type Dimension = 'A' | 'B' | 'C' | 'D' | 'E';

export interface ScorePoint {
  dimension: Dimension;
  value: number;
}

export interface Option {
  label: string;
  scores: ScorePoint[];
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface DimensionScores {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

export interface ResultContent {
  title: string;
  description: string;
  mechanism: string;
  books: string[];
  advice: string[];
  cognitiveUpgrade: string;
}

export interface SubPersonality {
  title: string;
  advice: string;
}
