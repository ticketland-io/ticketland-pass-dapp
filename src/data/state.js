import {WalletCore, constants} from '@ticketland-io/wallet-core'
import SolanaWallet from '@ticketland-io/solana-wallet'
import Enclave from '@ticketland-io/web-enclave'
import FirebaseAuth from '@ticketland-io/firebase-auth'

const Wallet = () => SolanaWallet({enclave: Enclave()})
const walletCore = WalletCore({Wallet})
const firebase = FirebaseAuth()

const web3AuthConfig = {
  clientId: process.env.WEB3_AUTH_CLIENT_ID,
  verifier: process.env.WEB3_AUTH_VERIFIER,
  chainId: process.env.CHAIN_ID,
  chainNamespace: constants.CHAIN_NAMESPACES.SOLANA,
  rpcTarget: process.env.CLUSTER_ENDPOINT,
  web3AuthNetwork: process.env.WEB_AUTH_NETWORK,
  domain: process.env.DAPP_DOMAIN,
}

walletCore.init(
  process.env.EUTOPIC_API,
  firebase,
  web3AuthConfig,
)

export const initState = {
  web3: null,
  connection: null,
  walletType: 'custody', // custody or injected
  walletCore,
  firebase,
  loading: false,
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
    case 'web3':
      return {...state, web3: action.value}
    case 'connection':
      return {...state, connection: action.value}
    default:
      return state
  }
}
