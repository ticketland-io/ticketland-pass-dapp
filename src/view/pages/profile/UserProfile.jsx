import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import {Context} from '../../core/Store'
import profileIcon from '../../../assets/profileIcon.svg'
import {currencies, DECIMALS} from '../../../services/constants'
import {formatValue} from '../../../services/format'
import Shadow from '../../components/Shadow'
import Button from '../../components/AsyncButton'
import Image from '../../components/Image'
import styles from './styles'

const UserProfile = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const [balancesLoading, setBalancesLoading] = useState(true)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [solBalance, setSolBalance] = useState(0)
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  useEffect(() => {
    const run = async () => {
      setBalancesLoading(true)

      try {
        const usdcAta = await state.web3.getAssociatedTokenAddress(
          currencies.USDC,
          state.web3.wallet.publicKey,
          true,
        )
        const {value: {amount}} = await state.web3.getTokenAccountBalance(usdcAta)

        setUsdcBalance(amount)
        setSolBalance(await state.web3.getBalance(state.web3.wallet.publicKey))
      } catch (error) {
        console.error('Error loading account balances', error)
      }

      setBalancesLoading(false)
    }

    if (state.web3 && state.web3.wallet && state.user) {
      run()
    }
  }, [state.web3, state.user])

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
      await state.walletCore.logout()

      navigate('/login?redirect_to=profile')
    } catch (error) {
      // ignore
    }
  }

  const renderUserInfo = () => state.user && (
    <Grid
      container
      item
      xs={12}
      md
      justifyContent='center'
      alignContent='center'
    >
      <Grid item xs={12} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography variant='cardBody' className={classes.property}>
          {state.user.displayName || '---'}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography variant='email' className={classes.property}>
          {state.user.email || '---'}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography variant='email' className={classes.property}>
          <Typography>
            SOL account:&nbsp;
          </Typography>
          <strong>{state.web3?.wallet?.publicKey.toBase58()}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography variant='email' className={classes.property}>
          <Typography>
            SOL balance:&nbsp;
          </Typography>
          <strong>
            {balancesLoading
              ? <Skeleton width='150px' variant='text' />
              : formatValue(state.web3?.fromBase(solBalance))}
          </strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography variant='email' className={classes.property}>
          <Typography>
            USDC balance:&nbsp;
          </Typography>
          <strong>
            {balancesLoading
              ? <Skeleton width='150px' variant='text' />
              : formatValue(state.web3?.fromBase(usdcBalance, DECIMALS))}
          </strong>
        </Typography>
      </Grid>
    </Grid>
  )

  return (
    <Grid container alignItems='center' justifyContent='space-between' className={classes.profileMenu}>
      <Grid container alignItems='center'>
        <Grid container item xs={12} md sx={{justifyContent: {xs: 'center', md: 'flex-start'}}}>
          <Shadow className={classes.userIconContainer}>
            <Image
              imageSrc={state.user?.photoURL}
              fallbackSrc={profileIcon}
              className={classes.userIcon}
            />
          </Shadow>
          {renderUserInfo()}
        </Grid>
        <Grid
          container
          item
          xs={12}
          md
          spacing={4}
          justifyContent='flex-end'
          flex={{xs: 1, md: 0}}
          flexWrap={{xs: 'wrap', md: 'nowrap'}}
          sx={{marginTop: {xs: '20px', md: '0px'}}}
        >
          <Grid item xs={12} md='auto'>
            <Button
              variant='secondaryRed'
              onClick={signOut}
              startIcon={<LogoutIcon />}
              fullWidth={isMobile}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(UserProfile)
