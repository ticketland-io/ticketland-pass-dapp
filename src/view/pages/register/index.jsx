import React, {useContext, useEffect} from 'react'
import {Context} from '../../core/Store'
import {connectAccount} from '../../../services/account'

const name = props => {
  const [state, _] = useContext(Context)

  useEffect(() => {
    if(state.user) {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const qs = Object.fromEntries(urlSearchParams.entries())

      const run = async () => {
        await connectAccount(state.firebase, qs['session_id'])
        window.location.href = `${process.env.DISCORD_LINK}/${qs.guild_id}/${qs.channel_id}`
      }

      run()
      .then(() => {})
      .catch(error => console.log('>>>>>', error))
    } else {
      window.location.href = `${process.env.TICKETLAND_PASS_URL}/login`
    }
  }, [state.user])


  return (
    <div>Stateless Component</div>
  )
}

export default React.memo(name)
