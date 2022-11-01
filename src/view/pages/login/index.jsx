import React from 'react'
import {Grid, Typography} from '@mui/material'
import styles from './styles'
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
