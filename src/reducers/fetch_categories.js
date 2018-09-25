import { FETCH_CATEGORIES } from '../components/Categories/actions';

const CategoriesReducer = (state={categories: []}, action) => {
    switch(action.type) {
        case FETCH_CATEGORIES:
        console.log('reducer', action.payload.categories);
            return {
                ...state,
                categories: action.payload.categories
            }
        default:
            return state;
    }
}

export default CategoriesReducer;
