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
  fetchUserGuilds,
  createGuildTicketRoles,
  fetchGuildAcls,
  updateGuildAcl
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

const areEqual = (roles, guildAcls) => roles.length === guildAcls?.length ? roles.every(element => guildAcls.includes(element)) : false

const isEmpty = (obj) => Object.keys(obj).length < 1;

const Event = () => {
  const [roles, setRoles] = useState([[]])
  const [state, dispatch] = useContext(Context)
  const {eventId} = useParams()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [isGuildDisabled, setIsGuildDisabled] = useState(false)
  const [guilds, setGuilds] = useState([])
  const [event, setEvent] = useState({})
  const [guild, setGuild] = useState({})
  const [allRoles, setAllRoles] = useState([])
  const [guildAcls, setGuildAcls] = useState([])
  const classes = styles()

  useEffect(() => {
    const run = async () => {
      if (eventId && state.user) {
        const event = await fetchEvent(state.firebase, eventId)
        const guilds = await fetchUserGuilds(state.firebase)

        setEvent(event.result[0])
        setGuilds(guilds.result)
      }
    }
    run()
  }, [state.firebase, eventId, state.user])

  useEffect(() => {
    const run = async () => {
      if (guilds.length > 0 && state.user) {
        try {
          const guild = guilds.filter(g => g.event_id === eventId)[0]
          const guildAcls = await fetchGuildAcls(state.firebase, guild.guild_id)

          setRoles(event.sales.map((ticket, index) => guildAcls[index].roles))
          setGuildAcls(guildAcls)
          setGuild(guild.guild_id)
        }
        catch (error) {
          setGuild({})
        }
      }
    }

    run()
  }, [state.firebase, guilds])

  useEffect(() => {
    const run = async () => {
      if (!isEmpty(guild)) {
        setIsGuildDisabled(true)
        const roles = await fetchGuildRoles(state.firebase, guild)

        setAllRoles(roles.map((role) => role.name))
      }
    }

    run()
  }, [guild])


  const handleSelectChange = async evt => {
    setIsChanged(true)
    setGuild(evt.target.value)
  }

  const handleMultipleSelectChange = (event, index) => {
    const {
      target: {value},
    } = event;
    let copy = [...roles]

    copy[index] = (typeof value === 'string' ? value.split(',') : value)
    setRoles(copy)
    setIsChanged(true)
  }

  const onSubmit = () => {
    setButtonLoading(true)
    Promise.all(
      event?.sales.map(async (sale, index) => {
        const guildAcl = guildAcls.find(g => g.ticket_type_index === sale.ticket_type_index)

        if (typeof guildAcl?.roles !== 'undefined' && !areEqual(roles[index], guildAcl?.roles)) {
          updateGuildAcl(state.firebase, guildAcl.id, roles[index])

        } else if (!guilds.filter(g => g.event_id === eventId)[0]) {
          const guildAclsResult = await createGuildTicketRoles(
            state.firebase,
            {
              guild_id: guild,
              roles: roles[index],
              ticket_type_index: sale.ticket_type_index
            }
          )
          guildAcl = guildAclsResult
          setGuildAcls(guildAcls)
        }
      })
    )
    guildAcls.length < 1 && updateEventGuild(state.firebase, guild, eventId)
    setIsChanged(false)
    setIsGuildDisabled(true)
    setButtonLoading(false)
  }

  const renderSelectRoles = (index) => (
    !isEmpty(guild) &&
    <FormControl sx={{m: 1, width: 300}}>
      <Select
        multiple
        value={roles[index] || []}
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
        {allRoles.map((role) => (
          <MenuItem
            key={role}
            value={role}
          >
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.header}>
        <SectionTitle title={'My'} secondaryTitle={'event'} />
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item className={classes.eventName}>
          <Typography variant='cardSubtitle'>
            {event?.name}
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
              disabled={isGuildDisabled}
            >
              {guilds.map(g =>
                <MenuItem key={g.guild_id} value={g.guild_id}>{g.name}</MenuItem>
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
            {event.sales?.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='body1'>{ticket.ticket_type_name}</Typography>
                </TableCell>
                <TableCell align="right">
                  {renderSelectRoles(index)}
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
          disabled={!isChanged}
          loading={buttonLoading}
        >
          Submit
        </AsyncButton>
      </Grid>
    </Grid>
  )
}

export default Event
