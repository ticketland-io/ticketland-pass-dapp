import React, {useContext, useEffect, useState} from 'react'
import {verifyTicket} from '@ticketland-io/ticket-verification-js'
import {CircularProgress, Grid, Typography} from '@mui/material'
import {Context} from '../../core/Store'
import {fetchGuild} from '../../../services/guild'
import {submitTicketVerification} from '../../../services/account'
import AsyncButton from '../../components/AsyncButton'
import {fetchEvent, getEventCoverImagePath} from '../../../services/events'
import styles from './styles'

const Verify = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState()
  const [guild, setGuild] = useState()

  const [verificationSubmitted, setVerificationSubmitted] = useState(false)
  const buttonDisabled = !state.firebase && !state.user
  const urlSearchParams = new URLSearchParams(window.location.search)
  const qs = Object.fromEntries(urlSearchParams.entries())
  const codeChallenge = `${qs.discord_uid}:${qs.guild_id}:${qs.sig}`

  useEffect(async () => {
    const run = async () => {
      if (state.user) {
        setGuild(await fetchGuild(state.firebase, qs.guild_id))
      }
    }

    run()
  }, [state.user])

  useEffect(async () => {
    const run = async () => {
      if (state.user && guild) {
        const {result} = await fetchEvent(state.firebase, guild.event_id)
        setEvent(result[0])
      }
    }

    run()
  }, [state.user, guild])

  const onVerifyClick = async () => {
    setLoading(true)
    setVerificationSubmitted(false)

    try {
      const verificationResult = await verifyTicket(
        state.user,
        guild.event_id,
        process.env.TICKET_VERIFICATION_WIDGET,
        process.env.TICKETLAND_VERIFIER_KEY,
        process.env.TICKET_VERIFICATION_WIDGET,
        'http://localhost:3002',
        codeChallenge,
      )

      // At this point we know that the verification was successful
      await submitTicketVerification(state.firebase, verificationResult)

      setVerificationSubmitted(true)
    } catch (error) {
      console.error('Failed to verify ticket: ', error)
      setVerificationSubmitted(false)
    }

    setLoading(false)
  }

  if (!guild || !event) {
    return (
      <Grid
        container
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
        flexGrow={1}
        mt={10}
      >
        <Typography variant='h2' mb={10}>
          Loading..
        </Typography>
        <CircularProgress size={60} thickness={7} />
      </Grid>
    )
  }

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
      flexGrow={1}
      mt={10}
    >
      <Typography variant='h2' mb={10}>
        Verify a Ticket
      </Typography>
      <Typography variant='h4' fontWeight='bold' mb={2}>
        {event.name}
      </Typography>
      <img src={getEventCoverImagePath(event.event_id)} className={classes.eventImage} />
      <Typography textAlign='center' variant='caption' mb={2}>
        Please do not close this tab or refresh the page while the widget is active
        <br />
        The widget will close automatically once a ticket is verified
      </Typography>
      <AsyncButton
        variant='contained'
        loading={loading}
        disabled={buttonDisabled}
        onClick={onVerifyClick}
      >
        Open Verification Widget
      </AsyncButton>
      {verificationSubmitted && (
        <>
          <Typography variant='body1' fontSize='32px' fontWeight='600' color='common.darkGray' my={10}>
            Ticket Verified!
          </Typography>
          <Typography variant='body1' mb={10}>
            Your new discord role should be reflected within a few minutes
          </Typography>
        </>
      )}
    </Grid>
  )
}

export default React.memo(Verify)
