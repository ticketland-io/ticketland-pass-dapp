import React from 'react'
import {Grid, Typography} from '@mui/material'
import styles from './styles'
import ImageCarousel from './imageCarousel'
import CarouselEvent from './carouselEvent'
import LoginForm from './loginForm'

const LogIn = () => {
  const classes = styles()

  // TODO fetch paginated events for the carousel
  return (
    <div className={classes.root}>
      <div className={classes.backgroundColor} />
      <Grid container justifyContent='center' className={classes.innerContainer}>
        <Grid container item xs={6} direction='column'>
          <Grid item mt={11}>
            <Typography variant='h1' className={classes.welcomeText}>
              <strong>WELCOME</strong> BACK!
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12} mt={6}>
              <Typography className={classes.subText}>
                Ticketland is a ticketing and invitation cards platform and infrastructure powered by blockchain and NFT technologies.
              </Typography>
            </Grid>
          </Grid>
          <Grid container >
            <Grid mt={8} mb={5} item xs={12} className={classes.newEventsTextItem}>
              <Typography variant='h3' className={classes.newEventsText}>
                Newest events
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ImageCarousel hideIndicators>
                <CarouselEvent>
                  <img src="https://images.pexels.com/photos/711009/pexels-photo-711009.jpeg?cs=srgb&dl=pexels-helena-lopes-711009.jpg&fm=jpg" />
                </CarouselEvent>
                <CarouselEvent>
                  <img src="https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg?cs=srgb&dl=pexels-pixabay-301703.jpg&fm=jpg" />
                </CarouselEvent>
                <CarouselEvent>
                  <img src="https://images.pexels.com/photos/935970/pexels-photo-935970.jpeg?cs=srgb&dl=pexels-nappy-935970.jpg&fm=jpg" />
                </CarouselEvent>
              </ImageCarousel>
            </Grid>
          </Grid>
        </Grid>
        {/* TODO check the form design later */}
        <Grid
          container
          item
          xs={6}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(LogIn)
