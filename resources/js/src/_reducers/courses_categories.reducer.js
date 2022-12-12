import { coursesCategoriesConstants } from '../_constants';

const initialState = {
    get_all_courses_categories_loading: false,
    get_all_courses_categories_message: null,
    get_all_courses_categories_error: null,
    get_all_courses_categories: null,

    get_one_by_category_id_courses_categories_loading: false,
    get_one_by_category_id_courses_categories_message: null,
    get_one_by_category_id_courses_categories_error: null,
    get_one_by_category_id_courses_categories: null,
}

export function courses_categories(state = initialState, action) {
    switch (action.type) {
        // GET_ALL_COURSES_CATEGORIES
        case coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_REQUEST:
            return {
                ...state,
                get_all_courses_categories_loading: true,
                get_all_courses_categories_message: null,
                get_all_courses_categories_error: null,
                get_all_courses_categories: null,
            };
        case coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_SUCCESS:
            return {
                ...state,
                get_all_courses_categories_loading: false,
                get_all_courses_categories_message: action.res.message,
                get_all_courses_categories_error: null,
                get_all_courses_categories: action.res.categories,
            };
        case coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_FAILURE:
            return {
                ...state,
                get_all_courses_categories_loading: false,
                get_all_courses_categories_message: null,
                get_all_courses_categories_error: null,
                get_all_courses_categories: action.error,
            };

        // GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES
        case coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_REQUEST:
            return {
                ...state,
                get_one_by_category_id_courses_categories_loading: true,
                get_one_by_category_id_courses_categories_message: null,
                get_one_by_category_id_courses_categories_error: null,
                get_one_by_category_id_courses_categories: null,
            };
        case coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_SUCCESS:
            return {
                ...state,
                get_one_by_category_id_courses_categories_loading: false,
                get_one_by_category_id_courses_categories_message: action.res.message,
                get_one_by_category_id_courses_categories_error: null,
                get_one_by_category_id_courses_categories: action.res.category,
            };
        case coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_FAILURE:
            return {
                ...state,
                get_one_by_category_id_courses_categories_loading: false,
                get_one_by_category_id_courses_categories_message: null,
                get_one_by_category_id_courses_categories_error: null,
                get_one_by_category_id_courses_categories: action.error,
            };

        default:
            return state
    }
}