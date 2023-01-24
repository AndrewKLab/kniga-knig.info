import { notificationsConstants } from "../../public/_constants";

const initialState = {
    get_all_notifications_loading: false,
    get_all_notifications_message: null,
    get_all_notifications_error: null,

    mark_as_read_one_by_id_notifications_loading: false,
    mark_as_read_one_by_id_notifications_message: null,
    mark_as_read_one_by_id_notifications_error: null,

    mark_as_read_all_notifications_loading: false,
    mark_as_read_all_notifications_message: null,
    mark_as_read_all_notifications_error: null,

    notifications: [],
    unread_notifications_count: null,
}

export function notifications(state = initialState, action) {
    switch (action.type) {
        case notificationsConstants.PUSH_NOTIFICATION:
            return {
                ...state,
                notifications: [action.res.notification, ...state.notifications],
                unread_notifications_count: action.res.unread_notifications_count,
            };

        case notificationsConstants.GET_ALL_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                get_all_notifications_loading: true,
                get_all_notifications_message: null,
                get_all_notifications_error: null,
                notifications: [],
            };
        case notificationsConstants.GET_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                get_all_notifications_loading: false,
                get_all_notifications_message: action.res.message,
                get_all_notifications_error: null,
                notifications: action.res.notifications,
                unread_notifications_count: action.res.unread_notifications_count,
            };
        case notificationsConstants.GET_ALL_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                get_all_notifications_loading: false,
                get_all_notifications_message: null,
                get_all_notifications_error: action.error.message,
                notifications: [],
            };

        case notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                mark_as_read_one_by_id_notifications_loading: true,
                mark_as_read_one_by_id_notifications_message: null,
                mark_as_read_one_by_id_notifications_error: null,
                // notifications: [],
            };
        case notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                mark_as_read_one_by_id_notifications_loading: false,
                mark_as_read_one_by_id_notifications_message: action.res.message,
                mark_as_read_one_by_id_notifications_error: null,
                notifications: action.res.notifications,
                unread_notifications_count: action.res.unread_notifications_count,
            };
        case notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                mark_as_read_one_by_id_notifications_loading: false,
                mark_as_read_one_by_id_notifications_message: null,
                mark_as_read_one_by_id_notifications_error: action.error.message,
                // notifications: [],
            };

        case notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                mark_as_read_all_notifications_loading: true,
                mark_as_read_all_notifications_message: null,
                mark_as_read_all_notifications_error: null,
                // notifications: [],
            };
        case notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                mark_as_read_all_notifications_loading: false,
                mark_as_read_all_notifications_message: action.res.message,
                mark_as_read_all_notifications_error: null,
                notifications: action.res.notifications,
                unread_notifications_count: action.res.unread_notifications_count,
            };
        case notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                mark_as_read_all_notifications_loading: false,
                mark_as_read_all_notifications_message: null,
                mark_as_read_all_notifications_error: action.error.message,
                // notifications: [],
            };
        default:
            return state
    }
}