import {makeStyles} from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    border: '1px solid',
    boxShadow: '5px 10px',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '10px',
    borderColor: theme.palette.common.yellow500,
    backgroundColor: theme.palette.common.white
  }
}))
