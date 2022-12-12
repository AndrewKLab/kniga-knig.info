import { lessonsConstants, pagesConstants } from '../_constants';

const initialState = {
    lesson_editor_action: null,
    lesson_editor_kk_lesson_id: null,

    add_lessons_loading: false,
    add_lessons_message: null,
    add_lessons_errors: null,
    add_lessons_error_message: null,
    add_lessons: null,

    edit_lessons_loading: false,
    edit_lessons_message: null,
    edit_lessons_errors: null,
    edit_lessons_error_message: null,
    edit_lessons: null,

    remove_lessons_loading: false,
    remove_lessons_message: null,
    remove_lessons_error: null,
    remove_lessons: null,


    // get_all_lessons_loading: false,
    // get_all_lessons_message: null,
    // get_all_lessons_error: null,
    // get_all_lessons: null,

    get_all_by_course_id_lessons_loading: false,
    get_all_by_course_id_lessons_message: null,
    get_all_by_course_id_lessons_error: null,
    get_all_by_course_id_lessons: null,

    get_one_by_lesson_id_lessons_loading: false,
    get_one_by_lesson_id_lessons_message: null,
    get_one_by_lesson_id_lessons_error: null,
    get_one_by_lesson_id_lessons: null,
}

export function lessons(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        case lessonsConstants.SET_LESSON_EDITOR:
            return {
                ...state,
                lesson_editor_action: action.lesson_editor_action,
                lesson_editor_kk_lesson_id: action.lesson_editor_kk_lesson_id,
            }

        // ADD_LESSONS
        case lessonsConstants.ADD_LESSONS_REQUEST:
            return {
                ...state,
                add_lessons_loading: true,
                add_lessons_message: null,
                add_lessons_errors: null,
                add_lessons_error_message: null,
                add_lessons: null,
            };
        case lessonsConstants.ADD_LESSONS_SUCCESS:
            return {
                ...state,
                add_lessons_loading: false,
                add_lessons_message: action.res.message,
                add_lessons_errors: null,
                add_lessons_error_message: null,
                add_lessons: null,
            };
        case lessonsConstants.ADD_LESSONS_FAILURE:
            return {
                ...state,
                add_lessons_loading: false,
                add_lessons_message: null,
                add_lessons_errors: action.error.data,
                add_lessons_error_message: action.error.message,
                add_lessons: null,
            };

        // EDIT_LESSONS
        case lessonsConstants.EDIT_LESSONS_REQUEST:
            return {
                ...state,
                edit_lessons_loading: true,
                edit_lessons_message: null,
                edit_lessons_errors: null,
                edit_lessons_error_message: null,
                edit_lessons: null,
            };
        case lessonsConstants.EDIT_LESSONS_SUCCESS:
            return {
                ...state,
                edit_lessons_loading: false,
                edit_lessons_message: action.res.message,
                edit_lessons_errors: null,
                edit_lessons_error_message: null,
                edit_lessons: null,

                get_one_by_course_id_lessons: action.res.course,
            };
        case lessonsConstants.EDIT_LESSONS_FAILURE:
            return {
                ...state,
                edit_lessons_loading: false,
                edit_lessons_message: null,
                edit_lessons_errors: action.error.data,
                edit_lessons_error_message: action.error.message,
                edit_lessons: null,
            };

        // EDIT_PUBLISHED_LESSONS
        case lessonsConstants.EDIT_PUBLISHED_LESSONS_REQUEST:
            return {
                ...state,
                edit_published_lessons_loading: true,
                edit_published_lessons_message: null,
                edit_published_lessons_errors: null,
                edit_published_lessons_error_message: null,
                edit_published_lessons: null,
            };
        case lessonsConstants.EDIT_PUBLISHED_LESSONS_SUCCESS:
            return {
                ...state,
                edit_published_lessons_loading: false,
                edit_published_lessons_message: action.res.message,
                edit_published_lessons_errors: null,
                edit_published_lessons_error_message: null,
                edit_published_lessons: null,

                get_one_by_course_id_lessons: action.res.course,
            };
        case lessonsConstants.EDIT_PUBLISHED_LESSONS_FAILURE:
            return {
                ...state,
                edit_published_lessons_loading: false,
                edit_published_lessons_message: null,
                edit_published_lessons_errors: action.error.data,
                edit_published_lessons_error_message: action.error.message,
                edit_published_lessons: null,
            };

        // REMOVE_LESSONS
        case lessonsConstants.REMOVE_LESSONS_REQUEST:
            return {
                ...state,
                remove_lessons_loading: true,
                remove_lessons_message: null,
                remove_lessons_error: null,
                remove_lessons: null,
            };
        case lessonsConstants.REMOVE_LESSONS_SUCCESS:
            return {
                ...state,
                remove_lessons_loading: false,
                remove_lessons_message: action.res.message,
                remove_lessons_error: null,
                remove_lessons: null,
            };
        case lessonsConstants.REMOVE_LESSONS_FAILURE:
            return {
                ...state,
                remove_lessons_loading: false,
                remove_lessons_message: null,
                remove_lessons_error: action.error,
                remove_lessons: null,
            };

        // GET_ALL_LESSONS_CATEGORIES
        // case lessonsConstants.GET_ALL_LESSONS_REQUEST:
        //     return {
        //         ...state,
        //         get_all_lessons_loading: true,
        //         get_all_lessons_message: null,
        //         get_all_lessons_error: null,
        //         get_all_lessons: null,
        //     };
        // case lessonsConstants.GET_ALL_LESSONS_SUCCESS:
        //     return {
        //         ...state,
        //         get_all_lessons_loading: false,
        //         get_all_lessons_message: action.res.message,
        //         get_all_lessons_error: null,
        //         get_all_lessons: action.res.lessons,
        //     };
        // case lessonsConstants.GET_ALL_LESSONS_FAILURE:
        //     return {
        //         ...state,
        //         get_all_lessons_loading: false,
        //         get_all_lessons_message: null,
        //         get_all_lessons_error: null,
        //         get_all_lessons: action.error,
        //     };

        // GET_ALL_BY_COURSE_ID_LESSONS
        case lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_REQUEST:
            return {
                ...state,
                get_all_by_course_id_lessons_loading: true,
                get_all_by_course_id_lessons_message: null,
                get_all_by_course_id_lessons_error: null,
                get_all_by_course_id_lessons: null,
            };
        case lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_SUCCESS:
            return {
                ...state,
                get_all_by_course_id_lessons_loading: false,
                get_all_by_course_id_lessons_message: action.res.message,
                get_all_by_course_id_lessons_error: null,
                get_all_by_course_id_lessons: action.res.lessons,
            };
        case lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_FAILURE:
            return {
                ...state,
                get_all_by_course_id_lessons_loading: true,
                get_all_by_course_id_lessons_message: null,
                get_all_by_course_id_lessons_error: null,
                get_all_by_course_id_lessons: action.error,
            };

        // GET_ONE_BY_LESSON_ID_LESSONS
        case lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_REQUEST:
            return {
                ...state,
                get_one_by_lesson_id_lessons_loading: true,
                get_one_by_lesson_id_lessons_message: null,
                get_one_by_lesson_id_lessons_error: null,
                get_one_by_lesson_id_lessons: null,
            };
        case lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_SUCCESS:
            return {
                ...state,
                get_one_by_lesson_id_lessons_loading: false,
                get_one_by_lesson_id_lessons_message: action.res.message,
                get_one_by_lesson_id_lessons_error: null,
                get_one_by_lesson_id_lessons: action.res.lesson,
            };
        case lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_FAILURE:
            return {
                ...state,
                get_one_by_lesson_id_lessons_loading: true,
                get_one_by_lesson_id_lessons_message: null,
                get_one_by_lesson_id_lessons_error: null,
                get_one_by_lesson_id_lessons: action.error,
            };

        default:
            return state
    }
}