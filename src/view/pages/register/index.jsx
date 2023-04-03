import React, {useContext, useEffect, useState} from 'react'
import {Grid, Typography} from '@mui/material'
import {Context} from '../../core/Store'
import {connectAccount} from '../../../services/account'
import AsyncButton from '../../components/AsyncButton'

const Register = () => {
  const [state] = useContext(Context)
  const [message, setMessage] = useState('Loading..')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const qs = Object.fromEntries(urlSearchParams.entries())

    if (state.loading) {
      return
    }

    if (state.user) {
      const run = async () => {
        try {
          await connectAccount(state.firebase, qs.session_id)
          setMessage('Successfully connected your discord and ticketland accounts')
          setIsSuccess(true)
          window.location.href = `${process.env.DISCORD_LINK}/${qs.guild_id}/${qs.channel_id}`
        } catch (error) {
          setMessage('There was an error connecting your discord and ticketland accounts')
          console.error('Error connecting accounts', error)
        }
      }

      run()
    } else {
      setMessage('Please login to your Ticketland account first')
      const query = `session_id=${qs.session_id}&guild_id=${qs.guild_id}&channel_id=${qs.channel_id}`
      window.location.href = `${process.env.TICKETLAND_PASS_URL}/login?redirect-to=register?${query}`
    }
  }, [state.user, state.loading])

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
      flexGrow={1}
      px={{xs: 4, lg: 0}}
      mt='15%'
    >
      <Typography variant='h3' textAlign='center' mb={5}>
        {message}
      </Typography>
      {isSuccess && (
      <AsyncButton
        variant='contained'
        path='/events'
      >
        View your events
      </AsyncButton>
      )}
    </Grid>
  )
}

export default React.memo(Register)
