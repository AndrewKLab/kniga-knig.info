import { settingsConstants, statisticConstants } from '../_constants';
const initialState = {
    users_statistic_loading: false,
    users_statistic_message: null,
    users_statistic_count: 0,
    users_statistic_period_count: 0,
    users_statistic_data: [],
    users_statistic_error: null,

    courses_users_progress_statistic_loading: false,
    courses_users_progress_statistic_message: null,
    courses_users_progress_statistic_count: 0,
    courses_users_progress_statistic_period_count: 0,
    courses_users_progress_statistic_data: [],
    courses_users_progress_statistic_error: null,

    get_statistic_by_course_loading: false,
    get_statistic_by_course_message: null,
    get_statistic_by_course: null,
    get_statistic_by_course_error: null,
}

export function statistic(state = initialState, action) {
    switch (action.type) {
        case statisticConstants.USERS_STATISTIC_REQUEST:
            return {
                ...state,
                users_statistic_loading: true,
                users_statistic_message: null,
                users_statistic_count: 0,
                users_statistic_period_count: 0,
                users_statistic_data: [],
                users_statistic_error: null,
            };
        case statisticConstants.USERS_STATISTIC_SUCCESS:
            return {
                ...state,
                users_statistic_loading: false,
                users_statistic_message: action.res.message,
                users_statistic_count: action.res.count,
                users_statistic_period_count: action.res.period_count,
                users_statistic_data: action.res.data,
                users_statistic_error: null,
            };
        case statisticConstants.USERS_STATISTIC_FAILURE:
            return {
                ...state,
                users_statistic_loading: false,
                users_statistic_message: null,
                users_statistic_count: 0,
                users_statistic_period_count: 0,
                users_statistic_data: [],
                users_statistic_error: action.error.message,
            };

        case statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_REQUEST:
            return {
                ...state,
                courses_users_progress_statistic_loading: true,
                courses_users_progress_statistic_message: null,
                courses_users_progress_statistic_count: 0,
                courses_users_progress_statistic_period_count: 0,
                courses_users_progress_statistic_data: [],
                courses_users_progress_statistic_error: null,
            };
        case statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_SUCCESS:
            return {
                ...state,
                courses_users_progress_statistic_loading: false,
                courses_users_progress_statistic_message: action.res.message,
                courses_users_progress_statistic_count: action.res.count,
                courses_users_progress_statistic_period_count: action.res.period_count,
                courses_users_progress_statistic_data: action.res.data,
                courses_users_progress_statistic_error: null,
            };
        case statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_FAILURE:
            return {
                ...state,
                courses_users_progress_statistic_loading: false,
                courses_users_progress_statistic_message: null,
                courses_users_progress_statistic_count: 0,
                courses_users_progress_statistic_period_count: 0,
                courses_users_progress_statistic_data: [],
                courses_users_progress_statistic_error: action.error.message,
            };

        case statisticConstants.GET_STATISTIC_BY_COURSE_REQUEST:
            return {
                ...state,
                get_statistic_by_course_loading: true,
                get_statistic_by_course_message: null,
                get_statistic_by_course: null,
                get_statistic_by_course_error: null,
            };
        case statisticConstants.GET_STATISTIC_BY_COURSE_SUCCESS:
            return {
                ...state,
                get_statistic_by_course_loading: false,
                get_statistic_by_course_message: action.res.message,
                get_statistic_by_course: action.res.course,
                get_statistic_by_course_error: null,
            };
        case statisticConstants.GET_STATISTIC_BY_COURSE_FAILURE:
            return {
                ...state,
                get_statistic_by_course_loading: false,
                get_statistic_by_course_message: null,
                get_statistic_by_course: null,
                get_statistic_by_course_error: action.error.message,
            };
        default:
            return state
    }
}