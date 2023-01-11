import { IMenuItem } from '../types/iMenuItem';
import * as items from './menu-items';

export const STUDENT_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_STUDENT, icon: 'InsertEmoticon' },
  { text: 'Offers', route: items.OFFERS_STUDENT, icon: 'School' },
  { text: 'Requests', route: items.REQUESTS_STUDENT, icon: 'AddReaction' },
  { text: 'Classes', route: items.SCHOOL_CLASSES_STUDENT, icon: 'Visibility' },
];
export const ADMIN_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_ADMIN, icon: 'InsertEmoticon' },
  { text: 'Classes', route: items.SCHOOL_CLASSES_ADMIN, icon: 'Groups' },
  { text: 'Schools', route: items.SCHOOL_ADMIN, icon: 'Business' },
];
export const COMMON_LINKS: IMenuItem[] = [
  { text: 'Home', route: items.HOME, icon: 'Home' },
  { text: 'Change account', route: items.SIGN_IN, icon: 'Login' },
];
