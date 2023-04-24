import React, {useEffect, useContext} from 'react'
import {Grid, useMediaQuery} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {Context} from '../../core/Store'
import UserProfile from './UserProfile'
import styles from './styles'

const Profile = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const isLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.loading && !state.user) {
      navigate('/login?redirect_to=profile', {replace: true})
    }
  }, [state.user, state.loading])

  if (state.loading) {
    return null
  }

  return (
    <Grid container className={classes.root}>
      <Grid container justifyContent='center' className={classes.userProfileContainer}>
        <Grid item xs={12} p={isLarge ? '16px' : '0px'} lg={12} justifyContent='center'>
          <UserProfile />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile
