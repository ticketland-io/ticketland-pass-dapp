import React, {createContext, useReducer} from 'react'
import {reducer, initState} from '../../data/state'

const Store = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export const Context = createContext(initState)

export default React.memo(Store)
