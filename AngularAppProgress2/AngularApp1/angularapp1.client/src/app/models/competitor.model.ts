// src/app/models/competitor.model.ts

export interface Competitor {
  id: number;
  pid: string;
  name: string;
  schoolName: string;
  barPos?: number;
  beamPos?: number;
  floorPos?: number;
  vaultPos?: number;
  sub?: boolean;
  meetId?: number;
  isEditing?: boolean;  // Optional property to control UI editing state
}
