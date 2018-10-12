export const fetch_events = () => {
  return fetch('https://hang-out-backend.herokuapp.com/api/v1/events/', {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then (r => r.json() )
}

export const fetch_event = (id) => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/events/${id}`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(r => r.json())
}
