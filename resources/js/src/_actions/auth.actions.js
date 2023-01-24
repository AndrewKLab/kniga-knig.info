import { notificationsActions } from '../../public/_actions';
import { unsubscribeFromChannel } from '../../public/_helpers';
import { authConstants } from '../_constants';
import { authService } from '../_services';

export const authActions = {
    registration,
    login,
    logout,
    forgotPassword,
    verifyPinPassword,
    resetPassword,
    editAuthUser,
    editAvatarAuthUser,
    getAuthUser
};

function registration(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return authService.registration(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate('/login')
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.REGISTRATION_REQUEST, params } }
    function success(res) { return { type: authConstants.REGISTRATION_SUCCESS, res } }
    function failure(error) { return { type: authConstants.REGISTRATION_FAILURE, error } }
}
function login(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return authService.login(params)
            .then(
                res => {
                    localStorage.setItem('token', res.token);
                    if (res.user) dispatch(notificationsActions.createNotificationPusherToChannel({
                        channel: `App.Models.KK_User.${res.user.kk_user_id}`,
                        options: {
                            withInit: true,
                            token: res.token,
                        }
                    }))

                    dispatch(success(res))
                    navigate('/')
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.LOGIN_REQUEST, params } }
    function success(res) { return { type: authConstants.LOGIN_SUCCESS, res } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}
function logout(params) {
    return dispatch => {
        dispatch(request(params));
        return authService.logout(params)
            .then(
                res => {
                    localStorage.removeItem('token');
                    if (res.user) unsubscribeFromChannel(`App.Models.KK_User.${res.user.kk_user_id}`)
                    dispatch(success(res))
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.LOGOUT_REQUEST, params } }
    function success(res) { return { type: authConstants.LOGOUT_SUCCESS, res } }
    function failure(error) { return { type: authConstants.LOGOUT_FAILURE, error } }
}
function forgotPassword(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return authService.forgotPassword(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate(`/password/verify/pin?kk_user_email=${params.kk_user_email}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.FORGOT_PASSWORD_REQUEST, params } }
    function success(res) { return { type: authConstants.FORGOT_PASSWORD_SUCCESS, res } }
    function failure(error) { return { type: authConstants.FORGOT_PASSWORD_FAILURE, error } }
}
function verifyPinPassword(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return authService.verifyPinPassword(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate(`/password/reset?kk_user_email=${params.kk_user_email}&token=${params.token}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.VERIFY_PIN_PASSWORD_REQUEST, params } }
    function success(res) { return { type: authConstants.VERIFY_PIN_PASSWORD_SUCCESS, res } }
    function failure(error) { return { type: authConstants.VERIFY_PIN_PASSWORD_FAILURE, error } }
}

function resetPassword(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return authService.resetPassword(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate(`/login`)
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.RESET_PASSWORD_REQUEST, params } }
    function success(res) { return { type: authConstants.RESET_PASSWORD_SUCCESS, res } }
    function failure(error) { return { type: authConstants.RESET_PASSWORD_FAILURE, error } }
}

function editAuthUser(params) {
    return dispatch => {
        dispatch(request(params));
        return authService.editAuthUser(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.EDIT_AUTH_USER_REQUEST, params } }
    function success(res) { return { type: authConstants.EDIT_AUTH_USER_SUCCESS, res } }
    function failure(error) { return { type: authConstants.EDIT_AUTH_USER_FAILURE, error } }
}
function editAvatarAuthUser(params) {
    return dispatch => {
        dispatch(request(params));
        return authService.editAvatarAuthUser(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.EDIT_AVATAR_AUTH_USER_REQUEST, params } }
    function success(res) { return { type: authConstants.EDIT_AVATAR_AUTH_USER_SUCCESS, res } }
    function failure(error) { return { type: authConstants.EDIT_AVATAR_AUTH_USER_FAILURE, error } }
}
function getAuthUser(params) {
    return dispatch => {
        dispatch(request(params));
        return authService.getAuthUser(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: authConstants.GET_AUTH_USER_REQUEST, params } }
    function success(res) { return { type: authConstants.GET_AUTH_USER_SUCCESS, res } }
    function failure(error) { return { type: authConstants.GET_AUTH_USER_FAILURE, error } }
}