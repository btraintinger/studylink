import { createTheme } from '@mui/material/styles';
import { createContext, useState, useMemo } from 'react';
import { Roboto } from '@next/font/google';
import { lightBlue, lightGreen } from '@mui/material/colors';
import React from 'react';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

//colors
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        indigo: {
          100: '#d4dde5',
          200: '#a8bbcb',
          300: '#7d98b0',
          400: '#517696',
          500: '#26547c',
          600: '#1e4363',
          700: '#17324a',
          800: '#0f2232',
          900: '#081119',
        },
        red: {
          100: '#fcdae2',
          200: '#f9b5c5',
          300: '#f591a9',
          400: '#f26c8c',
          500: '#ef476f',
          600: '#bf3959',
          700: '#8f2b43',
          800: '#601c2c',
          900: '#300e16',
        },
        yellow: {
          100: '#fff6e0',
          200: '#ffedc2',
          300: '#ffe3a3',
          400: '#ffda85',
          500: '#ffd166',
          600: '#cca752',
          700: '#997d3d',
          800: '#665429',
          900: '#332a14',
        },
        primary: {
          100: '#cdf7ec',
          200: '#9befd9',
          300: '#6ae6c6',
          400: '#38deb3',
          500: '#06d6a0',
          600: '#05ab80',
          700: '#048060',
          800: '#025640',
          900: '#012b20',
        },
        white: {
          100: '#fefefe',
          200: '#fefefe',
          300: '#fdfdfd',
          400: '#fdfdfd',
          500: '#fcfcfc',
          600: '#cacaca',
          700: '#979797',
          800: '#656565',
          900: '#323232',
        },
      }
    : {
        // light mode
        indigo: {
          100: '#081119',
          200: '#0f2232',
          300: '#17324a',
          400: '#1e4363',
          500: '#26547c',
          600: '#517696',
          700: '#7d98b0',
          800: '#a8bbcb',
          900: '#d4dde5',
        },
        red: {
          100: '#300e16',
          200: '#601c2c',
          300: '#8f2b43',
          400: '#bf3959',
          500: '#ef476f',
          600: '#f26c8c',
          700: '#f591a9',
          800: '#f9b5c5',
          900: '#fcdae2',
        },
        yellow: {
          100: '#332a14',
          200: '#665429',
          300: '#997d3d',
          400: '#cca752',
          500: '#ffd166',
          600: '#ffda85',
          700: '#ffe3a3',
          800: '#ffedc2',
          900: '#fff6e0',
        },
        primary: {
          100: '#012b20',
          200: '#025640',
          300: '#048060',
          400: '#05ab80',
          500: '#06d6a0',
          600: '#38deb3',
          700: '#6ae6c6',
          800: '#9befd9',
          900: '#cdf7ec',
        },
        white: {
          100: '#323232',
          200: '#656565',
          300: '#979797',
          400: '#cacaca',
          500: '#fcfcfc',
          600: '#fdfdfd',
          700: '#fdfdfd',
          800: '#fefefe',
          900: '#fefefe',
        },
      }),
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
          backgroundColor: '#ffffff',
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
          backgroundColor: '#ffffff',
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
