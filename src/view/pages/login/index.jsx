import React from 'react'
import {Grid, Typography, useMediaQuery} from '@mui/material'
import LoginForm from './loginForm'
import styles from './styles'

const LogIn = () => {
  const classes = styles()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  const renderLoginForm = () => !isMobile
    ? (
      <Grid
        item
        xs={12}
        sm
        container
        justifyContent='flex-end'
      >
        <LoginForm />
      </Grid>
    )
    : null

  const renderLoginFormMobile = () => isMobile
    ? (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        mt='40px'
      >
        <LoginForm />
      </Grid>
    )
    : null

  return (
    <div className={classes.root}>
      <div className={classes.backgroundColor} />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        flexWrap='nowrap'
        flexDirection={{xs: 'column', md: 'row'}}
        className={classes.innerContainer}
      >
        <Grid container item xs={12} md={7} lg={6} direction='column'>
          <Grid item mt={11}>
            <Typography variant={isMobile ? 'h2' : 'h1'} className={classes.welcomeText}>
              <strong>WELCOME</strong> BACK!
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12} mt={6}>
              <Typography variant='h8'>
                Ticketland is a ticketing and invitation cards
                {!isMobile ? <br /> : null}
                platform and infrastructure powered by blockchain
                {!isMobile ? <br /> : null}
                and NFT technologies.
              </Typography>
            </Grid>
          </Grid>
          {renderLoginFormMobile()}
        </Grid>
        {renderLoginForm()}
      </Grid>
    </div>
  )
}

export default React.memo(LogIn)
