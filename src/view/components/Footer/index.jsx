import React from 'react'
import {
  Box, Grid, Typography, Link as MuiLink,
} from '@mui/material'
import {Link} from 'react-router-dom'
import styles from './styles'
import logoLight from '../../../assets/logoLight.svg'
import twitter from '../../../assets/twitter.svg'
import github from '../../../assets/github.svg'

const Footer = () => {
  const classes = styles()
  const year = new Date().getFullYear()

  return (
    <Box>
      <div className={classes.container}>
        <Grid rowSpacing={4} container className={classes.content}>
          <Grid item container justifyContent='space-between'>
            <Grid item>
              <Link to='/'>
                <div className={classes.logo}>
                  <img src={logoLight} className={classes.logoIcon} />
                  <Typography variant='subscribeBody' paddingLeft='10px'>Ticketland</Typography>
                </div>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='footer' className={classes.question}>
                Questions?
              </Typography>
              <Typography
                variant='footer'
                className={classes.email}
                component={MuiLink}
                href='mailto:info@ticketland.io'
              >
                info@ticketland.io
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent='space-between'>
            <Grid item>
              <Link to='/new' className={classes.menuButton}>
                <Typography variant='footer' className={classes.footerMenu}>Events</Typography>
              </Link>
              <Link to='/about' className={classes.menuButton}>
                <Typography variant='footer' className={classes.footerMenu}>About</Typography>
              </Link>
            </Grid>
            <Grid item>
              <MuiLink href='https://twitter.com/ticketlandio' target='_blank' rel='noopener noreferrer'>
                <img src={twitter} className={classes.social} />
              </MuiLink>
              <MuiLink href='https://github.com/ticketland-io' target='_blank' rel='noopener noreferrer'>
                <img src={github} className={classes.social} />
              </MuiLink>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.copyright} justifyContent='center'>
        <Typography variant='footer' className={classes.footerMenu}>&copy; {year}, all rights reserved</Typography>
      </Grid>
    </Box>
  )
}

export default Footer
