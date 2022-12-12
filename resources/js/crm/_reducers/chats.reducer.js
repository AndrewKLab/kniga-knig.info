import { chatsConstants, pagesConstants } from '../_constants';

const initialState = {
    get_all_by_user_chats_loading: false,
    get_all_by_user_chats_message: null,
    get_all_by_user_chats_error: null,
    get_all_by_user_chats: null,

    get_one_by_id_chats_loading: false,
    get_one_by_id_chats_message: null,
    get_one_by_id_chats_error: null,
    get_one_by_id_chats: null,

    send_message_chats_loading: false,
    send_message_chats_message: null,
    send_message_chats_error: null,
    send_message_chats: null,

}

export function chats(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState

        // GET_ALL_BY_USER_CHATS
        case chatsConstants.GET_ALL_BY_USER_CHATS_REQUEST:
            return {
                ...state,
                get_all_by_user_chats_loading: true,
                get_all_by_user_chats_message: null,
                get_all_by_user_chats_error: null,
                get_all_by_user_chats: null,
            };
        case chatsConstants.GET_ALL_BY_USER_CHATS_SUCCESS:
            return {
                ...state,
                get_all_by_user_chats_loading: false,
                get_all_by_user_chats_message: action.res.message,
                get_all_by_user_chats_error: null,
                get_all_by_user_chats: action.res.chats,
            };
        case chatsConstants.GET_ALL_BY_USER_CHATS_FAILURE:
            return {
                ...state,
                get_all_by_user_chats_loading: true,
                get_all_by_user_chats_message: null,
                get_all_by_user_chats_error: action.error,
                get_all_by_user_chats: null,
            };

        // GET_ONE_BY_ID_CHATS
        case chatsConstants.GET_ONE_BY_ID_CHATS_REQUEST:
            return {
                ...state,
                get_one_by_id_chats_loading: true,
                get_one_by_id_chats_message: null,
                get_one_by_id_chats_error: null,
                get_one_by_id_chats: null,
            };
        case chatsConstants.GET_ONE_BY_ID_CHATS_SUCCESS:
            return {
                ...state,
                get_one_by_id_chats_loading: false,
                get_one_by_id_chats_message: action.res.message,
                get_one_by_id_chats_error: null,
                get_one_by_id_chats: action.res.chat,
            };
        case chatsConstants.GET_ONE_BY_ID_CHATS_FAILURE:
            return {
                ...state,
                get_one_by_id_chats_loading: true,
                get_one_by_id_chats_message: null,
                get_one_by_id_chats_error: action.error,
                get_one_by_id_chats: null,
            };

        // SEND_MESSAGE_CHATS
        case chatsConstants.SEND_MESSAGE_CHATS_REQUEST:
            return {
                ...state,
                send_message_chats_loading: true,
                send_message_chats_message: null,
                send_message_chats_error: null,
                send_message_chats: null,
            };
        case chatsConstants.SEND_MESSAGE_CHATS_SUCCESS:
            return {
                ...state,
                send_message_chats_loading: false,
                send_message_chats_message: action.res.res_message,
                send_message_chats_error: null,
                send_message_chats: action.res.message,
                
                get_one_by_id_chats: state.get_one_by_id_chats && state.get_one_by_id_chats.messages ? {...state.get_one_by_id_chats, messages: [...state.get_one_by_id_chats.messages, action.res.message]}  : state.get_one_by_id_chats,
            };
        case chatsConstants.SEND_MESSAGE_CHATS_FAILURE:
            return {
                ...state,
                send_message_chats_loading: true,
                send_message_chats_message: null,
                send_message_chats_error: action.error,
                send_message_chats: null,
            };

        default:
            return state
    }
}