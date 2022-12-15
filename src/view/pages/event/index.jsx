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
  createGuildAcl,
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

const areEqual = (allRoles, guildAclRoles = []) => allRoles.length === guildAclRoles.length
  && allRoles.every(element => guildAclRoles.includes(element))

const isEmpty = (obj) => Object.keys(obj).length < 1;

const Event = () => {
  const {eventId} = useParams()
  const [state, dispatch] = useContext(Context)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isGuildDisabled, setIsGuildDisabled] = useState(false)
  const [roles, setRoles] = useState([])
  const [guilds, setGuilds] = useState([])
  const [event, setEvent] = useState({})
  const [guild, setGuild] = useState('')
  const [isGuildSelected, setIsGuildSelected] = useState(false)
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
      if (guilds.length > 0 && state.user && !isEmpty(event)) {
        try {
          const currentGuild = guilds.find(g => g.event_id === eventId)
          const newGuildAcls = await fetchGuildAcls(state.firebase, currentGuild.guild_id)

          setRoles(event.sales.map((sale) =>
            newGuildAcls?.find(guild_acl =>
              guild_acl.ticket_type_index === sale.ticket_type_index
            )?.roles
          ))
          setGuildAcls(newGuildAcls)
          setGuild(currentGuild.guild_id)
          !isEmpty(currentGuild) && setIsGuildSelected(true)
        }
        catch (error) {
          setGuild('')
        }
      }
    }

    run()
  }, [state.firebase, state.user, guilds, event])

  useEffect(() => {
    const run = async () => {
      if (!isEmpty(guild) && state.user) {
        setIsGuildDisabled(true)
        const roles = await fetchGuildRoles(state.firebase, guild)

        setAllRoles(roles.map((role) => role.name))
      }
    }

    run()
  }, [state.firebase, guild, state.user])


  const handleSelectChange = async evt => {
    setGuild(evt.target.value)
  }

  const handleMultipleSelectChange = (event, ticket_type_index) => {
    const {
      target: {value},
    } = event
    let copy = [...roles]

    copy[ticket_type_index] = value
    setRoles(copy)
  }

  const onSubmit = async () => {
    setButtonLoading(true)
    const updatedGuildAcls = await Promise.all(
      event?.sales.map(async (sale, ticket_type_index) => {
        const guildAclIndex = guildAcls?.findIndex(g => g?.ticket_type_index === ticket_type_index)

        if (guildAcls[guildAclIndex]?.roles && !areEqual(roles[ticket_type_index], guildAcls[guildAclIndex]?.roles)) {
          const guildAclResult = await updateGuildAcl(state.firebase, guildAcls[guildAclIndex].id, roles[ticket_type_index])

          return guildAclResult

        } else if (guildAclIndex === -1 && roles[ticket_type_index]?.length > 0) {
          const guildAclResult = await createGuildAcl(
            state.firebase,
            {
              guild_id: guild,
              roles: roles[ticket_type_index],
              ticket_type_index: sale.ticket_type_index
            }
          )

          return guildAclResult
        }

        return guildAcls[guildAclIndex]
      })
    )
    setGuildAcls(updatedGuildAcls)
    if (!isGuildSelected) {
      updateEventGuild(state.firebase, guild, eventId)
      setIsGuildSelected(true)
    }
    setIsGuildDisabled(true)
    setButtonLoading(false)
  }

  const isSubmitDisabled = () => {
    if (!isEmpty(event)) {
      return event?.sales.every((sale, ticket_type_index) => {
        const guildAclIndex = guildAcls?.findIndex(g => g?.ticket_type_index === ticket_type_index)
        const hasUpdatedRoles = guildAcls[guildAclIndex]?.roles && !areEqual(roles[ticket_type_index], guildAcls[guildAclIndex]?.roles)
        const isNewGuildAcl = guildAclIndex === -1 && roles[ticket_type_index]?.length > 0

        return (!hasUpdatedRoles && !isNewGuildAcl)
      })
    } else {
      return true
    }
  }

  const renderSelectRoles = (ticket_type_index) => (
    !isEmpty(guild) && (
      <FormControl sx={{m: 1, width: 300}}>
        <Select
          multiple
          value={roles[ticket_type_index] || []}
          onChange={(value) => handleMultipleSelectChange(value, ticket_type_index)}
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
                <MenuItem
                  key={g.guild_id}
                  value={g.guild_id}
                  disabled={Boolean(g.event_id)}
                >
                  {g.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer} >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='subtitle2'>Ticket Type</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant='subtitle2'>Role</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event.sales?.map((sale) => (
              <TableRow key={sale.ticket_type_index}>
                <TableCell>
                  <Typography variant='body1'>{sale.ticket_type_name}</Typography>
                </TableCell>
                <TableCell align="right">
                  {renderSelectRoles(sale.ticket_type_index)}
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
          disabled={isSubmitDisabled()}
          loading={buttonLoading}
        >
          Submit
        </AsyncButton>
      </Grid>
    </Grid>
  )
}

export default Event
