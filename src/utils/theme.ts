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
    primary: yellow,

    secondary: blue,
    text: {
      primary: '#FFFF',
    },

    background: {
      default: '#3d3736',
    },
  },
  shape: {
    borderRadius: 15,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#5fcf70',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0e5719',
        },
      },
    },
  },
});
