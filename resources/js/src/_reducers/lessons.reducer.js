import { lessonsConstants, lessonsUsersProgressConstants, pagesConstants } from '../_constants';

const initialState = {
    // get_all_lessons_loading: false,
    // get_all_lessons_message: null,
    // get_all_lessons_error: null,
    // get_all_lessons: null,

    // get_all_by_category_id_lessons_loading: false,
    // get_all_by_category_id_lessons_message: null,
    // get_all_by_category_id_lessons_error: null,
    // get_all_by_category_id_lessons: null,

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
        case lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                get_one_by_lesson_id_lessons: {
                    ...state.get_one_by_lesson_id_lessons,
                    questions: action.res.questions
                }
            }
            
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

        // // GET_ALL_BY_CATEGORY_ID_LESSONS_CATEGORIES
        // case lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_REQUEST:
        //     return {
        //         ...state,
        //         get_all_by_category_id_lessons_loading: true,
        //         get_all_by_category_id_lessons_message: null,
        //         get_all_by_category_id_lessons_error: null,
        //         get_all_by_category_id_lessons: null,
        //     };
        // case lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_SUCCESS:
        //     return {
        //         ...state,
        //         get_all_by_category_id_lessons_loading: false,
        //         get_all_by_category_id_lessons_message: action.res.message,
        //         get_all_by_category_id_lessons_error: null,
        //         get_all_by_category_id_lessons: action.res.lessons,
        //     };
        // case lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_FAILURE:

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
                get_one_by_lesson_id_lessons_loading: false,
                get_one_by_lesson_id_lessons_message: null,
                get_one_by_lesson_id_lessons_error: action.error,
                get_one_by_lesson_id_lessons: null,
            };

        default:
            return state
    }
}