import fetch, {createBearerHeader} from './api'

export const getGuild = async (firebase, guild_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds/${guild_id}`,
    'GET',
    {
      headers: createBearerHeader(firebase.accessToken()),
    },
  )
}

export const getUserGuild = async (firebase) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/discord/guilds`,
    'GET',
    {
      headers: createBearerHeader(firebase.accessToken()),
    },
  )
}
