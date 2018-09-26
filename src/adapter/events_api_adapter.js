export const fetch_events = () => {
  return fetch('http://127.0.0.1:8000/api/v1/events/')
  .then (r => r.json() )
}
