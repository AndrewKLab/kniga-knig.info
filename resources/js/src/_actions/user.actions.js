import { userConstants } from '../_constants';
import { userService } from '../_services';
// import { alertActions } from './';

export const userActions = {
    checkAuth,
    signin,
    signup,
    logout,
    createUser,
    updateSelf,
    updateUser,
    deleteUser,
    validateToken,
    readOne,
    readFullInfoByUser,
    readAll,
    getAllTeathers,
    getAllStudentsByUser,
    getAllStudentsByPromouter,
    getUserRoles,

    updateUserQuestionAnswer,

    selectUser,
    updateSelectedUser,
    cleanSelectedUser,
    contact,
    clearContact
};

function checkAuth(deviceInfo){
    const token = localStorage.getItem('user')
    var isLogined = token === null ? false : true
    return { type: userConstants.CHECK_AUTH, isLogined, token, deviceInfo: deviceInfo}
}

function signin(phonenumber, password, dvc_platform, dvc_client, dvc_signature, dvc_fbc_token, dvc_active) {

    return dispatch => {
        dispatch(request({ phonenumber }));
        userService.signin(phonenumber, password, dvc_platform, dvc_client, dvc_signature, dvc_fbc_token, dvc_active)
            .then(
                response => {
                    const user = {
                        jwt: response.jwt,
                        user: response.user
                    }

                    dispatch(success(user));
                    dispatch(validateToken(response.jwt));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SIGNIN_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNIN_FAILURE, error } }
}

function signup(firstname, lastname, phonenumber, country, sity, password, teather_id, promouter_id) {
    return dispatch => {
        dispatch(request());
        userService.signup(firstname, lastname, phonenumber, country, sity, password, teather_id !== undefined ? teather_id : 0, promouter_id !== undefined ? promouter_id : 0)
            .then(
                response => {
                    dispatch(success(response.message));
                    // history.push('/sign-in');
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.SIGNUP_REQUEST } }
    function success(message) { return { type: userConstants.SIGNUP_SUCCESS, message } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function logout(token, dvc_signature, dvc_fbc_token) {
    return dispatch => {
        //dispatch(request({ phonenumber }));
        return userService.logout(token, dvc_signature, dvc_fbc_token)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    console.log(error)
                }
            );
    };

   // function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success() { return { type: userConstants.LOGOUT }; }
   // function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}
    

function validateToken(jwt) {
    return dispatch => {
        dispatch(request({ jwt }));

        return userService.validateToken(jwt)
            .then(
                response => {
                    const user = {
                        jwt: jwt,
                        user: response.data
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.VALIDATE_TOKEN_REQUEST, user } }
    function success(user) { return { type: userConstants.VALIDATE_TOKEN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.VALIDATE_TOKEN_FAILURE, error } }
}

function createUser(jwt, close, resetForm, user) {
    return dispatch => {
        dispatch(request());
        return userService.createUser(jwt, user)
            .then(
                res => {
                    dispatch(success(res.message, res.user));
                    close()
                    resetForm()
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: userConstants.CREATE_USER_REQUEST }}
    function success(message, user) { return { type: userConstants.CREATE_USER_SUCCESS, message, user }}
    function failure(error) { return { type: userConstants.CREATE_USER_FAILURE, error }}
}

function updateSelf(jwt, user) {
    return dispatch => {
        dispatch(request());
        return userService.updateUser(jwt, user)
            .then(
                res => {
                    //localStorage.setItem("user", data.jwt);
                    dispatch(success(res.message, res.user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: userConstants.USER_UPDATE_REQUEST }}
    function success(message, user) { return { type: userConstants.USER_UPDATE_SUCCESS, message, user }}
    function failure(error) { return { type: userConstants.USER_UPDATE_FAILURE, error }}
}


function updateUser(jwt, user) {
    return dispatch => {
        dispatch(request());
        return userService.updateUser(jwt, user)
            .then(
                res => {
                    const userData = {...user, ...res.user}
                    dispatch(success(userData));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.USER_UPDATE_BY_ID_REQUEST } }
    function success(user) { return { type: userConstants.USER_UPDATE_BY_ID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_UPDATE_BY_ID_FAILURE, error } }
}

function deleteUser(jwt, user_id) {
    return dispatch => {
        dispatch(request({ jwt, user_id }));

        return userService.deleteUser(jwt, user_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USER_DELETE_REQUEST } }
    function success(data) { return { type: userConstants.USER_DELETE_SUCCESS, user_id, data } }
    function failure(error) { return { type: userConstants.USER_UPDATE_BY_ID_FAILURE, error } }
}

function readOne(user_id, jwt) {
    return dispatch => {
        dispatch(request());
        return userService.readOne(user_id, jwt)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETONE_USER_REQUEST } }
    function success(user) { return { type: userConstants.GETONE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETONE_USER_FAILURE, error } }
}

function readFullInfoByUser(user_id, jwt) {
    return dispatch => {
        dispatch(request());
        return userService.readFullInfoByUser(user_id, jwt)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.READ_FULL_INFO_BY_USER_REQUEST } }
    function success(user) { return { type: userConstants.READ_FULL_INFO_BY_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.READ_FULL_INFO_BY_USER_FAILURE, error } }
}

function readAll(jwt) {
    return dispatch => {
        dispatch(request());
        return userService.readAll(jwt)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_USERS_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_USERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_USERS_FAILURE, error } }
}

function getAllTeathers() {
    return dispatch => {
        dispatch(request());

        return userService.getAllTeathers()
            .then(
                teathers => dispatch(success(teathers)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_TEATHERS_REQUEST } }
    function success(teathers) { return { type: userConstants.GETALL_TEATHERS_SUCCESS, teathers } }
    function failure(error) { return { type: userConstants.GETALL_TEATHERS_FAILURE, error } }
}

function getAllStudentsByUser(teather_id) {
    return dispatch => {
        dispatch(request());

        return userService.getAllStudentsByUser(teather_id)
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_STUDENTS_REQUEST } }
    function success(students) { return { type: userConstants.GETALL_STUDENTS_SUCCESS, students } }
    function failure(error) { return { type: userConstants.GETALL_STUDENTS_FAILURE, error } }
}

function getAllStudentsByPromouter(promouter_id, jwt) {
    return dispatch => {
        dispatch(request());

        return userService.getAllStudentsByPromouter(promouter_id, jwt)
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_REQUEST } }
    function success(students) { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_SUCCESS, students } }
    function failure(error) { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_FAILURE, error } }
}

function getUserRoles(token) {
    return dispatch => {
        dispatch(request());

        return userService.getUserRoles(token)
            .then(
                roles => dispatch(success(roles)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GET_USER_ROLES_REQUEST } }
    function success(roles) { return { type: userConstants.GET_USER_ROLES_SUCCESS, roles } }
    function failure(error) { return { type: userConstants.GET_USER_ROLES_FAILURE, error } }
}

function updateUserQuestionAnswer(token, answer) { 
    return dispatch => {
        dispatch(request());

        return userService.updateUserQuestionAnswer(token, answer)
            .then(
                res => dispatch(success(res.message, res.user_question_answer)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.UPDATE_USER_QUESTION_ANSWER_REQUEST } }
    function success(message, answer) { return { type: userConstants.UPDATE_USER_QUESTION_ANSWER_SUCCESS, message, answer } }
    function failure(error) { return { type: userConstants.UPDATE_USER_QUESTION_ANSWER_FAILURE, error } }
}

function contact(data) { 
    return dispatch => {
        dispatch(request());
        return userService.contact(data)
            .then(
                res => dispatch(success(res.message)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.CONTACT_REQUEST } }
    function success(message) { return { type: userConstants.CONTACT_SUCCESS, message } }
    function failure(error) { return { type: userConstants.CONTACT_FAILURE, error } }
}

function clearContact() {
    return { type: userConstants.CONTACT_CLEAR }
}

function selectUser(user) {
    return { type: userConstants.SELECT_USER, user }
}
function updateSelectedUser(user) {
    return { type: userConstants.UPDATE_SELECTED_USER, user }
}
function cleanSelectedUser(user) {
    return { type: userConstants.CLEAN_SELECTED_USER }
}