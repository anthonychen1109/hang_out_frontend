import { combineReducers } from 'redux';
import CategoriesReducer from './fetch_categories';
import CategoryReducer from './fetch_category';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    category: CategoryReducer
})

export default rootReducer;
