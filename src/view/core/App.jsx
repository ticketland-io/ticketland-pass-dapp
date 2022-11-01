import React, {useContext, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import Router from './Router'
import {Context} from './Store'
import Auth from '../components/Auth'
import useWeb3 from '../hooks/useWeb3'
// import useConnection from '../hooks/useConnection'
import {setWeb3, setConnection, setUser} from '../../data/actions'
import {getTheme} from './theme'

const theme = getTheme()

export default function App() {
  const [state, dispatch] = useContext(Context)
  const web3 = useWeb3()
  // const connection = useConnection(process.env.CLUSTER_ENDPOINT)

  useEffect(() => {
    state.firebase.onUserChanged(currentUser => {
      dispatch(setUser(currentUser))
    })
  }, [])

  useEffect(() => {
    dispatch(setWeb3(web3))
    // dispatch(setConnection(connection))
  }, [web3])

  return (
    <ThemeProvider theme={theme}>
      <Auth />
      <Router />
    </ThemeProvider>
  )
}
