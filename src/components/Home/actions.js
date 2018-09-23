export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const fetchCategories = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: { categories }
    }
}

export const getCategories = () => {
    const request = fetch(`http://127.0.0.1:8000/api/v1/categories/`)
    return dispatch => {
        request.then( data => dispatch(fetchCategories(data)))
    }
} 