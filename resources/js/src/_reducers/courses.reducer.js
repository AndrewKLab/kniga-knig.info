import { coursesConstants, pagesConstants } from '../_constants';

const initialState = {
    get_all_courses_loading: false,
    get_all_courses_message: null,
    get_all_courses_error: null,
    get_all_courses: null,

    get_all_by_category_id_courses_loading: false,
    get_all_by_category_id_courses_message: null,
    get_all_by_category_id_courses_error: null,
    get_all_by_category_id_courses: null,

    get_one_by_course_id_courses_loading: false,
    get_one_by_course_id_courses_message: null,
    get_one_by_course_id_courses_error: null,
    get_one_by_course_id_courses: null,
}

export function courses(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        // GET_ALL_COURSES_CATEGORIES
        case coursesConstants.GET_ALL_COURSES_REQUEST:
            return {
                ...state,
                get_all_courses_loading: true,
                get_all_courses_message: null,
                get_all_courses_error: null,
                get_all_courses: null,
            };
        case coursesConstants.GET_ALL_COURSES_SUCCESS:
            return {
                ...state,
                get_all_courses_loading: false,
                get_all_courses_message: action.res.message,
                get_all_courses_error: null,
                get_all_courses: action.res.courses,
            };
        case coursesConstants.GET_ALL_COURSES_FAILURE:
            return {
                ...state,
                get_all_courses_loading: false,
                get_all_courses_message: null,
                get_all_courses_error: null,
                get_all_courses: action.error,
            };

        // GET_ALL_BY_CATEGORY_ID_COURSES_CATEGORIES
        case coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_REQUEST:
            return {
                ...state,
                get_all_by_category_id_courses_loading: true,
                get_all_by_category_id_courses_message: null,
                get_all_by_category_id_courses_error: null,
                get_all_by_category_id_courses: null,
            };
        case coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_SUCCESS:
            return {
                ...state,
                get_all_by_category_id_courses_loading: false,
                get_all_by_category_id_courses_message: action.res.message,
                get_all_by_category_id_courses_error: null,
                get_all_by_category_id_courses: action.res.courses,
            };
        case coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_FAILURE:

        // GET_ONE_BY_COURSE_ID_COURSES
        case coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_REQUEST:
            return {
                ...state,
                get_one_by_course_id_courses_loading: true,
                get_one_by_course_id_courses_message: null,
                get_one_by_course_id_courses_error: null,
                get_one_by_course_id_courses: null,
            };
        case coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_SUCCESS:
            return {
                ...state,
                get_one_by_course_id_courses_loading: false,
                get_one_by_course_id_courses_message: action.res.message,
                get_one_by_course_id_courses_error: null,
                get_one_by_course_id_courses: action.res.course,
            };
        case coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_FAILURE:
            return {
                ...state,
                get_one_by_course_id_courses_loading: true,
                get_one_by_course_id_courses_message: null,
                get_one_by_course_id_courses_error: null,
                get_one_by_course_id_courses: action.error,
            };

        default:
            return state
    }
}