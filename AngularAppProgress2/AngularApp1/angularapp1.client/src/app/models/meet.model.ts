// src/app/models/meet.model.ts

export interface Meet {
  mid: number; // Primary key
  hostSchool?: string;
  time?: Date; // Optional to match 'DateTime?' nullable type
  isEditing?: boolean;
}
