/* eslint-disable import/prefer-default-export */
import {createTheme} from '@mui/material/styles'

const colors = {
  black: '#000000',
  white: '#ffffff',
  darkGray: '#0B0C0E',
  gray97: '#F8F8F8',
  gray98: '#FAFAFA',
  gray100: '#F2F2F3',
  gray200: '#C9CACC',
  gray300: '#A8A9AC',
  gray400: '#7E8186',
  gray500: '#3D434F',
  gray600: '#373C47',
  gray700: '#2F343D',
  gray800: '#272A32',
  gray900: '#1B1E23',
  yellow: '#F4E300',
  yellow100: '#FFFCE4',
  yellow200: '#FFF8C6',
  yellow300: '#FFF4A1',
  yellow400: '#FFF172',
  yellow500: '#FFED00',
  yellow600: '#E4D400',
  yellow700: '#C6B800',
  yellow800: '#A19600',
  yellow900: '#726A00',
  errorLight: '#F9E6E5',
  error: '#d32f2f',
  red: '#E24A30',
  red100: '#b5432f',
  green100: '#60b563',
}

export const getTheme = () => createTheme({
  props: {
    MuiUseMediaQuery: {
      noSsr: true,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1224,
      xl: 1920,
    },
  },
  palette: {
    type: 'light',
    text: {
      primary: colors.black,
      secondary: colors.yellow900,
    },
    primary: {
      main: colors.yellow500,
    },
    secondary: {
      main: colors.yellow900,
    },
    background: {
      paper: colors.white,
      body: colors.white,
    },
    common: {
      ...colors,
    },
  },
  spacing: 4,
  typography: {
    h1: {
      color: colors.gray800,
      fontSize: '76px',
      fontWeight: '500',
      lineHeight: '80px',
    },
    h2: {
      color: colors.gray800,
      fontSize: '40px',
      fontWeight: '500',
      lineHeight: '48px',
    },
    h3: {
      color: colors.gray800,
      fontSize: '32px',
      fontWeight: '500',
      lineHeight: '36px',
    },
    h4: {
      color: colors.gray800,
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    h5: {
      color: colors.gray800,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '18px',
    },
    h6: {
      color: colors.gray200,
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '36px',
    },
    headerMenuLink: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '16px',
      color: colors.gray700,
    },
    header: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '24px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
    },
    body1: {
      color: colors.gray500,
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
    },
    body2: {
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '40px',
    },
    subtitle1: {
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '36px',
    },
    subtitle2: {
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '36px',
    },
    cardTitle: {
      color: colors.gray800,
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    cardSubtitle: {
      color: colors.gray800,
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '40px',
      fontStyle: 'normal',
    },
    cardBody: {
      color: colors.gray800,
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '32px',
    },
    subscribeTitle: {
      color: colors.white,
      fontSize: '32px',
      fontWeight: '500',
      lineHeight: '36px',
    },
    subscribeBody: {
      color: colors.white,
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '20px',
    },
    headerBody: {
      color: colors.gray800,
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '20px',
    },
    footer: {
      color: colors.gray100,
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '26px',
    },
    email: {
      color: colors.gray300,
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
    },
    button: {},
    caption: {},
    overline: {},
    inputLabel: {
      color: colors.gray500,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '18px',
    },
    inputLabelLarge: {
      color: colors.gray800,
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '42px',
    },
    toggleButton: {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '16px',
    },
    ticketName: {
      color: colors.gray800,
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '22px',
    },
    modalTitle: {
      color: colors.gray800,
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '36px',
    },
    fontFamily: 'Comfortaa',
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          position: 'relative !important',
          whiteSpace: 'break-spaces !important',
          top: '0 !important',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Comfortaa',
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: 10,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused:not(&.Mui-error)': {
            color: colors.gray800,
          },
          color: colors.gray800,
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '18px',
          transform: 'none',
          top: '-14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          '@media (max-width:900px)': {
            height: '100%',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          background: colors.white,
          padding: '20px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12px 16px',
        },
        root: {
          background: colors.white,
          borderRadius: '8px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 18,
        },
      },
    },
    MuiButton: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 14,
          borderRadius: 7,
          padding: '16px 24px',
          boxShadow: 'unset',
        },
        sizeSmall: {
          height: 40,
          fontSize: 14,
        },
        sizeMedium: {
          height: 48,
        },
        sizeLarge: {
          height: 55,
          width: 250,
        },
        sizeExtraLarge: {
          height: 64,
          fontSize: '16px',
          width: 250,
        },
        contained: {
          color: colors.gray800,
          backgroundColor: colors.yellow500,
          '&:hover': {
            backgroundColor: colors.yellow400,
            boxShadow: 'unset',
          },
          '&:active': {
            backgroundColor: colors.yellow600,
            boxShadow: 'unset',
          },
          '&.Mui-disabled': {
            color: colors.gray400,
            backgroundColor: colors.yellow200,
            boxShadow: 'unset',
          },
        },
        secondary: {
          color: colors.gray200,
          backgroundColor: colors.gray800,
          '&:hover': {
            backgroundColor: colors.gray600,
          },
          '&:active': {
            backgroundColor: colors.darkGray,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.gray300,
          },
        },
        secondaryYellow: {
          color: colors.yellow500,
          backgroundColor: colors.gray800,
          '&:hover': {
            backgroundColor: colors.gray600,
          },
          '&:active': {
            backgroundColor: colors.darkGray,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.gray300,
          },
        },
        secondaryRed: {
          color: colors.white,
          backgroundColor: colors.red,
          '&:hover': {
            backgroundColor: colors.red100,
          },
          '&:active': {
            backgroundColor: colors.darkGray,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.gray300,
          },
        },
        outlined: {
          color: colors.gray800,
          borderColor: colors.gray200,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: colors.gray300,
          },
          '&:active': {
            borderColor: colors.gray800,
          },
          '&.Mui-disabled': {
            color: colors.gray400,
            borderColor: colors.gray200,
          },
        },
        outlinedYellow: {
          border: '1px solid',
          color: colors.yellow500,
          borderColor: colors.yellow500,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: colors.yellow400,
          },
          '&:active': {
            borderColor: colors.yellow600,
          },
          '&.Mui-disabled': {
            color: colors.yellow200,
            borderColor: colors.yellow200,
          },
        },
        outlinedError: {
          color: colors.error,
          border: `1px solid ${colors.red} !important`,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: colors.error,
          },
          '&:active': {
            borderColor: colors.error,
          },
          '&.Mui-disabled': {
            color: colors.gray400,
            borderColor: colors.gray100,
          },
        },
        gray: {
          color: colors.gray500,
          backgroundColor: colors.gray100,
          '&:hover': {
            backgroundColor: colors.gray98,
          },
          '&:active': {
            color: colors.gray800,
            backgroundColor: colors.gray200,
          },
          '&.Mui-disabled': {
            color: colors.gray200,
            backgroundColor: colors.gray100,
          },
        },
        grayDark: {
          color: colors.white,
          backgroundColor: colors.gray800,
          '&:hover': {
            backgroundColor: colors.gray600,
          },
          '&:active': {
            color: colors.gray100,
            backgroundColor: colors.gray500,
          },
          '&.Mui-disabled': {
            color: colors.gray200,
            backgroundColor: colors.gray400,
          },
        },
        text: {
          color: colors.black,
        },
        endIcon: {
          fontSize: 12,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          color: colors.gray200,
        },
        markLabel: {
          fontSize: '14px',
          color: colors.gray300,
        },
      },
    },
  },
})
