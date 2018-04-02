export interface Skill {
  title: string;
  mastered: boolean;
  words: string[];
  learned_ts: number;
  progress_percent: number;

  learnedDate: Date; // calculated field
}
