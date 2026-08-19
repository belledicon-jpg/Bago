export type VaccinationStatus =
  | "completed"
  | "upcoming"
  | "due-today"
  | "overdue";

export type ReminderPriority =
  | "high"
  | "medium"
  | "low";

export interface VaccineRecord {
  id: number;
  vaccineName: string;
  doseNumber: number;
  dateGiven?: string;
  dueDate: string;
  status: VaccinationStatus;
}

export interface PatientVaccination {
  id: number;
  patientName: string;
  age: number;
  barangay: string;
  vaccines: VaccineRecord[];
}

export interface VaccinationReminder {
  id: number;
  patientId: number;
  patientName: string;
  vaccineName: string;
  dueDate: string;
  daysDifference: number;
  status: VaccinationStatus;
  priority: ReminderPriority;
  message: string;
}
