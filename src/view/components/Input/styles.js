import {makeStyles} from '@mui/styles'

export default makeStyles(theme => ({
  input: {
    border: `1px solid ${theme.palette.common.gray200}`,
    background: theme.palette.common.white,
    borderRadius: '8px',
    fontSize: 16,
    width: 'auto',
    padding: '6px 16px',
  },
  inputLabel: {
    marginTop: '8px'
  }
}))
