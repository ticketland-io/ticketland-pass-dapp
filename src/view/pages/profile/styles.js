import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    padding: '45px 0',
  },
  userProfileContainer: {
    marginTop: '60px',
    [theme.breakpoints.down('md')]: {
      marginTop: '28px',
    },
  },
  profileMenu: {
    borderRadius: '24px',
    border: `2px solid ${theme.palette.common.gray200}`,
    padding: '16px',
    margin: 'auto',
    maxWidth: '1224px',
  },
  userIconContainer: {
    position: 'relative',
    width: '96px',
    height: '96px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  fallbackUserIcon: {
    width: '24px',
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
  property: {
    display: 'inline-flex',
    [theme.breakpoints.up('md')]: {
      marginLeft: '24px',
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      wordBreak: 'break-word',
    },
  },
}))
