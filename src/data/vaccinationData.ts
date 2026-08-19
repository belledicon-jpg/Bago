import type {
  PatientVaccination,
} from "../types/vaccination";

export const vaccinationData: PatientVaccination[] = [
  {
    id: 1,
    patientName: "Juan Dela Cruz",
    age: 2,
    barangay: "Poblacion",
    vaccines: [
      {
        id: 101,
        vaccineName: "Measles, Mumps & Rubella",
        doseNumber: 1,
        dueDate: "2026-07-31",
        status: "upcoming",
      },
      {
        id: 102,
        vaccineName: "Polio Vaccine",
        doseNumber: 3,
        dueDate: "2026-08-10",
        status: "upcoming",
      },
    ],
  },

  {
    id: 2,
    patientName: "Maria Santos",
    age: 1,
    barangay: "Bagong Silang",
    vaccines: [
      {
        id: 103,
        vaccineName: "Pentavalent Vaccine",
        doseNumber: 3,
        dueDate: "2026-08-11",
        status: "upcoming",
      },
    ],
  },

  {
    id: 3,
    patientName: "Carlos Reyes",
    age: 5,
    barangay: "San Jose",
    vaccines: [
      {
        id: 104,
        vaccineName: "Measles Vaccine",
        doseNumber: 2,
        dueDate: "2026-07-25",
        status: "overdue",
      },
    ],
  },

  {
    id: 4,
    patientName: "Ana Garcia",
    age: 3,
    barangay: "Maysilo",
    vaccines: [
      {
        id: 105,
        vaccineName: "DPT Booster",
        doseNumber: 1,
        dueDate: "2026-08-08",
        status: "upcoming",
      },
    ],
  },
];
