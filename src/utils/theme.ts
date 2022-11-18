import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';
import { Roboto } from '@next/font/google';
import Typography from '@mui/material/Typography';
import { blue, purple, pink } from '@mui/material/colors';


export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


