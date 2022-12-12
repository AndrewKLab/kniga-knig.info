import { coursesUsersProgressConstants, pagesConstants } from '../_constants';

const initialState = {
    auth_user_inprocess_courses: null,
    auth_user_finished_courses: null,

    add_courses_users_progress_loading: false,
    add_courses_users_progress_message: null,
    add_courses_users_progress_error: null,
    add_courses_users_progress: null,

    edit_courses_users_progress_loading: false,
    edit_courses_users_progress_message: null,
    edit_courses_users_progress_error: null,
    edit_courses_users_progress: null,

    remove_courses_users_progress_loading: false,
    remove_courses_users_progress_message: null,
    remove_courses_users_progress_error: null,
    remove_courses_users_progress: null,

    get_all_courses_users_progress_loading: false,
    get_all_courses_users_progress_message: null,
    get_all_courses_users_progress_error: null,
    get_all_courses_users_progress: null,

    get_one_by_course_id_courses_users_progress_loading: false,
    get_one_by_course_id_courses_users_progress_message: null,
    get_one_by_course_id_courses_users_progress_error: null,
    get_one_by_course_id_courses_users_progress: null,
}

const sortByStatus = (state, courses) => {
    if (courses && courses.length > 0) {
        let auic = [];
        let aufc = [];
        courses.forEach(course => {
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


export function courses_users_progress(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState

        // ADD_COURSES_USERS_PROGRESS
        case coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                add_courses_users_progress_loading: true,
                add_courses_users_progress_message: null,
                add_courses_users_progress_error: null,
                add_courses_users_progress: null,
            };
        case coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                add_courses_users_progress_loading: false,
                add_courses_users_progress_message: action.res.message,
                add_courses_users_progress_error: null,
                add_courses_users_progress: null,

                get_one_by_course_id_courses_users_progress: action.res.course,
            };
        case coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                add_courses_users_progress_loading: false,
                add_courses_users_progress_message: null,
                add_courses_users_progress_error: action.error.message,
                add_courses_users_progress: null,
            };

        // EDIT_COURSES_USERS_PROGRESS
        case coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                edit_courses_users_progress_loading: true,
                edit_courses_users_progress_message: null,
                edit_courses_users_progress_error: null,
                edit_courses_users_progress: null,

            };
        case coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                edit_courses_users_progress_loading: false,
                edit_courses_users_progress_message: action.res.message,
                edit_courses_users_progress_error: null,
                edit_courses_users_progress: null,

                get_one_by_course_id_courses_users_progress: action.res.course,
            };
        case coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                edit_courses_users_progress_loading: false,
                edit_courses_users_progress_message: null,
                edit_courses_users_progress_error: action.error.message,
                edit_courses_users_progress: null,
            };

        // REMOVE_COURSES_USERS_PROGRESS
        case coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                remove_courses_users_progress_loading: true,
                remove_courses_users_progress_message: null,
                remove_courses_users_progress_error: null,
                remove_courses_users_progress: null,
            };
        case coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                remove_courses_users_progress_loading: false,
                remove_courses_users_progress_message: action.res.message,
                remove_courses_users_progress_error: null,
                remove_courses_users_progress: null,

                get_one_by_course_id_courses_users_progress: null,
            };
        case coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                remove_courses_users_progress_loading: false,
                remove_courses_users_progress_message: null,
                remove_courses_users_progress_error: action.error.message,
                remove_courses_users_progress: null,
            };

        // GET_ALL_COURSES_USERS_PROGRESS
        case coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                get_all_courses_users_progress_loading: true,
                get_all_courses_users_progress_message: null,
                get_all_courses_users_progress_error: null,
                get_all_courses_users_progress: null,
            };
        case coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_SUCCESS:
            const { auic, aufc } = sortByStatus(state, action.res.courses);
            return {
                ...state,
                get_all_courses_users_progress_loading: false,
                get_all_courses_users_progress_message: action.res.message,
                get_all_courses_users_progress_error: null,
                get_all_courses_users_progress: action.res.courses,

                auth_user_inprocess_courses: auic,
                auth_user_finished_courses: aufc,
            };
        case coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                get_all_courses_users_progress_loading: false,
                get_all_courses_users_progress_message: null,
                get_all_courses_users_progress_error: action.error.message,
                get_all_courses_users_progress: null,
            };

        //GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS
        case coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_REQUEST:
            return {
                ...state,
                get_one_by_course_id_courses_users_progress_loading: true,
                get_one_by_course_id_courses_users_progress_message: null,
                get_one_by_course_id_courses_users_progress_error: null,
                get_one_by_course_id_courses_users_progress: null,
            };
        case coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                get_one_by_course_id_courses_users_progress_loading: false,
                get_one_by_course_id_courses_users_progress_message: action.res.message,
                get_one_by_course_id_courses_users_progress_error: null,
                get_one_by_course_id_courses_users_progress: action.res.course,
            };
        case coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_FAILURE:
            return {
                ...state,
                get_one_by_course_id_courses_users_progress_loading: false,
                get_one_by_course_id_courses_users_progress_message: null,
                get_one_by_course_id_courses_users_progress_error: action.error,
                get_one_by_course_id_courses_users_progress: null,
            };

        default:
            return state
    }
}