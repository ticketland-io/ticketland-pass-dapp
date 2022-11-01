import React, {
  useCallback,
  useContext
} from 'react'
import {
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import styles from './styles'
import Shadow from '../../components/Shadow'
import FacebookIcon from '../../../assets/facebookIcon.png';
import GoogleIcon from '../../../assets/googleIcon.png';
import {Context} from '../../core/Store'

const LoginForm = () => {
  const classes = styles()
  const [state, dispatch] = useContext(Context)

  const signIn = useCallback(async () => {
    try {
      await state.firebase.signInWithGoogle()
    }
    catch (error) {
      // ignore
    }
  }, [])

  return (
    <Shadow>
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
            <Typography className={classes.socialMediaText}>
              Sign in with social media
            </Typography>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={6} textAlign='end'>
              <IconButton onClick={signIn}>
                <img src={GoogleIcon} />
              </IconButton>
            </Grid>
            <Grid item xs={6} textAlign='start'>
              <IconButton>
                <img src={FacebookIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    </Shadow>
  )
}

export default React.memo(LoginForm)
