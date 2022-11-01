import React from 'react'
import {Grid, Typography} from '@mui/material'
import styles from './styles'
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

const CarouselEvent = props => {
  const {children} = props
  const classes = styles()

  return (
    <Shadow className={classes.imageCarouselCard}>
      {/* TODO fetch events */}
      <Grid
        item
        xs={6}
        className={classes.imageItem}
      >
        <img
          height='100%'
          className={classes.imageEvent}
          src="https://images.pexels.com/photos/711009/pexels-photo-711009.jpeg?cs=srgb&dl=pexels-helena-lopes-711009.jpg&fm=jpg"
        />
      </Grid>
      <EventType className={classes.liveIconItem}/>
      <Grid container item xs={6} className={classes.carouselEventContainer} >
        <Grid
          item
          xs={12}
          textAlign='initial'
          className={classes.carouselEventDescription}
        >
          <Typography className={classes.descriptionHeader}>
            Music event name
          </Typography>
          <Typography className={classes.descriptionText}>
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Curabitur sed dapibus urna, 
            at vulputate nulla. Fusce venenatis turpis in ullamcorper eleifend. 
            Mauris pretium, nisi vitae hendrerit sollicitudin
          </Typography>
        </Grid>
        <Grid
          container
          textAlign='initial'
          className={classes.carouselEventInfo}
        >
          <Grid
            container
            item
            xs={12}
            alignItems='center'
          >
            <Typography>
              <DateRangeIcon className={classes.iconColor} />
            </Typography>
            <Typography className={classes.infoText}>
              14.09.2022
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignItems='center'
          >
            <Typography>
              <PlaceOutlinedIcon className={classes.iconColor} />
            </Typography>
            <Typography className={classes.infoText}>
              115 Derby ST, Salem MA
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Shadow>
  )
}

export default React.memo(CarouselEvent)
