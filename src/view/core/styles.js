import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    minHeight: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'nowrap'
  },
  pageContainer: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))
