import { combineReducers } from 'redux';
import CategoriesReducer from './fetch_categories';
import CategoryReducer from './fetch_category';
import EventsReducer from './fetch_events';
import GroupsReducer from './fetch_groups';
import UsersReducer from './fetch_user';
import GroupReducer from './fetch_group';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    category: CategoryReducer,
    events: EventsReducer,
    groups: GroupsReducer,
    userInfo: UsersReducer,
    group: GroupReducer
})

export default rootReducer;
