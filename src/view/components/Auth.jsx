import React, {useEffect, useContext} from 'react'
import {Context} from '../core/Store'
import {setLoading, setUser} from '../../data/actions'

const Auth = () => {
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    state.firebase.onUserChanged(currentUser => {
      dispatch(setUser(currentUser))
      dispatch(setLoading(false))
    })

    // firebase.initUI()
  }, [])

  return null
}

export default React.memo(Auth)
