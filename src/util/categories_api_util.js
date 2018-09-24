export const fetch_categories = () => {
    return fetch('http://127.0.0.1:8000/api/v1/categories/')
    .then(r => r.json())
}