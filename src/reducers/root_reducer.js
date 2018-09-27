import { combineReducers } from 'redux';
import CategoriesReducer from './fetch_categories';
import CategoryReducer from './fetch_category';
import EventsReducer from './fetch_events';
import GroupsReducer from './fetch_groups';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    category: CategoryReducer,
    events: EventsReducer,
    groups: GroupsReducer
})

export default rootReducer;
