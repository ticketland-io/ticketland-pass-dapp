import React, {useEffect, useState, useContext} from 'react'
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  InputLabel
} from '@mui/material'
import {useParams} from 'react-router-dom'
import {Context} from '../../core/Store'
import {fetchEvent} from '../../../services/events'
import SectionTitle from '../../components/SectionTitle'
import AsyncButton from '../../components/AsyncButton'
import {
  updateEventGuild,
  fetchGuildRoles,
  fetchUserGuild,
  submitGuildTicketRoles,
  fetchGuildTicketRoles,
  fetchEventGuild,
  updateTicketRoles
} from '../../../services/guild'
import styles from './styles'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Event = () => {
  const [state, dispatch] = useContext(Context)
  const {eventId} = useParams()
  const [rolesArray, setRolesArray] = useState([[], [], [], []])
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(true)
  const [guilds, setGuilds] = useState([])
  const [event, setEvent] = useState({})
  const [guild, setGuild] = useState({})
  const [roles, setRoles] = useState([])
  const [newRoles, setNewRoles] = useState([])
  const classes = styles()

  useEffect(() => {
    const run = async () => {
      if (eventId && state.user) {
        const event = await fetchEvent(state.firebase, eventId)
        const guilds = await fetchUserGuild(state.firebase)

        setEvent(event.result)
        setGuilds(guilds.result)
      }

    }
    run()
  }, [state.firebase, eventId, state.user])

  useEffect(() => {
    const run = async () => {
      if (guilds.length > 0) {
        try {
          const guild = await fetchEventGuild(state.firebase, eventId)
          const guildTicketRoles = await fetchGuildTicketRoles(state.firebase, guild.guild_id)

          setRolesArray(event[0].sales.map((ticket, index) => guildTicketRoles[index].roles))
          setNewRoles(guildTicketRoles)
          setGuild(guild)
        }
        catch (error) {
          setGuild({})
        }
      }
    }
    run()
  }, [guilds])

  useEffect(() => {
    const run = async () => {
      if (Object.keys(guild).length > 0) {
        const roles = await fetchGuildRoles(state.firebase, guild.guild_id)

        // setRolesArray(event[0].sales.map(() => []))
        setRoles(roles.map((role) => role.name))
      }
    }
    run()
  }, [guild])


  const handleSelectChange = async evt => {
    setIsChanged(false)
    setGuild(evt.target.value)
  }

  const handleMultipleSelectChange = (event, index) => {
    const {
      target: {value},
    } = event;
    let copy = [...rolesArray]

    copy[index] = (typeof value === 'string' ? value.split(',') : value)
    setRolesArray(copy)
    setIsChanged(false)
  }

  const onSubmit = () => {
    setButtonLoading(true)
    event[0]?.sales.forEach((ticket, index) => {
      if (newRoles.length > 0) {
        updateTicketRoles(state.firebase, newRoles[index].id, rolesArray[index])
      } else {
        submitGuildTicketRoles(
          state.firebase,
          {
            guild_id: guild.guild_id,
            roles: rolesArray[index],
            ticket_type_index: ticket.ticket_type_index
          }
        )

      }
    })
    newRoles.length < 1 && updateEventGuild(state.firebase, guild.guild_id, eventId)
    setIsChanged(true)
    setButtonLoading(false)
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.header}>
        <SectionTitle title={'My'} secondaryTitle={'event'} />
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item className={classes.eventName}>
          <Typography variant='subtitle'>
            {event[0]?.name}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl sx={{m: 1, width: 300}}>
            <InputLabel>
              <Typography variant='subtitle2'>Discord Server</Typography>
            </InputLabel>
            <Select
              label='Guild'
              value={guild}
              onChange={handleSelectChange}
            >
              {guilds.map((guild) =>
                <MenuItem value={guild}>{guild.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer} >
        <Table className={classes.table}>
          <TableHead>
            <TableCell>
              <Typography variant='subtitle2'>Ticket</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant='subtitle2'>Role</Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {event[0]?.sales.map((ticket, index) => (
              <TableRow key={ticket.event_id}>
                <TableCell>
                  <Typography variant='body1'>{ticket.ticket_type_name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <FormControl sx={{m: 1, width: 300}}>
                    <Select
                      multiple
                      disabled={Object.keys(guild).length === 0}
                      value={rolesArray[index]}
                      onChange={(value) => handleMultipleSelectChange(value, index)}
                      input={<OutlinedInput label="Roles" />}
                      renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                          {selected.map((value) => (
                            <Chip color='secondary' key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {roles.map((role) => (
                        <MenuItem
                          key={role}
                          value={role}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      <Grid item container>
        <AsyncButton
          variant='contained'
          fullWidth
          onClick={onSubmit}
          disabled={isChanged}
          // disabled={viewState === VIEW_STATES.NOT_STARTED}
          // className={classes.button}
          loading={buttonLoading}
        >
          Submit
        </AsyncButton>
      </Grid>
    </Grid>
  )
}

export default Event
