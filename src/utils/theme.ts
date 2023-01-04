import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';
import { Roboto } from '@next/font/google';
import Typography from '@mui/material/Typography';
import { lightBlue, lightGreen } from '@mui/material/colors';
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
          backgroundColor: '#4E9F3D',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
    text: {
      primary: '#ffffff',
    },

    background: {
      default: '#000000',
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
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
});
