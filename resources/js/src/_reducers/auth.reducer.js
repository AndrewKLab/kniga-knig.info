import { authConstants } from '../_constants';

const initialState = {
    user: null,
    token: null,

    registration_loading: false,
    registration_message: null,
    registration_errors: null,
    registration_error_message: null,

    login_loading: false,
    login_message: null,
    login_errors: null,
    login_error_message: null,

    logout_loading: false,
    logout_message: null,
    logout_error: null,

    forgot_password_loading: false,
    forgot_password_message: null,
    forgot_password_errors: null,
    forgot_password_error_message: null,

    verify_pin_password_loading: false,
    verify_pin_password_message: null,
    verify_pin_password_errors: null,
    verify_pin_password_error_message: null,

    reset_password_loading: false,
    reset_password_message: null,
    reset_password_errors: null,
    reset_password_error_message: null,

    edit_auth_user_loading: false,
    edit_auth_user_message: null,
    edit_auth_user_errors: null,
    edit_auth_user_error_message: null,

    edit_avatar_auth_user_loading: false,
    edit_avatar_auth_user_message: null,
    edit_avatar_auth_user_errors: null,
    edit_avatar_auth_user_error_message: null,

    get_auth_user_loading: false,
    get_auth_user_message: null,
    get_auth_user_error: null,
}

export function auth(state = initialState, action) {
    switch (action.type) {
        // REGISTRATION
        case authConstants.REGISTRATION_REQUEST:
            return {
                ...state,
                registration_loading: true,
                registration_message: null,
                registration_errors: null,
                registration_error_message: null,
            };
        case authConstants.REGISTRATION_SUCCESS:
            return {
                ...state,
                registration_loading: false,
                registration_message: action.res.message,
                registration_errors: null,
                registration_error_message: null,

                // user: action.res.user,
                // token: action.res.token,
            };
        case authConstants.REGISTRATION_FAILURE:
            return {
                ...state,
                registration_loading: false,
                registration_message: null,
                registration_errors: action.error.data,
                registration_error_message: action.error.message,
            };

        // LOGIN
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                login_loading: true,
                login_message: null,
                login_errors: null,
                login_error_messge: null,

                user: null,
                token: null,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                login_loading: false,
                login_message: action.res.message,
                login_errors: null,
                login_error_messge: null,

                user: action.res.user,
                token: action.res.token,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                login_loading: false,
                login_message: null,
                login_errors: action.error.data,
                login_error_messge: action.error.message,
            };

        // LOGOUT
        case authConstants.LOGOUT_REQUEST:
            return {
                ...state,
                logout_loading: true,
                logout_message: null,
                logout_error: null,
            };
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                logout_loading: false,
                logout_message: action.res.message,
                logout_error: null,

                user: null,
                token: null,
            };
        case authConstants.LOGOUT_FAILURE:
            return {
                ...state,
                logout_loading: false,
                logout_message: null,
                logout_error: action.error.message,
            };

        // FORGOT_PASSWORD
        case authConstants.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgot_password_loading: true,
                forgot_password_message: null,
                forgot_password_errors: null,
                forgot_password_error_message: null,
            };
        case authConstants.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgot_password_loading: false,
                forgot_password_message: action.res.message,
                forgot_password_errors: null,
                forgot_password_error_message: null,

            };
        case authConstants.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                forgot_password_loading: false,
                forgot_password_message: null,
                forgot_password_errors: action.error.data,
                forgot_password_error_message: action.error.message,
            };

        // VERIFY_PIN_PASSWORD
        case authConstants.VERIFY_PIN_PASSWORD_REQUEST:
            return {
                ...state,
                verify_pin_password_loading: true,
                verify_pin_password_message: null,
                verify_pin_password_errors: null,
                verify_pin_password_error_message: null,
            };
        case authConstants.VERIFY_PIN_PASSWORD_SUCCESS:
            return {
                ...state,
                verify_pin_password_loading: false,
                verify_pin_password_message: action.res.message,
                verify_pin_password_errors: null,
                verify_pin_password_error_message: null,

            };
        case authConstants.VERIFY_PIN_PASSWORD_FAILURE:
            return {
                ...state,
                verify_pin_password_loading: false,
                verify_pin_password_message: null,
                verify_pin_password_errors: action.error.data,
                verify_pin_password_error_message: action.error.message,
            };

        // RESET_PASSWORD
        case authConstants.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                reset_password_loading: true,
                reset_password_message: null,
                reset_password_errors: null,
                reset_password_error_message: null,
            };
        case authConstants.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                reset_password_loading: false,
                reset_password_message: action.res.message,
                reset_password_errors: null,
                reset_password_error_message: null,

            };
        case authConstants.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                reset_password_loading: false,
                reset_password_message: null,
                reset_password_errors: action.error.data,
                reset_password_error_message: action.error.message,
            };

        // EDIT_AVATAR_AUTH_USER
        case authConstants.EDIT_AVATAR_AUTH_USER_REQUEST:
            return {
                ...state,
                edit_avatar_auth_user_loading: true,
                edit_avatar_auth_user_message: null,
                edit_avatar_auth_user_errors: null,
                edit_avatar_auth_user_error_message: null,
            };
        case authConstants.EDIT_AVATAR_AUTH_USER_SUCCESS:
            return {
                ...state,
                edit_avatar_auth_user_loading: false,
                edit_avatar_auth_user_message: action.res.message,
                edit_avatar_auth_user_errors: null,
                edit_avatar_auth_user_error_message: null,

                user: action.res.user,
            };
        case authConstants.EDIT_AVATAR_AUTH_USER_FAILURE:
            return {
                ...state,
                edit_avatar_auth_user_loading: false,
                edit_avatar_auth_user_message: null,
                edit_avatar_auth_user_errors: action.error.data,
                edit_avatar_auth_user_error_message: action.error.message,
            };

        // GET_AUTH_USER
        case authConstants.GET_AUTH_USER_REQUEST:
            return {
                ...state,
                get_auth_user_loading: true,
                get_auth_user_message: null,
                get_auth_user_error: null,

                user: null,
                token: null,
            };
        case authConstants.GET_AUTH_USER_SUCCESS:
            return {
                ...state,
                get_auth_user_loading: false,
                get_auth_user_message: action.res.message,
                get_auth_user_error: null,

                user: action.res.user,
                token: action.res.token,
            };
        case authConstants.GET_AUTH_USER_FAILURE:
            return {
                ...state,
                get_auth_user_loading: false,
                get_auth_user_message: null,
                get_auth_user_error: action.error.message,

                user: null,
                token: null,
            };

        default:
            return state
    }
}