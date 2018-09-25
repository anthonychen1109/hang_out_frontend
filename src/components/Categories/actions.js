import * as APIUtil from '../../util/categories_api_util';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORY = 'FETCH_CATEGORY'

const setCategories = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: {categories}
    }
}

const setCategory = (category) => {
  return {
    type: FETCH_CATEGORY,
    payload: {category}
  }
}

export const getCategories = () => dispatch => {
    APIUtil.fetch_categories().then(categories => {
      dispatch(setCategories(categories))
    });
};

export const fetch_category = () => dispatch => {
  APIUtil.fetch_categories().then(category => {
    dispatch(setCategory(category.id))
  })
}
