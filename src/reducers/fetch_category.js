import { FETCH_CATEGORY } from '../components/Categories/actions';

const CategoryReducer = (state={category: {}}, action) => {
    switch(action.type) {
        case FETCH_CATEGORY:
        console.log("category reducer", action.payload.category);
            return {
                ...state,
                category: action.payload.category
            }
        default:
            return state;
    }
}

export default CategoryReducer;
