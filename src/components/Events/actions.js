import * as APIAdapter from '../../adapter/events_api_adapter';
import * as UserAPIAdapter from '../../adapter/users_api_adapter';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

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
