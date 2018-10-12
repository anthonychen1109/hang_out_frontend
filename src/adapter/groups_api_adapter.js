export const fetch_category = (id) => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/categories/${id}`)
  .then( r => r.json() )
}

export const fetch_group = (id) => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/groups/${id}`)
  .then (r => r.json())
}

export const fetch_groups = () => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/groups/`)
  .then (r => r.json())
}
