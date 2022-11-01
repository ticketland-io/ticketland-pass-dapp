import React, {useContext, useEffect} from 'react'
import {Grid, Typography} from '@mui/material'
import {Context} from '../../core/Store'
import LoginForm from './loginForm'
import styles from './styles'

const LogIn = () => {
  const classes = styles()
  const [state, _] = useContext(Context)

  useEffect(() => {
    if(state.user) {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const qs = Object.fromEntries(urlSearchParams.entries())

      window.location.href = `${process.env.TICKETLAND_PASS_URL}/${qs['return-url']}`
    }
  }, [state.user])

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
