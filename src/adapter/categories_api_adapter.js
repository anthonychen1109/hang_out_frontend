export const fetch_categories = () => {
    return fetch('http://localhost:8000/api/v1/categories/')
    .then( r => r.json() )
}

export const fetch_category = (id) => {
  return fetch(`http://localhost:8000/api/v1/categories/${id}`)
  .then( r => r.json() )
}
