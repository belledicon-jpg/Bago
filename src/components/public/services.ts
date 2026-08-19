import {
  Stethoscope,
  ClipboardCheck,
  Droplets,
  Syringe,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    id: "health-center",
    title: "Health Center Appointment",
    description:
      "Schedule a consultation, request a medical certificate, or follow up on a health record.",
    icon: Stethoscope,
    iconColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    href: "/portal/request/health-center",
  },
  {
    id: "sanitation-permit",
    title: "Sanitation Permit",
    description:
      "Apply for a sanitation permit, food handler clearance, or venue health inspection.",
    icon: ClipboardCheck,
    iconColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    href: "/portal/request/sanitation-permit",
  },
  {
    id: "wastewater",
    title: "Wastewater & Septic Service",
    description:
      "Request septic desludging, report a spill, or schedule a wastewater inspection.",
    icon: Droplets,
    iconColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    href: "/portal/request/wastewater",
  },
  {
    id: "immunization",
    title: "Immunization Registration",
    description:
      "Register for a vaccination schedule, update records, or request an immunization certificate.",
    icon: Syringe,
    iconColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    href: "/portal/request/immunization",
  },
];
