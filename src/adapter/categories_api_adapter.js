export const fetch_categories = () => {
    return fetch('https://hang-out-backend.herokuapp.com/api/v1/categories/')
    .then( r => r.json() )
}

export const fetch_category = (id) => {
  return fetch(`https://hang-out-backend.herokuapp.com/api/v1/categories/${id}`)
  .then( r => r.json() )
}
