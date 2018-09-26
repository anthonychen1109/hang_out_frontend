import * as APIAdapter from '../../adapter/events_api_adapter';

export const FETCH_EVENTS = 'FETCH_EVENTS';

const setEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: {events}
    }
}

export const getEvents = () => dispatch => {
    APIAdapter.fetch_events().then(events => {
      dispatch(setEvents(events))
    });
};
