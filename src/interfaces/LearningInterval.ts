export interface LearningInterval {
  year: number;
  intervalNumber: number; // week or month number
  words: string[];
  name?: string;
  startDate: Date;
  endDate: Date;
}
