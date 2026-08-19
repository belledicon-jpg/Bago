import type {
  PatientVaccination,
  VaccinationReminder,
  ReminderPriority,
} from "../types/vaccination";

const getPriority = (
  status: VaccinationReminder["status"],
  daysDifference: number
): ReminderPriority => {
  if (status === "overdue") {
    return "high";
  }

  if (status === "due-today") {
    return "high";
  }

  if (daysDifference <= 7) {
    return "medium";
  }

  return "low";
};

const getStatus = (
  dueDate: string,
  today: Date
): {
  status: VaccinationReminder["status"];
  daysDifference: number;
} => {
  const due = new Date(dueDate);

  due.setHours(0, 0, 0, 0);

  const current = new Date(today);

  current.setHours(0, 0, 0, 0);

  const difference =
    Math.ceil(
      (due.getTime() - current.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (difference < 0) {
    return {
      status: "overdue",
      daysDifference: Math.abs(difference),
    };
  }

  if (difference === 0) {
    return {
      status: "due-today",
      daysDifference: 0,
    };
  }

  return {
    status: "upcoming",
    daysDifference: difference,
  };
};

const createMessage = (
  status: VaccinationReminder["status"],
  vaccineName: string,
  daysDifference: number
): string => {
  if (status === "overdue") {
    return `${vaccineName} is overdue by ${daysDifference} ${
      daysDifference === 1 ? "day" : "days"
    }. Please schedule vaccination as soon as possible.`;
  }

  if (status === "due-today") {
    return `${vaccineName} is due today. Consider scheduling the vaccination today.`;
  }

  return `${vaccineName} is due in ${daysDifference} ${
    daysDifference === 1 ? "day" : "days"
  }.`;
};

export const generateVaccinationReminders = (
  patients: PatientVaccination[],
  today: Date = new Date()
): VaccinationReminder[] => {
  const reminders: VaccinationReminder[] = [];

  patients.forEach((patient) => {
    patient.vaccines.forEach((vaccine) => {
      if (vaccine.status === "completed") {
        return;
      }

      const { status, daysDifference } = getStatus(
        vaccine.dueDate,
        today
      );

      const priority = getPriority(
        status,
        daysDifference
      );

      reminders.push({
        id: vaccine.id,
        patientId: patient.id,
        patientName: patient.patientName,
        vaccineName: vaccine.vaccineName,
        dueDate: vaccine.dueDate,
        daysDifference,
        status,
        priority,
        message: createMessage(
          status,
          vaccine.vaccineName,
          daysDifference
        ),
      });
    });
  });

  return reminders.sort((a, b) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return (
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
    );
  });
};
