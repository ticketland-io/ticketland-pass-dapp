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
  Grid
} from '@mui/material'
import {format} from 'date-fns'
import {fetchEventsByUser} from '../../../services/events'
import {Context} from '../../core/Store'
import SectionTitle from '../../components/SectionTitle'
import styles from './styles'

const Events = props => {
  const [state, dispatch] = useContext(Context)
  const [events, setEvents] = useState([])
  const classes = styles()

  useEffect(async () => {
    const run = async () => {
      if (state.user) {
        const events = await fetchEventsByUser(state.firebase)
        setEvents(events.result)
      }
    }
    run()
  }, [state.firebase, state.user])

  return (
    <Grid container>
      <Grid item xs={12} className={classes.header}>
        <SectionTitle title={'My'} />
      </Grid>
      <TableContainer className={classes.tableContainer} >
        <Table className={classes.table}>
          <TableHead>
            <TableCell><Typography variant='subtitle2'>Name</Typography></TableCell>
            <TableCell align="right"><Typography variant='subtitle2'>Created</Typography></TableCell>
            <TableCell align="right"><Typography variant='subtitle2'>Start Date</Typography></TableCell>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.event_id}>
                <TableCell>
                  <Link to={`/events/${event?.event_id}`} style={{textDecoration: 'none'}}>
                    <Typography variant='body1'>{event.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Typography variant='body1'>{format(new Date(event.created_at), 'dd.MM.yy')}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant='body1'>{format(new Date(event.start_date), 'dd.MM.yy')}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </Grid>
  )
}

export default React.memo(Events)
