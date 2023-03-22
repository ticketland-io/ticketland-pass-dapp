import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  backgroundColor: {
    backgroundColor: theme.palette.common.yellow100,
    position: 'absolute',
    top: '-79px',
    left: 0,
    width: '100%',
    height: '592px',
  },
  innerContainer: {
    maxWidth: '1224px',
    margin: 'auto',
    zIndex: '1',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      padding: '16px',
    },
  },
  loginForm: {
    width: 'fit-content',
  },
  newEventsTextItem: {
    marginBottom: '1rem',
    marginTop: '4.5rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '2.5rem',
    },
  },
  newEventsText: {
    fontSize: '2rem',
  },
  socialMediaItem: {
    marginBottom: '1rem',
  },
  socialMediaText: {
    fontSize: '1rem',
    color: theme.palette.common.gray400,
  },
  providerErrorText: {
    fontSize: '1rem',
    color: theme.palette.common.error,
  },
  loginFormInnerFirstContainer: {
    padding: '1.5rem 1.5rem 2rem 1.5rem',
  },
}))
