export interface Score {
  referenceID: number;
  pid: string;
  name: string;
  selectedEvent: string;
  judge1?: number | null;  // "?" makes it optional, "| null" allows null
  judge2?: number | null;
  judge12?: number | null;
  judge22?: number | null;
  ded1?: number | null;
  ded2?: number | null;
  avg1?: number | null;  // Assuming these could be derived/calculated fields
  total1?: number | null;
  avg2?: number | null;
  total2?: number | null;
  maxScore: number;
  place?: number | null;
  MeetID?: number | null;
  isEditing?: boolean;
  isNew?: boolean;  // Optional property to track if the score is newly added
}
