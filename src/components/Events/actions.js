import * as APIAdapter from '../../adapter/events_api_adapter';
import * as UserAPIAdapter from '../../adapter/users_api_adapter';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_EVENT = 'FETCH_EVENT';

const setEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: {events}
    }
}

const setUserInfo = (userInfo) => {
  return {
    type: FETCH_USER_INFO,
    payload: {userInfo}
  }
}

const setEvent = (curr_event) => {
  return {
    type: FETCH_EVENT,
    payload: {curr_event}
  }
}

export const getEvents = () => dispatch => {
    APIAdapter.fetch_events().then(events => {
      dispatch(setEvents(events))
    });
};

export const getUserInfo = (id) => dispatch => {
  UserAPIAdapter.fetch_user(id).then(info => {
    dispatch(setUserInfo(info))
  })
}

export const getEvent = (id) => dispatch => {
  APIAdapter.fetch_event(id).then(curr_event => {
    dispatch(setEvent(curr_event))
  })
}
