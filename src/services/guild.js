import fetch, {createBearerHeader} from './api'

export const fetchGuild = async (firebase, guild_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const fetchGuildRoles = async (firebase, guild_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}/roles`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const fetchUserGuild = async (firebase) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const submitGuildTicketRoles = async (firebase, guildTicketRoles) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/guild-acl`,
    'POST',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: guildTicketRoles
    },
  )
}

export const updateEventGuild = async (firebase, guild_id, event_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}/event`,
    'PUT',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: {event_id}
    },
  )
}

export const fetchGuildTicketRoles = async (firebase, guild_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}/guild-acls`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const fetchEventGuild = async (firebase, event_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${event_id}/guild`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const updateTicketRoles = async (firebase, guild_acl_id, roles) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_acl_id}`,
    'PUT',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: {roles}
    },
  )
}
