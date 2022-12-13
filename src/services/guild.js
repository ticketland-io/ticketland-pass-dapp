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

export const fetchUserGuilds = async (firebase) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const createGuildAcl = async (firebase, guildTicketRoles) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guild-acl`,
    'POST',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: guildTicketRoles
    },
  )
}

export const updateEventGuild = async (firebase, guild_id, event_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}`,
    'PUT',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: {event_id}
    },
  )
}

export const fetchGuildAcls = async (firebase, guild_id) => {
  const params = new URLSearchParams({
    guild_id
  })
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guild-acls?${params}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const updateGuildAcl = async (firebase, guild_acl_id, roles) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guild-acls/${guild_acl_id}`,
    'PUT',
    {
      headers: createBearerHeader(await firebase.accessToken()),
      body: {roles}
    },
  )
}
