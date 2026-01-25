'use client';

import { createTheme } from '@mui/material/styles';

// Colors matching Vue.js BLUE_THEME from LightTheme.ts
const themeColors = {
  primary: '#0078FC',
  secondary: '#43CED7',
  info: '#2CABE3',
  success: '#2CD07E',
  accent: '#FFAB91',
  warning: '#F6C000',
  error: '#F8285A',
  purple: '#725AF2',
  indigo: '#6610f2',
  darkgreen: '#005047',
  lightprimary: '#EDF5FD',
  lightsecondary: '#F2FCFC',
  lightsuccess: '#EDFDF2',
  lighterror: '#FFF0F4',
  lightwarning: '#FFFCF0',
  lightinfo: '#E4F5FF',
  textPrimary: '#3A4752',
  textSecondary: '#768B9E',
  borderColor: '#ebf1f6',
  inputBorder: '#DFE5EF',
  containerBg: '#ffffff',
  background: '#eef5f9',
  hoverColor: '#f6f9fc',
  surface: '#fff',
  grey100: '#F2F6FA',
  grey200: '#EAEFF4',
};

// Create the theme matching Vue.js Vuetify configuration
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeColors.primary,
      light: themeColors.lightprimary,
      dark: '#0056b3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: themeColors.secondary,
      light: themeColors.lightsecondary,
      dark: '#2eb8c1',
      contrastText: '#ffffff',
    },
    error: {
      main: themeColors.error,
      light: themeColors.lighterror,
      dark: '#c61d4a',
      contrastText: '#ffffff',
    },
    warning: {
      main: themeColors.warning,
      light: themeColors.lightwarning,
      dark: '#c49800',
      contrastText: '#3A4752',
    },
    info: {
      main: themeColors.info,
      light: themeColors.lightinfo,
      dark: '#1e8ab5',
      contrastText: '#ffffff',
    },
    success: {
      main: themeColors.success,
      light: themeColors.lightsuccess,
      dark: '#1fa864',
      contrastText: '#ffffff',
    },
    grey: {
      50: '#F9FAFB',
      100: themeColors.grey100,
      200: themeColors.grey200,
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: themeColors.textSecondary,
      700: '#616161',
      800: themeColors.textPrimary,
      900: '#212121',
    },
    text: {
      primary: themeColors.textPrimary,
      secondary: themeColors.textSecondary,
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: themeColors.borderColor,
    background: {
      default: themeColors.background,
      paper: themeColors.containerBg,
    },
    action: {
      hover: themeColors.hoverColor,
      selected: themeColors.lightprimary,
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 2.75,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 500,
      lineHeight: 2.25,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 2,
    },
    h4: {
      fontSize: '1.3125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.1,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'capitalize' as const,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase' as const,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(145,158,171,0.2),0px 1px 1px 0px rgba(145,158,171,0.14),0px 1px 3px 0px rgba(145,158,171,0.12)',
    '0px 3px 1px -2px rgba(145,158,171,0.2),0px 2px 2px 0px rgba(145,158,171,0.14),0px 1px 5px 0px rgba(145,158,171,0.12)',
    '0px 3px 3px -2px rgba(145,158,171,0.2),0px 3px 4px 0px rgba(145,158,171,0.14),0px 1px 8px 0px rgba(145,158,171,0.12)',
    '0px 2px 4px -1px rgba(145,158,171,0.2),0px 4px 5px 0px rgba(145,158,171,0.14),0px 1px 10px 0px rgba(145,158,171,0.12)',
    '0px 3px 5px -1px rgba(145,158,171,0.2),0px 5px 8px 0px rgba(145,158,171,0.14),0px 1px 14px 0px rgba(145,158,171,0.12)',
    '0px 3px 5px -1px rgba(145,158,171,0.2),0px 6px 10px 0px rgba(145,158,171,0.14),0px 1px 18px 0px rgba(145,158,171,0.12)',
    '0px 4px 5px -2px rgba(145,158,171,0.2),0px 7px 10px 1px rgba(145,158,171,0.14),0px 2px 16px 1px rgba(145,158,171,0.12)',
    '0px 5px 5px -3px rgba(145,158,171,0.2),0px 8px 10px 1px rgba(145,158,171,0.14),0px 3px 14px 2px rgba(145,158,171,0.12)',
    '0px 5px 6px -3px rgba(145,158,171,0.2),0px 9px 12px 1px rgba(145,158,171,0.14),0px 3px 16px 2px rgba(145,158,171,0.12)',
    'rgba(145,158,171,0.3) 0px 0px 2px 0px,rgba(145,158,171,0.12) 0px 12px 24px -4px',
    '0px 6px 7px -4px rgba(145,158,171,0.2),0px 11px 15px 1px rgba(145,158,171,0.14),0px 4px 20px 3px rgba(145,158,171,0.12)',
    '0px 7px 8px -4px rgba(145,158,171,0.2),0px 12px 17px 2px rgba(145,158,171,0.14),0px 5px 22px 4px rgba(145,158,171,0.12)',
    '0px 7px 8px -4px rgba(145,158,171,0.2),0px 13px 19px 2px rgba(145,158,171,0.14),0px 5px 24px 4px rgba(145,158,171,0.12)',
    '0px 7px 9px -4px rgba(145,158,171,0.2),0px 14px 21px 2px rgba(145,158,171,0.14),0px 5px 26px 4px rgba(145,158,171,0.12)',
    '0px 8px 9px -5px rgba(145,158,171,0.2),0px 15px 22px 2px rgba(145,158,171,0.14),0px 6px 28px 5px rgba(145,158,171,0.12)',
    '0px 8px 10px -5px rgba(145,158,171,0.2),0px 16px 24px 2px rgba(145,158,171,0.14),0px 6px 30px 5px rgba(145,158,171,0.12)',
    '0px 8px 11px -5px rgba(145,158,171,0.2),0px 17px 26px 2px rgba(145,158,171,0.14),0px 6px 32px 5px rgba(145,158,171,0.12)',
    '0px 9px 11px -5px rgba(145,158,171,0.2),0px 18px 28px 2px rgba(145,158,171,0.14),0px 7px 34px 6px rgba(145,158,171,0.12)',
    '0px 9px 12px -6px rgba(145,158,171,0.2),0px 19px 29px 2px rgba(145,158,171,0.14),0px 7px 36px 6px rgba(145,158,171,0.12)',
    '0px 10px 13px -6px rgba(145,158,171,0.2),0px 20px 31px 3px rgba(145,158,171,0.14),0px 8px 38px 7px rgba(145,158,171,0.12)',
    '0px 10px 13px -6px rgba(145,158,171,0.2),0px 21px 33px 3px rgba(145,158,171,0.14),0px 8px 40px 7px rgba(145,158,171,0.12)',
    '0px 10px 14px -6px rgba(145,158,171,0.2),0px 22px 35px 3px rgba(145,158,171,0.14),0px 8px 42px 7px rgba(145,158,171,0.12)',
    '0px 11px 14px -7px rgba(145,158,171,0.2),0px 23px 36px 3px rgba(145,158,171,0.14),0px 9px 44px 8px rgba(145,158,171,0.12)',
    '0px 11px 15px -7px rgba(145,158,171,0.2),0px 24px 38px 3px rgba(145,158,171,0.14),0px 9px 46px 8px rgba(145,158,171,0.12)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'capitalize',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: themeColors.primary,
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'rgba(145,158,171,0.3) 0px 0px 2px 0px,rgba(145,158,171,0.12) 0px 12px 24px -4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '& fieldset': {
              borderColor: themeColors.inputBorder,
            },
            '&:hover fieldset': {
              borderColor: themeColors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.primary,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#212121',
          fontSize: '0.75rem',
          borderRadius: 4,
          padding: '4px 8px',
        },
      },
    },
  },
});

export default theme;

