import {DisplaySettings} from '@mui/icons-material'
import makeStyles from '@mui/styles/makeStyles'
import {display} from '@mui/system'


export default makeStyles(theme => ({
  container: {
    width: '100%',
    maxWidth: '1224px',
    justifyContent: 'center',
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '40px',
    paddingTop: '40px',
  },
  header: {
    paddingBottom: '40px',
    paddingTop: '60px'
  },
  eventName: {
    paddingLeft: '20px',
    display: 'flex',
    alignItems: 'center'
  }
}))
