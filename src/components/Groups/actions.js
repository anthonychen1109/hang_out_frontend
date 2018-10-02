import * as APIAdapter from '../../adapter/categories_api_adapter';

import * as GroupAPIAdapter from '../../adapter/groups_api_adapter';

export const FETCH_GROUPS = 'FETCH_GROUPS'
export const FETCH_GROUP = 'FETCH_GROUP'
export const JOIN_GROUP = 'JOIN_GROUP'

const setGroups = (category) => {
  return {
    type: FETCH_GROUPS,
    payload: {category}
  }
}

const setGroup = (group) => {
  return {
    type: FETCH_GROUP,
    payload: {group}
  }
}

export const getGroups = (id) => dispatch => {
  APIAdapter.fetch_category(id).then(category => {
    dispatch(setGroups(category))
  })
}

export const getGroup = (id) => dispatch => {
  GroupAPIAdapter.fetch_group(id).then(group => {
    dispatch(setGroup(group))
  })
}
