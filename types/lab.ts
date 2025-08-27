export interface LabData {
  day: number;
  title: string;
  description?: string;
}

export interface DayProgress {
  completed: boolean;
  notes: string;
  checklist: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
}