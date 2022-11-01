import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from 'react-responsive-carousel'
import styles from './styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel = props => {
  const {
    children,
    hideIndicators = false
  } = props
  const classes = styles()

  const renderArrowPrev = (onClick) => (
    <div onClick={onClick} style={{
      backgroundColor: '#272A32',
      position: 'absolute',
      top: '45%',
      left: '-50px',
      zIndex: 2,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ArrowBackIosNewIcon className={classes.carouselArrows}/>
    </div>
  )

  const renderArrowNext = (onClick) => (
    <div onClick={onClick} style={{
      backgroundColor: '#272A32',
      position: 'absolute',
      top: '45%',
      right: '-50px',
      zIndex: 2,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ArrowForwardIosIcon className={classes.carouselArrows}/>
    </div>
  )

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={!hideIndicators}
      infiniteLoop
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      slideStyle={classes.carousel}
    >
      {children}
    </Carousel>
  );
};

export default ImageCarousel
