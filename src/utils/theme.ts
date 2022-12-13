import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';
import { Roboto } from '@next/font/google';
import Typography from '@mui/material/Typography';
import {
  yellow,
  red,
  blue,
  purple,
  pink,
  green,
  lightBlue,
  black,
  lightGreen,
} from '@mui/material/colors';
import { withTheme } from '@emotion/react';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const theme = createTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
    text: {
      primary: '#000000',
    },

    background: {
      default: '#ffffff',
    },
  },
  shape: {
    borderRadius: 15,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E5128',
          //#D8E9A8
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#4E9F3D',
        },
      },
    },
  },
});
