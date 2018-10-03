export const fetch_category = (id) => {
  return fetch(`http://localhost:8000/api/v1/categories/${id}`)
  .then( r => r.json() )
}

export const fetch_group = (id) => {
  return fetch(`http://localhost:8000/api/v1/groups/${id}`)
  .then (r => r.json())
}

export const fetch_groups = () => {
  return fetch(`http://localhost:8000/api/v1/groups/`)
  .then (r => r.json())
}
