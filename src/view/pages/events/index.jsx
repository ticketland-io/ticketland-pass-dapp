import React, {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@mui/material'
import {format} from 'date-fns'
import {fetchEventsByUser} from '../../../services/events'
import {Context} from '../../core/Store'
import SectionTitle from '../../components/SectionTitle'
import {fetchUserGuilds} from '../../../services/guild'
import styles from './styles'

const Events = () => {
  const [state] = useContext(Context)
  const [events, setEvents] = useState([])
  const [guilds, setGuilds] = useState([])
  const classes = styles()

  useEffect(async () => {
    const run = async () => {
      if (state.user) {
        const {result: userGuilds} = await fetchUserGuilds(state.firebase)
        const {result} = await fetchEventsByUser(state.firebase)

        setGuilds(userGuilds)
        setEvents(result)
      }
    }
    run()
  }, [state.firebase, state.user])

  return (
    <Grid container px={{xs: 4, lg: 0}}>
      <Grid item xs={12} className={classes.header}>
        <SectionTitle title='My' />
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='subtitle2'>Name</Typography></TableCell>
              <TableCell align='right'><Typography variant='subtitle2'>Created</Typography></TableCell>
              <TableCell align='right'><Typography variant='subtitle2'>Start Date</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.event_id}>
                <TableCell>
                  <Link to={`/events/${event?.event_id}`} style={{textDecoration: 'none'}}>
                    <Typography variant='body1'>{event.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body1'>{format(new Date(event.created_at), 'dd.MM.yy')}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body1'>{format(new Date(event.start_date), 'dd.MM.yy')}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} className={classes.header}>
        <SectionTitle secondaryTitle='Discord servers' />
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='subtitle2'>Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guilds.map(({name}) => (
              <TableRow key={name}>
                <TableCell>
                  <Typography variant='body1'>{name}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default React.memo(Events)
