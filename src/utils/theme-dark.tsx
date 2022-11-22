import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';
import { Roboto } from '@next/font/google';
import Typography from '@mui/material/Typography';
import { yellow, red, blue, purple, pink, green, lightBlue } from '@mui/material/colors';


export const themeDark = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 100,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    mode: 'dark',
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    text: {
      primary: lightBlue[100],
    },
    background: {
      default: "#1c394f"
    }

  },
  shape: {
    borderRadius: 15,
  },
  components: {
 
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#451196',
            }
          },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a0f3b",
        },
        },
  },
  },
});