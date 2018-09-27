import * as APIAdapter from '../../adapter/categories_api_adapter';

export const FETCH_GROUPS = 'FETCH_GROUPS'

const setGroups = (category) => {
  return {
    type: FETCH_GROUPS,
    payload: {category}
  }
}

export const getGroups = (id) => dispatch => {
  APIAdapter.fetch_category(id).then(category => {
    dispatch(setGroups(category))
  })
}
