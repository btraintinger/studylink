import { IMenuItem } from '../types/interfaces';
import * as items from './menu-items';

export const STUDENT_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_STUDENT, icon: 'CompareArrows' },
  { text: 'Angebote', route: items.OFFERS_STUDENT, icon: 'School' },
  { text: 'Anfragen', route: items.REQUESTS_STUDENT, icon: 'AddReaction' },
];
export const ADMIN_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_ADMIN, icon: 'CompareArrows' },
  { text: 'Schule', route: items.SCHOOL_ADMIN, icon: 'Business' },
  { text: 'Fächer', route: items.SCHOOL_SUBJECTS_ADMIN, icon: 'LibraryBooks' },
  { text: 'Lehrkräfte', route: items.TEACHERS_ADMIN, icon: 'People' },
  { text: 'Schüler', route: items.STUDENTS_ADMIN, icon: 'School' },
  { text: 'WebUntis', route: items.WEBUNTIS_ADMIN, icon: 'AccessTime' },
];
