import fetch, {createBearerHeader} from './api'

export const connectAccount = async (firebase, session_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/accounts`,
    'PUT',
    {
      headers: createBearerHeader(firebase.accessToken()),
      body: {
        session_id,
      }
    },
  )
}

export const submitTicketVerification = async (firebase, verificationResult) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/accounts/verifications`,
    'POST',
    {
      headers: createBearerHeader(firebase.accessToken()),
      body: verificationResult
    },
  )
}