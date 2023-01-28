import { IMenuItem } from '../types/interfaces';
import * as items from './menu-items';

export const STUDENT_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_STUDENT, icon: 'CompareArrows' },
  { text: 'Offers', route: items.OFFERS_STUDENT, icon: 'School' },
  { text: 'Requests', route: items.REQUESTS_STUDENT, icon: 'AddReaction' },
];
export const ADMIN_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_ADMIN, icon: 'CompareArrows' },
  { text: 'Schule', route: items.SCHOOL_ADMIN, icon: 'Business' },
  { text: 'Schulklassen', route: items.SCHOOL_SUBJECTS_ADMIN, icon: 'Groups' },
  { text: 'Schüler', route: items.STUDENTS_ADMIN, icon: 'People' },
];
