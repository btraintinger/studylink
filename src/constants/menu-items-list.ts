import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import { IMenuItem } from '../types';

const HOME = '/';
const SIGN_IN = '/auth/signin';
const REGISTER = '/create-account';

//admin
const DEPARTMENTS_ADMIN = '/admin/departments';
const MATCHES_ADMIN = '/admin/matches';
const SCHOOL_ADMIN = '/admin/school';
const SCHOOL_CLASSES_ADMIN = '/admin/schoolClasses';

//student
const MATCHES_STUDENT = '/student/matches';
const OFFERS_STUDENT = '/student/offers';
const REQUESTS_STUDENT = '/student/requests';
const SCHOOL_CLASSES_STUDENT = '/student/schoolClasses';

export const STUDENT_LINKS: IMenuItem[] = [
  { text: 'Matches', route: MATCHES_STUDENT, icon: MailIcon },
  { text: 'Offers', route: OFFERS_STUDENT, icon: MailIcon },
  { text: 'Requests', route: REQUESTS_STUDENT, icon: MailIcon },
  { text: 'Classes', route: SCHOOL_CLASSES_STUDENT, icon: MailIcon },
];
export const ADMIN_LINKS: IMenuItem[] = [
  { text: 'Matches', route: MATCHES_ADMIN, icon: MailIcon },
  { text: 'Classes', route: SCHOOL_CLASSES_ADMIN, icon: MailIcon },
  { text: 'Departments', route: DEPARTMENTS_ADMIN, icon: MailIcon },
  { text: 'Schools', route: SCHOOL_ADMIN, icon: MailIcon },
];
export const COMMON_LINKS: IMenuItem[] = [
  { text: 'Home', route: HOME, icon: MailIcon },
  { text: 'Change account', route: SIGN_IN, icon: MailIcon },
];
