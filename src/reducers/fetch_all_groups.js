import { FETCH_ALL_GROUPS } from '../components/Groups/actions';

const FetchAllReducer = (state={groups: []}, action) => {
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return {
        ...state,
        groups: action.payload.groups
      }
    default:
      return state
  }
}

export default FetchAllReducer;
