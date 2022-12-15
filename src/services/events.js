import fetch, {createBearerHeader} from './api'

export const fetchEventsByUser = async (firebase) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events/current-user`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )
}

export const fetchEvent = async (firebase, eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events/${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}
