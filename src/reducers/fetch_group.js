import { FETCH_GROUP } from '../components/Groups/actions';

const GroupReducer = (state={group:{}}, action) => {
  switch(action.type) {
    case FETCH_GROUP:
    console.log(action.payload.group);
      return {
        ...state,
        action.payload.group
      }
    default:
      return state;
  }
}
