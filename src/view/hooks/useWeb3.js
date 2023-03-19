import {useEffect, useState, useContext} from 'react'
import Web3 from '@apocentre/solana-web3'
import {Context} from '../core/Store'

export default () => {
  const [web3, setWeb3] = useState(null)
  const [state, _] = useContext(Context)

  useEffect(() => {
    const initWeb3 = async () => {
      if(state.connection && state.user && !state.web3) {
        const _web3 = Web3()
        let custodyWallet
        
        if(state.walletType === 'custody') {
          custodyWallet = await state.walletCore.bootstrap()
        }
        
        await _web3.init(state.connection, custodyWallet)
        setWeb3(_web3)
      }
    }
    
    initWeb3().catch(console.error)
  }, [state.connection, state.user])

  return web3
}
