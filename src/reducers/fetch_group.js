import { FETCH_GROUP } from '../components/Groups/actions';

const GroupReducer = (state={group:{}}, action) => {
  switch(action.type) {
    case FETCH_GROUP:
      return {
        ...state,
        group: action.payload.group
      }
    default:
      return state;
  }
}

export default GroupReducer;
