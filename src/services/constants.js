import * as anchor from '@project-serum/anchor'
import {NATIVE_MINT} from '@solana/spl-token'

const {PublicKey} = anchor.web3

export const currencies = {
  WRAPPED_SOL: NATIVE_MINT,
  USDC: new PublicKey(process.env.USDC),
}

export const DECIMALS = 6
