import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import { IMenuItem } from '../types/iMenuItem';
import * as items from './menu-items';

export const STUDENT_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_STUDENT, icon: MailIcon },
  { text: 'Offers', route: items.OFFERS_STUDENT, icon: MailIcon },
  { text: 'Requests', route: items.REQUESTS_STUDENT, icon: MailIcon },
  { text: 'Classes', route: items.SCHOOL_CLASSES_STUDENT, icon: MailIcon },
];
export const ADMIN_LINKS: IMenuItem[] = [
  { text: 'Matches', route: items.MATCHES_ADMIN, icon: MailIcon },
  { text: 'Classes', route: items.SCHOOL_CLASSES_ADMIN, icon: MailIcon },
  { text: 'Departments', route: items.DEPARTMENTS_ADMIN, icon: MailIcon },
  { text: 'Schools', route: items.SCHOOL_ADMIN, icon: MailIcon },
];
export const COMMON_LINKS: IMenuItem[] = [
  { text: 'Home', route: items.HOME, icon: MailIcon },
  { text: 'Change account', route: items.SIGN_IN, icon: MailIcon },
];
