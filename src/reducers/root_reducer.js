import { combineReducers } from 'redux';
import CategoriesReducer from './fetch_categories';
import CategoryReducer from './fetch_category';
import EventsReducer from './fetch_events';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    category: CategoryReducer,
    events: EventsReducer
})

export default rootReducer;
