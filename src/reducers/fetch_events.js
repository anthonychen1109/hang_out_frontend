import { FETCH_EVENTS } from '../components/Events/actions';

const EventsReducer = (state={events: []}, action) => {
    switch(action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                events: action.payload.events
            }
        default:
            return state;
    }
}

export default EventsReducer;
