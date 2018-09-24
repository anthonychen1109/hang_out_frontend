import * as APIUtil from '../../util/categories_api_util';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const setCategories = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: {categories}
    }
}

export const getCategories = () => dispatch => {
    APIUtil.fetch_categories().then(categories => {
        dispatch(setCategories(categories))});
};