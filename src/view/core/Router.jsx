import React, {useEffect, useContext} from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import {Context} from '../core/Store'
import {setWalletType} from '../../data/actions'
import Home from '../pages/home'
import styles from './styles'
import Login from '../pages/login'
import Register from '../pages/register'
import Verify from '../pages/verify'
import Events from '../pages/events'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Event from '../pages/event'

const Router = props => {
  const [_, dispatch] = useContext(Context)
  const classes = styles()

  useEffect(() => {
    // The type will be ultimately decided by the end user
    dispatch(setWalletType('custody'))
  }, [])

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Header />
        <div className={classes.pageContainer} >
          <Routes>
            <Route exact strict path='/' element={<Home />} />
            <Route exact strict path='/login' element={<Login />} />
            <Route exact strict path='/register' element={<Register />} />
            <Route exact strict path='/verify' element={<Verify />} />
            <Route exact strict path='/events' element={<Events />} />
            <Route exact strict path='/events/:eventId' element={<Event />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default Router
