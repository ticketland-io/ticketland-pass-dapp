import React, {useContext, useEffect, useState} from 'react'
import {verifyTicket} from '@ticketland-io/ticket-verification-js'
import {Context} from '../../core/Store'
import {fetchGuild} from '../../../services/guild'
import {submitTicketVerification} from '../../../services/account'
import {Grid, Typography} from '@mui/material'
import AsyncButton from '../../components/AsyncButton'


const Verify = props => {
  const [state, _] = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [verificationSubmitted, setVerificationSubmitted] = useState(false)
  const buttonDisabled = !state.firebase && !state.user
  const urlSearchParams = new URLSearchParams(window.location.search)
  const qs = Object.fromEntries(urlSearchParams.entries())
  const codeChallenge = `${qs.discord_uid}:${qs.guild_id}:${qs.sig}`

  const onVerifyClick = async () => {
    setLoading(true)
    setVerificationSubmitted(false)

    try {
      const guild = await fetchGuild(state.firebase, qs.guild_id)
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
    } catch(error) {
      console.error('Failed to verify ticket: ', error)
      setVerificationSubmitted(false)
    }

    setLoading(false)
  }

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
      flexGrow={1}
      mt='15%'
    >
      <Typography variant='h2' mb={10}>
        Verify a Ticket
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
