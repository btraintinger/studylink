import { Roboto } from '@next/font/google';

import { PaletteMode } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { deDE } from '@mui/x-data-grid';
import { deDE as coreDeDE } from '@mui/material/locale';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// colors
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    deDE,
    coreDeDE,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: green,
          secondary: {
            main: green[500],
          },
          divider: green[500],
          border: grey[400],
          background: {
            default: grey[100],
            paper: grey[200],
          },
          text: {
            primary: grey[800],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: green,
          secondary: {
            main: green[800],
          },
          divider: green[500],
          border: grey[100],
          listHeader: green[400],
          background: {
            default: grey[900],
            paper: grey[800],
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
