import * as APIAdapter from '../../adapter/categories_api_adapter';

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
    APIAdapter.fetch_categories().then(categories => {
      dispatch(setCategories(categories))
    });
};

export const getCategory = (id) => dispatch => {
  APIAdapter.fetch_category(id).then(category => {
    dispatch(setCategory(category))
    // console.log(category)
  })
}
