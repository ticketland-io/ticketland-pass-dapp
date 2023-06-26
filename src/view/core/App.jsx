import React, {useContext, useEffect} from 'react'
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles'
import Router from './Router'
import {Context} from './Store'
import Auth from '../components/Auth'
import useWallet from '../hooks/useWallet'
import useConnection from '../hooks/useConnection'
import {setWallet, setConnection} from '../../data/actions'
import {getTheme} from './theme'

const theme = getTheme()

export default function App() {
  const [_, dispatch] = useContext(Context)
  const wallet = useWallet()
  const connection = useConnection(process.env.CLUSTER_ENDPOINT)

  useEffect(() => {
    dispatch(setWallet(wallet))
    dispatch(setConnection(connection))
  }, [wallet, connection])

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Auth />
        <Router />
      </StyledEngineProvider>
    </ThemeProvider>
  )
}
