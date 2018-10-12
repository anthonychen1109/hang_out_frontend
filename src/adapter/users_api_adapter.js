export const fetch_user = (id) => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/profiles/${id}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  })
    .then( r => r.json() )
}
