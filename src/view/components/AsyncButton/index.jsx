import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {Link} from 'react-router-dom'
import styles from './styles'

const AsyncButton = props => {
  const {
    children,
    loading,
    className,
    variant,
    onClick,
    disabled,
    fullWidth,
    color,
    path,
    size,
    type,
    ...rest
  } = props

  const classes = styles()
  return (
    <Button
      disableElevation
      variant={variant}
      size={size}
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
      className={className}
      fullWidth={fullWidth}
      color={color}
      component={path ? Link : undefined}
      to={path}
      {...rest}
    >
      {children}
      {loading && <CircularProgress size={26} thickness={7} className={classes.btnProgress} />}
    </Button>
  )
}

export default React.memo(AsyncButton)
