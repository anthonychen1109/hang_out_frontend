import { FETCH_GROUPS } from '../components/Groups/actions';

const GroupsReducer = (state={groups: []}, action) => {
    switch(action.type) {
        case FETCH_GROUPS:
        console.log(action.payload.category.groups);
            return {
                ...state,
                groups: action.payload.category.groups
            }
        default:
            return state;
    }
}

export default GroupsReducer;
