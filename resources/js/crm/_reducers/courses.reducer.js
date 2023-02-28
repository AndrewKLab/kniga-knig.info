import { coursesConstants, pagesConstants } from '../_constants';

const initialState = {
    course_page_tab: 1,
    course_page_tab_table: 1,

    add_courses_loading: false,
    add_courses_message: null,
    add_courses_errors: null,
    add_courses_error_message: null,
    add_courses: null,

    edit_courses_loading: false,
    edit_courses_message: null,
    edit_courses_errors: null,
    edit_courses_error_message: null,
    edit_courses: null,

    edit_published_courses_loading: false,
    edit_published_courses_message: null,
    edit_published_courses_errors: null,
    edit_published_courses_error_message: null,
    edit_published_courses: null,

    remove_courses_loading: false,
    remove_courses_message: null,
    remove_courses_error: null,
    remove_courses: null,

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

        case coursesConstants.SET_COURSES_PAGE_TAB:
            return {
                ...state,
                course_page_tab: action.tab,
            }
        case coursesConstants.SET_COURSES_PAGE_TAB_TABLE:
            return {
                ...state,
                course_page_tab_table: action.table,
            }

        // ADD_COURSES_CATEGORIES
        case coursesConstants.ADD_COURSES_REQUEST:
            return {
                ...state,
                add_courses_loading: true,
                add_courses_message: null,
                add_courses_errors: null,
                add_courses_error_message: null,
                add_courses: null,
            };
        case coursesConstants.ADD_COURSES_SUCCESS:
            return {
                ...state,
                add_courses_loading: false,
                add_courses_message: action.res.message,
                add_courses_errors: null,
                add_courses_error_message: null,
                add_courses: null,
            };
        case coursesConstants.ADD_COURSES_FAILURE:
            return {
                ...state,
                add_courses_loading: false,
                add_courses_message: null,
                add_courses_errors: action.error.data,
                add_courses_error_message: action.error.message,
                add_courses: null,
            };

        // EDIT_COURSES_CATEGORIES
        case coursesConstants.EDIT_COURSES_REQUEST:
            return {
                ...state,
                edit_courses_loading: true,
                edit_courses_message: null,
                edit_courses_errors: null,
                edit_courses_error_message: null,
                edit_courses: null,
            };
        case coursesConstants.EDIT_COURSES_SUCCESS:
            return {
                ...state,
                edit_courses_loading: false,
                edit_courses_message: action.res.message,
                edit_courses_errors: null,
                edit_courses_error_message: null,
                edit_courses: null,

                get_one_by_course_id_courses: action.res.course,
            };
        case coursesConstants.EDIT_COURSES_FAILURE:
            return {
                ...state,
                edit_courses_loading: false,
                edit_courses_message: null,
                edit_courses_errors: action.error.data,
                edit_courses_error_message: action.error.message,
                edit_courses: null,
            };

        // EDIT_PUBLISHED_COURSES
        case coursesConstants.EDIT_PUBLISHED_COURSES_REQUEST:
            return {
                ...state,
                edit_published_courses_loading: true,
                edit_published_courses_message: null,
                edit_published_courses_errors: null,
                edit_published_courses_error_message: null,
                edit_published_courses: null,
            };
        case coursesConstants.EDIT_PUBLISHED_COURSES_SUCCESS:
            return {
                ...state,
                edit_published_courses_loading: false,
                edit_published_courses_message: action.res.message,
                edit_published_courses_errors: null,
                edit_published_courses_error_message: null,
                edit_published_courses: null,

                get_one_by_course_id_courses: action.res.course,
            };
        case coursesConstants.EDIT_PUBLISHED_COURSES_FAILURE:
            return {
                ...state,
                edit_published_courses_loading: false,
                edit_published_courses_message: null,
                edit_published_courses_errors: action.error.data,
                edit_published_courses_error_message: action.error.message,
                edit_published_courses: null,
            };

        // REMOVE_COURSES_CATEGORIES
        case coursesConstants.REMOVE_COURSES_REQUEST:
            return {
                ...state,
                remove_courses_loading: true,
                remove_courses_message: null,
                remove_courses_error: null,
                remove_courses: null,
            };
        case coursesConstants.REMOVE_COURSES_SUCCESS:
            return {
                ...state,
                remove_courses_loading: false,
                remove_courses_message: action.res.message,
                remove_courses_error: null,
                remove_courses: null,
            };
        case coursesConstants.REMOVE_COURSES_FAILURE:
            return {
                ...state,
                remove_courses_loading: false,
                remove_courses_message: null,
                remove_courses_error: action.error,
                remove_courses: null,
            };

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