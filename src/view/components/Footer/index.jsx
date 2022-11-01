import React from 'react'
import {Box, Grid, Typography} from '@mui/material'
import styles from './styles'
import logoLight from '../../../assets/logoLight.png'
import twitter from '../../../assets/twitter.png'
import github from '../../../assets/github.png'
import {Link} from 'react-router-dom'

const Footer = () => {
  const classes = styles()
  const year = new Date().getFullYear();

  return (
    <Box className={classes.boxContainer}>
      <div className={classes.container}>
        <Grid spacing={4} container className={classes.content}>
          <Grid item container justifyContent='space-between'>
            <Grid item>
              <Link to='/'>
                <div className={classes.logo}>
                  <img src={logoLight} />
                  <Typography variant='subscribeBody' paddingLeft='10px'>Ticketland</Typography>
                </div>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='footer' className={classes.question}>
                Questions?
              </Typography>
              <Typography variant='footer' className={classes.email}>
                info@ticketland.io
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent='space-between'>
            <Grid item>
              <Link to='/new' className={classes.menuButton}>
                <Typography variant='footer' className={classes.footerMenu}>Events</Typography>
              </Link>
              <Link to='/market' className={classes.menuButton}>
                <Typography variant='footer' className={classes.footerMenu}>Market</Typography>
              </Link>
              <Link to='/about' className={classes.menuButton}>
                <Typography variant='footer' className={classes.footerMenu}>About</Typography>
              </Link>
            </Grid>
            <Grid item>
              <img src={twitter} className={classes.social} />
              <img src={github} className={classes.social} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.copyright} justifyContent='center'>
        <Typography variant='footer' className={classes.footerMenu}>{year}, all rights reserved</Typography>
      </Grid>
    </Box>
  )
}

export default Footer
