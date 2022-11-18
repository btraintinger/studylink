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
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    warning: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700],
    },
    info: {
      light: lightBlue[300],
      main: lightBlue[500],
      dark: lightBlue[700],
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    action: { //for links
      active: lightBlue[200],
      hover: lightBlue[100],
      focus: lightBlue[600],
      selected: lightBlue[300],
    },
    text: {
      primary: "#ffffff",
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