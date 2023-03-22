import {useState, useEffect} from 'react'

export const useOnLoadImage = ref => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      setStatus(ref.current.complete)
    }

    if (!ref?.current) return

    ref.current.addEventListener('load', () => updateStatus(), {
      once: true,
    })
  }, [ref])

  return status
}
