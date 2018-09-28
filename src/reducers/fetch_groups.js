import { FETCH_GROUPS } from '../components/Groups/actions';

const GroupsReducer = (state={groups: []}, action) => {
    switch(action.type) {
        case FETCH_GROUPS:
            return {
                ...state,
                groups: action.payload.category.groups
            }
        default:
            return state;
    }
}

export default GroupsReducer;
