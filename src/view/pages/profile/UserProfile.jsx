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
import {formatValue, fromBase} from '../../../services/format'
import Shadow from '../../components/Shadow'
import Button from '../../components/AsyncButton'
import Image from '../../components/Image'
import styles from './styles'

const UserProfile = () => {
  const classes = styles()
  const [state] = useContext(Context)
  const [balancesLoading, setBalancesLoading] = useState(true)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [suiBalance, setSuiBalance] = useState(0)
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  useEffect(() => {
    const run = async () => {
      setBalancesLoading(true)

      try {
        const allCoins = await state.wallet.signer.provider.getAllCoins({
          owner: state.wallet?.publicKey.toSuiAddress(),
        })

        const result = allCoins.data.reduce((acc, cur) => ({
          ...acc,
          [cur.coinType.split('::')[2]]: cur.balance,
        }), {})

        setSuiBalance(result.SUI || 0)
        setUsdcBalance(result.USDC || 0)
      } catch (error) {
        console.error('Error loading account balances', error)
      }

      setBalancesLoading(false)
    }

    if (state.wallet && state.user) {
      run()
    }
  }, [state.wallet, state.user])

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
          <strong>{state.wallet?.publicKey.toSuiAddress()}</strong>
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
              : formatValue(fromBase(suiBalance))}
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
              : formatValue(fromBase(usdcBalance, 6))}
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
