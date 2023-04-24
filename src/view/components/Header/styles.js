import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  mainContainer: {
    padding: '15px 0',
    maxWidth: '1224px',
    margin: 'auto',
    zIndex: 1000,
    minHeight: '74px',
    [theme.breakpoints.down('lg')]: {
      padding: '0 16px',
    },
  },
  headerIcon: {
    width: '44px',
    height: '34px',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '24px',
    },
  },
  newEventButton: {
    marginRight: '12px',
  },
  newEventButtonIcon: {
    marginRight: '12px',
  },
  menuButton: {
    [theme.breakpoints.down('md')]: {
      height: '32px',
    },
  },
  blackIcon: {
    color: `${theme.palette.common.black} !important`,
  },
  whiteIcon: {
    color: `${theme.palette.common.white} !important`,
  },
  bellIcon: {
    height: '17.5px',
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    border: `2px solid ${theme.palette.common.yellow500}`,
    backgroundColor: theme.palette.common.white,
    borderRadius: '12px',
    marginLeft: '23px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      marginLeft: '15px',
    },
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
  menuLink: {
    padding: '5px 0px',
  },
  menuLinkSelected: {
    borderBottom: `4px solid ${theme.palette.common.yellow500}`,
  },
  menu: {
    marginTop: '4px',
  },
  mobileMenuIcon: {
    width: '18px',
    height: '18px',
    marginLeft: '12px',
  },
  menuItem: {
    padding: '0px',
    justifyContent: 'center',
  },
  menuItemText: {
    padding: '10px',
  },
}))
