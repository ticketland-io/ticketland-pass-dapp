import makeStyles from '@mui/styles/makeStyles'
import backgroundImage from '../../../assets/bg.png'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%'
  },
  backgroundColor: {
    backgroundColor: theme.palette.common.yellow100,
    position: 'absolute',
    top: '-79px',
    left: 0,
    width: '100%',
    height: '592px',
  },
  innerContainer: {
    maxWidth: '1224px',
    margin: 'auto',
    zIndex: '1',
    position: 'relative',
  },
  welcomeText: {
    fontSize: '4.75rem',
    lineHeight: '4.75rem',
    marginTop: '5.5rem'
  },
  subText: {
    fontSize: '1rem',
    width: '424px'
  },
  carousel: {
    borderRadius: '15px'
  },
  newEventsTextItem: {
    marginBottom: '1rem',
    marginTop: '4.5rem',
  },
  newEventsText: {
    fontSize: '2rem'
  },
  carouselEventContainer: {
    margin: '8px 8px 8px 8px'
  },
  carouselEventDescription: {
    backgroundColor: theme.palette.common.gray100,
    margin: '16px 16px 16px 0px',
    borderRadius: '12px',
    width: '296px',
    height: '168px',
    overflowX: 'auto',
    padding: '0.75rem'
  },
  carouselEventInfo: {
    borderRadius: '12px',
    border: '1px solid',
    padding: '0.25rem',
    margin: '0px 16px 16px 0px',
    borderColor: theme.palette.common.gray100
  },
  iconColor: {
    color: theme.palette.common.gray500,
    fontSize: '15px'
  },
  infoText: {
    marginLeft: '0.3rem'
  },
  carouselArrows: {
    color: theme.palette.common.yellow500,
    fontSize: '15px',
  },
  imageItem: {
    padding: '8px'
  },
  imageEvent: {
    borderRadius: '16px 3px 3px 16px'
  },
  descriptionHeader: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '8px'
  },
  descriptionText: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  },
  liveIconItem: {
    position: 'absolute',
    top: '8%',
    left: '4%'
  },
  socialMediaItem: {
    marginBottom: '1rem'
  },
  socialMediaText: {
    fontSize: '1rem',
    color: '#7E8186'
  },
  loginFormInnerFirstContainer: {
    padding: '1.5rem 1.5rem 2rem 1.5rem'
  },
  imageCarouselCard: {
    display: 'flex'
  }
}))
