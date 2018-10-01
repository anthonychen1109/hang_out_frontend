export const fetch_events = () => {
  return fetch('http://localhost:8000/api/v1/events/', {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then (r => r.json() )
}

export const fetch_event = (id) => {
  return fetch(`http://localhost:8000/api/v1/events/${id}`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(r => r.json())
}
