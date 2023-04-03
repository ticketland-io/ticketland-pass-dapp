import fetch, {createBearerHeader} from './api'

export const fetchEventsByUser = async firebase => await fetch(
  `${process.env.TICKETLAND_API}/events/current-user`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const fetchEvent = async (firebase, eventId) => await fetch(
  `${process.env.TICKETLAND_API}/events/${eventId}`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const getEventCoverImagePath = eventId => (
  `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-cover_image`
)
