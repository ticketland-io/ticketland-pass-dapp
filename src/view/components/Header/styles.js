import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  mainContainer: {
    paddingTop: '15px',
    paddingBottom: '15px',
    maxWidth: '1224px',
    margin: 'auto'
  },
  headerText: {
    marginLeft: '8px',
    marginRight: '42px'
  },
  searchButton: {
    color: 'black'
  },
  menuButton: {
    textDecoration: 'none',
    color: theme.palette.common.black
  },
  innerContainer: {
    position: 'relative',
    zIndex: 1000
  },
  bellIcon: {
    height: '17.5px'
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    border: `2px solid ${theme.palette.common.yellow500}`,
    borderRadius: '12px',
    marginLeft: '23px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userIcon: {
    width: '10px',
    height: '13.125px'
  },
}))
