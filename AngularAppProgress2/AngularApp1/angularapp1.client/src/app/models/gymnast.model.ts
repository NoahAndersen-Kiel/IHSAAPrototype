export interface Gymnast {
  gymnastIndex?: number;
  pid: string;
  name: string;
  schoolName: string;
  year: string;
  doB: Date;
  isEditing?: boolean;  // Optional property to control UI editing state
}
