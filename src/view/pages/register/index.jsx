import React, {useContext, useEffect} from 'react'
import {Context} from '../../core/Store'
import {connectAccount} from '../../../services/account'

const name = props => {
  const [state, _] = useContext(Context)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const qs = Object.fromEntries(urlSearchParams.entries())

    state.firebase.onUserChanged(currentUser => {
      if(currentUser) {
        const run = async () => {
          await connectAccount(state.firebase, qs['session_id'])
          window.location.href = `${process.env.DISCORD_LINK}/${qs.guild_id}/${qs.channel_id}`
        }
  
        run()
        .then(() => {})
        .catch(error => console.log('>>>>>', error))
      } else {
        window.location.href = `${process.env.TICKETLAND_PASS_URL}/login?return-url=register?session_id=${qs['session_id']}&guild_id=${qs.guild_id}&channel_id=${qs.channel_id}`
      }
    })
  }, [state.user])


  return (
    <div>Stateless Component</div>
  )
}

export default React.memo(name)
