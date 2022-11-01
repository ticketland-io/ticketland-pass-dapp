import {useEffect, useState, useContext} from 'react'
import * as anchor from '@project-serum/anchor'
import Web3 from '@apocentre/solana-web3'
import {Context} from '../core/Store'

const {PublicKey} = anchor.web3


export default () => {
  const [web3, setWeb3] = useState(null)
  const [state, _] = useContext(Context)

  useEffect(() => {
    const initWeb3 = async () => {
      if(state.connection && state.user && !state.web3) {
        const _web3 = Web3()

        if(state.walletType === 'custody') {
          const custodyWallet = await state.eutopicCore.bootstrap(state.user)
          await _web3.init(state.connection, custodyWallet)
        }

        setWeb3(_web3)
      }
    }
    
    initWeb3().catch(console.error)
  }, [state.connection, state.user])

  return web3
}
