import React from 'react'
import Typography from '@mui/material/Typography'
import styles from './styles'
import {capitalizeFirstLetter} from '../../../services/format';

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
        <Typography variant="title">{capitalizeFirstLetter(title)} </Typography>
        <Typography variant="title" className={classes.eventsText}>{secondaryTitle}</Typography>
      </div>
    </div>

  );
};

export default SectionTitle
