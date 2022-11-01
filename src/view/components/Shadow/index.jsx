import React from 'react'
import styles from './styles'

const Shadow = props => {
  const {children, className = '', ...rest} = props
  const classes = styles()

  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Shadow
