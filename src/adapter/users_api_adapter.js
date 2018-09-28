export const fetch_user = (id) => {
  return fetch(`http://127.0.0.1:8000/api/v1/profiles/${id}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  })
    .then( r => r.json() )
}
