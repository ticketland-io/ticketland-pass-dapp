import {makeStyles} from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    padding: '15px 15px 15px 0px',
    maxWidth: '1224px',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: '15px'
    }
  },
  background: {
    backgroundColor: theme.palette.common.yellow500,
    padding: '15px',
    borderRadius: '5px',
    transform: 'rotate(1deg)'
  },
  eventsText:{
    fontWeight: 'normal',
  }
}))
