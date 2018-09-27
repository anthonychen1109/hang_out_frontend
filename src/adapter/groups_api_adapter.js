export const fetch_category = (id) => {
  return fetch(`http://127.0.0.1:8000/api/v1/categories/${id}`)
  .then( r => r.json() )
}
