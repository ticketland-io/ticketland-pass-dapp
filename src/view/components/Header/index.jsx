import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Typography, Box, Button} from '@mui/material'
import Logo from '../../../assets/logo.png'
import styles from './styles'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import {Context} from '../../core/Store'
import notification from '../../../assets/notification.svg'
import profileIcon from '../../../assets/profileIcon.svg'

const Header = () => {
  const classes = styles()
  const [state, dispatch] = useContext(Context)
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    state.firebase.onUserChanged(currentUser => {
      setLoggedInUser(currentUser)
    })
  }, [])

  return (
    <Grid container className={classes.mainContainer} justifyContent='center'>
      <Grid
        container
        item
        xs={4}
        justifyContent='flex-start'
        alignItems='center'
        className={classes.innerContainer}
      >
        <img src={Logo} />
        <Typography variant='header' className={classes.headerText}>
          Ticketland
        </Typography>
        <IconButton className={classes.searchButton}>
          {/* TODO add search functionality */}
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        item
        xs={4}
        spacing={6}
        className={classes.innerContainer}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <Link to="/about" className={classes.menuButton}>
            <Typography>
              ABOUT
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/events" className={classes.menuButton}>
            <Typography>
              EVENTS
            </Typography>
          </Link>
        </Grid>
      </Grid>
      {/* TODO check later if removed or add functionality*/}
      <Grid container item xs={4} justifyContent='flex-end' alignItems='center' className={classes.innerContainer}>
        {loggedInUser ? (
          <Grid item container flexDirection='row' justifyContent='center' alignItems='center'>
            <IconButton>
              <img src={notification} className={classes.bellIcon} />
            </IconButton>
            <Link to='/profile'>
              {/* TODO add icon fetched from our database */}
              <div className={classes.iconContainer}>
                <img src={profileIcon} className={classes.userIcon} />
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item>
            <Link to="/login" className={classes.menuButton}>
              <Button variant='contained'>
                <Typography>
                  SIGN IN
                </Typography>
              </Button>
            </Link>
          </Grid>
        )}
      </Grid >
    </Grid >
  )
}

export default React.memo(Header)
