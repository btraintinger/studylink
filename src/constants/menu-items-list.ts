import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import { IMenuItem } from '../types';
import * as ROUTES from './routes';

export const UPPER_PAGES: IMenuItem[] = [
  { text: 'First Post', route: ROUTES.FIRST_POST, icon: MailIcon },
  { text: 'Sign up', route: ROUTES.SIGN_UP, icon: MailIcon },
  { text: 'Register', route: ROUTES.REGISTER, icon: MailIcon },
  { text: 'Switch Demo', route: ROUTES.SWITCH_DEMO, icon: MailIcon },
];
