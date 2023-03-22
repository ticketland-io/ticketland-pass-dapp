import {makeStyles} from '@mui/styles'

export default makeStyles(theme => ({
  container: {
    alignContent: 'center',
    height: '132px',
    backgroundColor: theme.palette.common.gray800,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    maxWidth: '1224px',
    margin: '12px 0',
    [theme.breakpoints.down('lg')]: {
      margin: '12px 16px',
    },
  },
  email: {
    textDecorationLine: 'underline',
    color: theme.palette.common.yellow500,
  },
  logo: {
    display: 'flex',
  },
  logoIcon: {
    width: '30px',
    height: '24px',
  },
  question: {
    paddingRight: '8px',
  },
  footerMenu: {
    paddingRight: '30px',
    paddingLeft: '10px',
  },
  social: {
    paddingLeft: '25px',
  },
  copyright: {
    alignContent: 'center',
    height: '48px',
    backgroundColor: theme.palette.common.gray900,
  },
  menuButton: {
    textDecoration: 'none',
  },
}))
