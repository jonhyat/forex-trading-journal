import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';
import { baselightTheme as DefaultColors } from './DefaultColors';

const theme = createTheme({
  palette: {
    primary: {
      main: DefaultColors.primary,
      light: DefaultColors.primaryLight,
      dark: DefaultColors.primaryDark,
    },
    secondary: {
      main: DefaultColors.secondary,
      light: DefaultColors.secondaryLight,
      dark: DefaultColors.secondaryDark,
    },
    error: {
      main: DefaultColors.error,
      light: DefaultColors.errorLight,
      dark: DefaultColors.errorDark,
    },
    warning: {
      main: DefaultColors.warning,
      light: DefaultColors.warningLight,
      dark: DefaultColors.warningDark,
    },
    info: {
      main: DefaultColors.info,
      light: DefaultColors.infoLight,
      dark: DefaultColors.infoDark,
    },
    success: {
      main: DefaultColors.success,
      light: DefaultColors.successLight,
      dark: DefaultColors.successDark,
    },
    grey: {
      50: DefaultColors.grey50,
      100: DefaultColors.grey100,
      200: DefaultColors.grey200,
      300: DefaultColors.grey300,
      400: DefaultColors.grey400,
      500: DefaultColors.grey500,
      600: DefaultColors.grey600,
      700: DefaultColors.grey700,
      800: DefaultColors.grey800,
      900: DefaultColors.grey900,
    },
    background: {
      default: DefaultColors.background,
      paper: DefaultColors.paper,
    },
  },
  typography,
  shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export { theme }; 