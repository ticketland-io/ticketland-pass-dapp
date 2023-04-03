import React, {useCallback, useContext, useState} from 'react'
import {Grid, IconButton, Typography} from '@mui/material'
import {useNavigate, useLocation} from 'react-router-dom'
import Shadow from '../../components/Shadow'
import FacebookIcon from '../../../assets/facebookIcon.svg'
import GoogleIcon from '../../../assets/googleIcon.svg'
import TwitterIcon from '../../../assets/twitterIcon.svg'
import AppleIcon from '../../../assets/appleIcon.svg'
import {Context} from '../../core/Store'
import styles from './styles'

const LoginForm = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const [providerError, setProviderError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isMac = window.navigator.userAgent.indexOf('Mac') !== -1

  const signIn = provider => useCallback(async () => {
    try {
      switch (provider) {
        case 'google': {
          await state.firebase.signInWithGoogle()
          break
        }
        case 'twitter': {
          await state.firebase.signInWithTwitter()
          break
        }
        case 'apple': {
          await state.firebase.signInWithApple()
          break
        }
        case 'facebook':
        default: {
          await state.firebase.signInWithFacebook()
          break
        }
      }

      const urlSearchParams = new URLSearchParams(location.search)
      const qs = Object.fromEntries(urlSearchParams.entries())

      // eslint-disable-next-line no-unused-expressions
      qs.redirect_to ? navigate(`/${qs.redirect_to}`) : navigate('/')
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setProviderError(true)
      }
    }
  }, [])

  return (
    <Shadow className={classes.loginForm}>
      <Grid
        container
        item
        xs={12}
        className={classes.loginFormInnerFirstContainer}
      >
        <Grid
          item
          xs={12}
          textAlign='center'
          className={classes.socialMediaItem}
        >
          <Typography noWrap className={classes.socialMediaText}>
            Sign in with social media
          </Typography>
        </Grid>
        {providerError && (
          <Grid item xs={12} textAlign='center'>
            <Typography noWrap className={classes.providerErrorText}>
              Email already registered with different provider
            </Typography>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={isMac ? 3 : 4} textAlign='center'>
            <IconButton onClick={signIn('google')}>
              <img src={GoogleIcon} width='50px' />
            </IconButton>
          </Grid>
          <Grid item xs={isMac ? 3 : 4} textAlign='center'>
            <IconButton onClick={signIn('facebook')}>
              <img src={FacebookIcon} width='50px' />
            </IconButton>
          </Grid>
          <Grid item xs={isMac ? 3 : 4} textAlign='center'>
            <IconButton onClick={signIn('twitter')}>
              <img src={TwitterIcon} width='50px' />
            </IconButton>
          </Grid>
          {isMac && (
            <Grid item xs={3} textAlign='center'>
              <IconButton onClick={signIn('apple')}>
                <img src={AppleIcon} width='50px' />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Shadow>
  )
}

export default React.memo(LoginForm)
