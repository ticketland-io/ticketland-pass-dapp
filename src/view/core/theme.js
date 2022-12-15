import {createTheme} from '@mui/material/styles';

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
  errorLight: '#F2AFA4',
  error: '#E24A30',
  red: '#E24A30'
}

export const getTheme = () => createTheme({
  props: {
    MuiUseMediaQuery: {
      noSsr: true
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 100,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: 'light',
    text: {
      primary: colors.black,
      secondary: colors.yellow500
    },
    primary: {
      main: colors.yellow500
    },
    secondary: {
      main: colors.yellow500
    },
    background: {
      paper: colors.white,
      body: colors.white
    },
    common: {
      ...colors
    }
  },
  spacing: 4,
  typography: {
    h1: {
      color: colors.gray800,
      fontSize: '76px',
      fontWeight: '500',
      lineHeight: '80px'
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
      fontWeight: '600',
      lineHeight: '36px',
    },
    h3: {
      color: colors.gray800,
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    h4: {
      color: colors.gray800,
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    h5: {},
    h6: {},
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
      fontFamily: 'Poppins',
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '36px',
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
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '24px',
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
      fontStyle: 'normal'
    },
    cardBody: {
      color: colors.gray800,
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '32px',
    },
    subscribeTitle: {
      color: colors.white,
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '32px',
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
      fontFamily: 'Poppins',
      color: colors.gray500,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '18px',
    },
    inputLabelLarge: {
      fontFamily: 'Poppins',
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

    fontFamily: 'Poppins'
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          position: 'relative !important',
          whiteSpace: 'break-spaces !important',
          top: '0 !important',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 10
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'none',
          top: '-14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          padding: '20px'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 18
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 14,
          borderRadius: 7,
          padding: '16px 24px',
          boxShadow: 'unset'
        },
        text: {
          color: 'black'
        },
        sizeSmall: {
          height: 28,
          fontSize: 10
        },
        sizeMedium: {
          height: 48
        },
        sizeLarge: {
          height: 55,
          width: 250
        },
        contained: {
          color: colors.gray800,
          backgroundColor: colors.yellow500,
          '&:hover': {
            backgroundColor: colors.yellow400,
            boxShadow: 'unset'
          },
          '&:active': {
            backgroundColor: colors.yellow600,
            boxShadow: 'unset'
          },
          '&:disabled': {
            color: colors.gray400,
            backgroundColor: colors.yellow200,
            boxShadow: 'unset'
          }
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
          '&:disabled': {
            backgroundColor: colors.gray300,
          }
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
          '&:disabled': {
            backgroundColor: colors.gray300,
          }
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
          '&:disabled': {
            color: colors.gray400,
            borderColor: colors.gray100,
          }
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
          '&:disabled': {
            color: colors.yellow200,
            borderColor: colors.yellow200,
          }
        },
        outlinedError: {
          color: colors.error,
          border: `1px solid ${colors.errorLight} !important`,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: colors.error,
          },
          '&:active': {
            borderColor: colors.error,
          },
          '&:disabled': {
            color: colors.gray400,
            borderColor: colors.gray100,
          }
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
          '&:disabled': {
            color: colors.gray200,
            backgroundColor: colors.gray100,
          }
        },
        text: {
          color: colors.black
        },
        endIcon: {
          fontSize: 12
        },
      }
    },
    MuiTableRow: {
      styleOverrides: {
        border: 0,
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: colors.gray97,
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colors.gray97
        }
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: colors.error
      }
    }
  }
});
