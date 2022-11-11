import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
export const theme = createTheme({
  palette: {
    primary: {
      main: '#fcba03',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
