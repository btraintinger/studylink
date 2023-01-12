import { Roboto } from '@next/font/google';

import { PaletteMode } from '@mui/material';
import {
  amber,
  blue,
  deepOrange,
  green,
  grey,
  orange,
} from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

//colors
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: green,
          secondary: orange,
          divider: green[500],
          text: {
            primary: grey[800],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: blue,
          secondary: orange,
          divider: blue[500],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: '#fffff',
            secondary: grey[400],
          },
        }),
  },
  components: {
    ...(mode === 'light'
      ? {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#f0f0f0f0',
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
          MuiListItem: {
            styleOverrides: {
              root: {
                color: '#000000',
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
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#000000',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: grey[900],
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#ffffff',
              },
            },
          },
          MuiListItem: {
            styleOverrides: {
              root: {
                color: '#ffffff',
              },
            },
          },
        }),
  },
});
