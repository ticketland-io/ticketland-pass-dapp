import React, {useState, useContext, useCallback} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {Context} from '../../core/Store'
import Logo from '../../../assets/logo.svg'
import profileIcon from '../../../assets/profileIcon.svg'
import MenuIcon from '../../../assets/menuIcon.svg'
import Image from '../Image'
import styles from './styles'

const useLightHeader = () => {
  const {pathname} = useLocation()

  return pathname.endsWith('/market')
}

const MenuLink = props => {
  const {to, title} = props
  const classes = styles()
  const location = useLocation()
  const isLightHeader = useLightHeader()

  const isCurrentLink = location.pathname.endsWith(to)

  return (
    <Grid item>
      <Link to={to}>
        <Typography
          color={isLightHeader && 'white'}
          variant='headerMenuLink'
          className={`${classes.menuLink} ${isCurrentLink ? classes.menuLinkSelected : ''}`}
        >
          {title}
        </Typography>
      </Link>
    </Grid>
  )
}

const Header = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null)
  const location = useLocation()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
      await state.walletCore.logout()

      navigate(`/login?redirect_to=${location.pathname}`)
    } catch (error) {
      // ignore
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const renderLogin = () => (state.user
    ? (
      <div className={classes.iconContainer}>
        <Image
          imageSrc={state.user?.photoURL}
          fallbackSrc={profileIcon}
          className={classes.userIcon}
        />
      </div>
    ) : (
      <Grid item>
        <Link to={`/login?redirect_to=${location.pathname.slice(1)}`}>
          <Button variant='contained' size='small' className={classes.menuButton}>
            <Typography noWrap>
              SIGN IN
            </Typography>
          </Button>
        </Link>
      </Grid>
    ))

  const renderMenu = () => !isMobile
    ? (
      <Grid
        container
        item
        columnSpacing={8}
        ml={4}
        sx={{justifyContent: {xs: 'flex-end', md: 'flex-start'}}}
        alignItems='center'
      >
        <Grid item>
          <MenuLink to='/events' title='Events' />
        </Grid>
      </Grid>
    )
    : null

  const renderMobileMenu = () => isMobile
    ? (
      <Grid>
        <IconButton onClick={handleClick}>
          <img
            alt='edit'
            className={classes.mobileMenuIcon}
            src={MenuIcon}
          />
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className={classes.menu}
          PaperProps={{
            className: classes.menu,
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MuiLink target='_blank' href={process.env.DISCORD_INSTALL_APP_LINK}>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Grid item xs={12} className={classes.menuItemText}>
                <Typography>
                  Install App
                </Typography>
              </Grid>
            </MenuItem>
          </MuiLink>
          <Link to='/events'>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Grid item xs={12} className={classes.menuItemText}>
                <Typography>
                  Events
                </Typography>
              </Grid>
            </MenuItem>
          </Link>
          {state.user && (
            <Button sx={{p: 0}} onClick={signOut}>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                <Grid item xs={12} className={classes.menuItemText}>
                  <Typography color='common.red'>
                    Logout
                  </Typography>
                </Grid>
              </MenuItem>
            </Button>
          )}
        </Menu>
      </Grid>
    )
    : null

  return (
    <Grid
      container
      flexWrap='nowrap'
      className={classes.mainContainer}
      justifyContent='center'
    >
      <Grid
        component={Link}
        to='/'
        item
        xs
        container
        flexWrap='nowrap'
        alignItems='center'
        mr={{xs: 4, sm: 10, md: 0}}
      >
        <img src={Logo} className={classes.headerIcon} />
        <Typography
          variant='header'
          fontSize={{xs: '13px', sm: '16px', md: '20px'}}
          noWrap
        >
          Ticketland Pass
        </Typography>
      </Grid>
      {renderMenu()}
      <Grid
        container
        item
        flexWrap='nowrap'
        justifyContent='flex-end'
        alignItems='center'

      >
        {!isMobile && (
          <MuiLink target='_blank' href={process.env.DISCORD_INSTALL_APP_LINK}>
            <Button variant='outlined' size='small' className={classes.newEventButton}>
              Install App
            </Button>
          </MuiLink>
        )}
        {renderLogin()}
        {renderMobileMenu()}
      </Grid>
    </Grid>
  )
}

export default React.memo(Header)
