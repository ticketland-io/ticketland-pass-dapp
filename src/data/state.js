import {WalletCore, constants} from '@ticketland-io/wallet-core'
import SuiWallet from '@ticketland-io/sui-wallet'
import Enclave from '@ticketland-io/web-enclave'
import FirebaseAuth from '@ticketland-io/firebase-auth'

const Wallet = () => SuiWallet({enclave: Enclave()})
const walletCore = WalletCore({Wallet})
const firebase = FirebaseAuth()

const web3AuthConfig = {
  clientId: process.env.WEB3_AUTH_CLIENT_ID,
  verifier: process.env.WEB3_AUTH_VERIFIER,
  chainNamespace: constants.CHAIN_NAMESPACES.OTHER,
  domain: process.env.DAPP_DOMAIN,
}

walletCore.init(
  process.env.EUTOPIC_API,
  firebase,
  web3AuthConfig,
)

export const initState = {
  connection: null,
  walletType: 'custody', // custody or injected
  walletCore,
  firebase,
  loading: true,
  user: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: action.value}
    case 'walletType':
      return {...state, walletType: action.value}
    case 'user':
      return {...state, user: action.value}
    case 'wallet':
      return {...state, wallet: action.value}
    case 'connection':
      return {...state, connection: action.value}
    default:
      return state
  }
}
