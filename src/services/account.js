export const connectAccount = async (firebase, session_id) => {
  return await fetch(
    `${process.env.TICKETLAND_PASS_API}/listings/${sellListingAccount}/sells`,
    'POST',
    {
      headers: createBearerHeader(firebase.accessToken()),
      body: {
        session_id,
      }
    },
  )
}
