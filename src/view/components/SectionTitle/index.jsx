import React from 'react'
import Typography from '@mui/material/Typography'
import {capitalizeFirstLetter} from '../../../services/format'
import styles from './styles'

const SectionTitle = props => {
  const {
    title = '',
    secondaryTitle = 'events',
    className = ''
  } = props
  const classes = styles()

  return (
    <div className={classes.root}>
      <div className={`${classes.background} ${className}`}>
        <Typography variant='title'>{capitalizeFirstLetter(title)} </Typography>
        <Typography variant='title' className={classes.eventsText}>{secondaryTitle}</Typography>
      </div>
    </div>

  )
}

export default SectionTitle
