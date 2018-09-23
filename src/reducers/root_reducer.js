import { combineReducers } from 'redux';
import CategoriesReducer from './fetch_categories';

const rootReducer = combineReducers({
    categories: CategoriesReducer
})

export default rootReducer;