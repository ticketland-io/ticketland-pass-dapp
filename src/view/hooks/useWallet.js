/* eslint-disable no-underscore-dangle */
import {useEffect, useState, useContext} from 'react'
import {Context} from '../core/Store'

export default () => {
  const [wallet, setWallet] = useState(null)
  const [state, _] = useContext(Context)

  useEffect(() => {
    const initWallet = async () => {
      if (state.connection && state.user) {
        let custodyWallet

        if (state.walletType === 'custody' && state.user) {
          custodyWallet = await state.walletCore.bootstrap(process.env.CLUSTER_ENDPOINT)
        }

        setWallet(custodyWallet)
      }
    }

    initWallet().catch(error => console.error('Failed to initialize wallet: ', error))
  }, [state.connection, state.user])

  return wallet
}
