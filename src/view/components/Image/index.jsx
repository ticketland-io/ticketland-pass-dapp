import React, {useState, useRef} from 'react'
import {Skeleton} from '@mui/material'
import {useOnLoadImage} from '../../hooks/useOnLoadImage'
import styles from './styles'

const Image = props => {
  const {
    imageSrc,
    fallbackSrc,
    className,
    onLoaded,
    skeletonClassName = className,
    ...rest
  } = props
  const classes = styles()
  const ref = useRef(null)
  const [error, setError] = useState(false)
  const imageLoaded = useOnLoadImage(ref)

  // Prevents from falling into loop if the second image source fails
  const handleError = ({currentTarget}) => {
    if (!error) {
      setError(true)
      currentTarget.src = fallbackSrc
    }
  }

  return (
    <>
      <img
        ref={ref}
        className={imageLoaded ? className : classes.hidden}
        src={imageSrc || fallbackSrc}
        onError={handleError}
        {...rest}
      />
      {!imageLoaded && <Skeleton variant='rectangular' className={skeletonClassName} />}
    </>
  )
}

export default Image
