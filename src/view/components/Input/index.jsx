import React from 'react'
import {
  FormControl,
  InputBase,
  InputLabel,
  Typography
} from '@mui/material'
import styles from './styles'

const Input = props => {
  const {
    classNameLabel,
    className,
    label,
    InputProps = {},
    inputProps = {},
    ...rest
  } = props
  const classes = styles()

  return (
    <FormControl variant='outlined' fullWidth style={{height: '100%'}}>
      <InputLabel shrink htmlFor={`${label}-input`} className={classNameLabel}>
        <Typography variant='inputLabel'>
          {label}
        </Typography>
      </InputLabel>
      <InputBase
        className={`${classes.input} ${label ? classes.inputLabel : ''} ${className}`}
        fullWidth
        id={`${label}-input`}
        // necessary for passing these correctly
        {...inputProps}
        {...InputProps}
        {...rest}
      />
    </FormControl>
  )
}

export default Input
