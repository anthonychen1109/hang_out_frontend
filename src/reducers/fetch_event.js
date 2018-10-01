import { FETCH_EVENT } from '../components/Events/actions';

const EventReducer = (state={event:{}}, action) => {
  switch(action.type) {
    case FETCH_EVENT:
      return {
        ...state,
        curr_event: action.payload.curr_event
      }
    default:
      return state
  }
}

export default EventReducer;
