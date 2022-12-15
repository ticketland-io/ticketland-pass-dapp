import React, {useContext, useEffect} from 'react'
import {verifyTicket} from '@ticketland-io/ticket-verification-js'
import {Context} from '../../core/Store'
import {fetchGuild} from '../../../services/guild'
import {submitTicketVerification} from '../../../services/account'


const Verify = props => {
  const [state, _] = useContext(Context)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const qs = Object.fromEntries(urlSearchParams.entries())
    const codeChallenge = `${qs.discord_uid}:${qs.guild_id}:${qs.sig}`

    state.firebase.onUserChanged(currentUser => {
      if (currentUser) {
        const run = async () => {
          const guild = await fetchGuild(state.firebase, qs.guild_id)
          const verificationResult = await verifyTicket(
            guild.event_id,
            process.env.TICKET_VERIFICATION_WIDGET,
            process.env.TICKETLAND_VERIFIER_KEY,
            process.env.TICKET_VERIFICATION_WIDGET,
            'http://localhost:3002',
            codeChallenge,
          )

          // At this point we know that the verification was successful
          await submitTicketVerification(state.firebase, verificationResult)
        }

        run()
          .then(() => { })
          .catch(error => console.log('>>>>>', error))
      } else {
        window.location.href = `${process.env.TICKETLAND_PASS_URL}/login?return-url=verify?discord_uid=${qs.discord_uid}&guild_id=${qs.guild_id}&channel_id=${qs.channel_id}`
      }
    })
  }, [state.user])

  return (
    <div>Stateless Component</div>
  )
}

export default React.memo(Verify)
