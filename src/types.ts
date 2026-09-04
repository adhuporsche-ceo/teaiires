export type KeepsakeTab = 'apple' | 'letter' | 'thanks' | 'trophy' | 'garden';

export interface TeacherProfile {
  title: string; // "Respected Faculty & Staff", "Respected Educator", "Professor", etc.
  name: string; // e.g. "Respected Faculty & Staff", "Respected Educator & Mentor", etc.
  gender: 'female' | 'male';
  studentName: string; // e.g. "Your Grateful Student", "Class of 2026", etc.
  subject: string; // e.g. "All Subjects", "Mathematics", "Literature"
  school: string; // e.g. "Our Beloved School"
}

export interface GratitudeNote {
  id: string;
  author: string;
  message: string;
  color: string; // e.g. 'amber', 'rose', 'emerald', 'sky', 'violet'
  rotation: number;
  date: string;
  pinned?: boolean;
}
