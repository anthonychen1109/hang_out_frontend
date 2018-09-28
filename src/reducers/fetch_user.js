import { FETCH_USER_INFO } from '../components/Events/actions';

const UsersReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_USER_INFO:
      return {
        ...state,
        user: action.payload.userInfo
      }
    default:
      return state
  }
}

export default UsersReducer;
