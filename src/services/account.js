import fetch, {createBearerHeader} from './api'

export const connectAccount = async (firebase, session_id) => await fetch(
  `${process.env.TICKETLAND_PASS_API}/accounts`,
  'PUT',
  {
    headers: createBearerHeader(await firebase.accessToken()),
    body: {
      session_id,
    },
  },
)

export const submitTicketVerification = async (firebase, verificationResult) => await fetch(
  `${process.env.TICKETLAND_PASS_API}/accounts/verifications`,
  'POST',
  {
    headers: createBearerHeader(await firebase.accessToken()),
    body: verificationResult,
  },
)
