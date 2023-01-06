import React, {useContext, useEffect} from 'react'
import {Context} from '../../core/Store'
import {connectAccount} from '../../../services/account'
import {useState} from 'react'
import {Grid, Typography} from '@mui/material'

const name = props => {
  const [state, _] = useContext(Context)
  const [message, setMessage] = useState('Loading..')

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const qs = Object.fromEntries(urlSearchParams.entries())

    state.firebase.onUserChanged(currentUser => {
      if(currentUser) {
        const run = async () => {
          await connectAccount(state.firebase, qs['session_id'])
          setMessage('Successfully connected your discord and ticketland accounts')
          window.location.href = `${process.env.DISCORD_LINK}/${qs.guild_id}/${qs.channel_id}`
        }

        state.user && run()
          .then(() => { })
          .catch(error => console.log('>>>>>', error))
      } else {
        setMessage('Discord and ticketland accounts already connected')
        window.location.href = `${process.env.TICKETLAND_PASS_URL}/login?return-url=register?session_id=${qs['session_id']}&guild_id=${qs.guild_id}&channel_id=${qs.channel_id}`
      }

    })
  }, [state.user])


  return (
    <Grid
      container
      justifyContent='center'
      alignItems='flex-start'
      flexGrow={1}
      mt='15%'
    >
      <Typography variant='h2'>
        {message}
      </Typography>
    </Grid>
  )
}

export default React.memo(name)
