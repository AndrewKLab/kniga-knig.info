import { lessonsUsersProgressConstants, pagesConstants } from '../_constants';

const initialState = {
    auth_user_inprocess_lessons: null,
    auth_user_finished_lessons: null,

    add_lessons_users_progress_loading: false,
    add_lessons_users_progress_message: null,
    add_lessons_users_progress_error: null,
    add_lessons_users_progress: null,

    edit_lessons_users_progress_loading: false,
    edit_lessons_users_progress_message: null,
    edit_lessons_users_progress_errors: null,
    edit_lessons_users_progress_error_message: null,
    edit_lessons_users_progress: null,

    remove_lessons_users_progress_loading: false,
    remove_lessons_users_progress_message: null,
    remove_lessons_users_progress_error: null,
    remove_lessons_users_progress: null,

    get_all_by_cup_id_lessons_users_progress_loading: false,
    get_all_by_cup_id_lessons_users_progress_message: null,
    get_all_by_cup_id_lessons_users_progress_error: null,
    get_all_by_cup_id_lessons_users_progress: null,

    get_one_by_lesson_id_lessons_users_progress_loading: false,
    get_one_by_lesson_id_lessons_users_progress_message: null,
    get_one_by_lesson_id_lessons_users_progress_error: null,
    get_one_by_lesson_id_lessons_users_progress: null,
}

const sortByStatus = (state, lessons) => {
    if (lessons && lessons.length > 0) {
        let auic = [];
        let aufc = [];
        lessons.forEach(course => {
            switch (course.kk_cup_status) {
                case 'inprocess':
                    auic.push(course);
                    break;
                case 'finished':
                    aufc.push(course);
                    break;
                default:
                    break;
            }
        });
        return { auic, aufc };
    }
}


export function lessons_users_progress(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        // ADD_LESSONS_USERS_PROGRESS
        case lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                add_lessons_users_progress_loading: true,
                add_lessons_users_progress_message: null,
                add_lessons_users_progress_error: null,
                add_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                add_lessons_users_progress_loading: false,
                add_lessons_users_progress_message: action.res.message,
                add_lessons_users_progress_error: null,
                add_lessons_users_progress: null,

                get_one_by_lesson_id_lessons_users_progress: action.res.lesson,
            };
        case lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                add_lessons_users_progress_loading: false,
                add_lessons_users_progress_message: null,
                add_lessons_users_progress_error: action.error.message,
                add_lessons_users_progress: null,
            };

        // EDIT_LESSONS_USERS_PROGRESS
        case lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                edit_lessons_users_progress_loading: true,
                edit_lessons_users_progress_message: null,
                edit_lessons_users_progress_errors: null,
                edit_lessons_users_progress_error_message: null,
                edit_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                edit_lessons_users_progress_loading: false,
                edit_lessons_users_progress_message: action.res.message,
                edit_lessons_users_progress_errors: null,
                edit_lessons_users_progress_error_message: null,
                edit_lessons_users_progress: null,

                get_one_by_lesson_id_lessons_users_progress: action.res.lesson,
            };
        case lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                edit_lessons_users_progress_loading: false,
                edit_lessons_users_progress_message: null,
                edit_lessons_users_progress_error_message: action.error.message,
                edit_lessons_users_progress_errors: action.error.data,
                edit_lessons_users_progress: null,
            };
        // REMOVE_LESSONS_USERS_PROGRESS
        case lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                remove_lessons_users_progress_loading: true,
                remove_lessons_users_progress_message: null,
                remove_lessons_users_progress_error: null,
                remove_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                remove_lessons_users_progress_loading: false,
                remove_lessons_users_progress_message: action.res.message,
                remove_lessons_users_progress_error: null,
                remove_lessons_users_progress: null,

                get_one_by_lesson_id_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                remove_lessons_users_progress_loading: false,
                remove_lessons_users_progress_message: null,
                remove_lessons_users_progress_error: action.error.message,
                remove_lessons_users_progress: null,
            };

        // GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS
        case lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                get_all_by_cup_id_lessons_users_progress_loading: true,
                get_all_by_cup_id_lessons_users_progress_message: null,
                get_all_by_cup_id_lessons_users_progress_error: null,
                get_all_by_cup_id_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                get_all_by_cup_id_lessons_users_progress_loading: false,
                get_all_by_cup_id_lessons_users_progress_message: action.res.message,
                get_all_by_cup_id_lessons_users_progress_error: null,
                get_all_by_cup_id_lessons_users_progress: action.res.lessons,

            };
        case lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                get_all_by_cup_id_lessons_users_progress_loading: false,
                get_all_by_cup_id_lessons_users_progress_message: null,
                get_all_by_cup_id_lessons_users_progress_error: action.error.message,
                get_all_by_cup_id_lessons_users_progress: null,
            };

        //GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS
        case lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                get_one_by_lesson_id_lessons_users_progress_loading: true,
                get_one_by_lesson_id_lessons_users_progress_message: null,
                get_one_by_lesson_id_lessons_users_progress_error: null,
                get_one_by_lesson_id_lessons_users_progress: null,
            };
        case lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                get_one_by_lesson_id_lessons_users_progress_loading: false,
                get_one_by_lesson_id_lessons_users_progress_message: action.res.message,
                get_one_by_lesson_id_lessons_users_progress_error: null,
                get_one_by_lesson_id_lessons_users_progress: action.res.lesson,
            };
        case lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                get_one_by_lesson_id_lessons_users_progress_loading: false,
                get_one_by_lesson_id_lessons_users_progress_message: null,
                get_one_by_lesson_id_lessons_users_progress_error: action.error.message,
                get_one_by_lesson_id_lessons_users_progress: null,
            };

        default:
            return state
    }
}