import { usersConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { usersService } from '../_services';

export const usersActions = {
    setUserForTreeInfo,
    setUsersPageTab,
    setUsersPageTabTable,

    add,
    edit,
    remove,
    getAllByRoleId,
    getAllMyUsersByRoleId,
    getAllWithoutUserByRoleId,
    getOneByUserId
};


function setUserForTreeInfo(user) { return { type: usersConstants.SET_USER_FOR_TREE_INFO, user } }
function setUsersPageTab(tab) { return { type: usersConstants.SET_USERS_PAGE_TAB, tab } }
function setUsersPageTabTable(table) { return { type: usersConstants.SET_USERS_PAGE_TAB_TABLE, table } }

function add(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return usersService.add(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate(`/users/action/edit/${res.user.kk_user_id}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: usersConstants.ADD_USERS_REQUEST, params } }
    function success(res) { return { type: usersConstants.ADD_USERS_SUCCESS, res } }
    function failure(error) { return { type: usersConstants.ADD_USERS_FAILURE, error } }
}

function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.edit(params),
        requestType: usersConstants.EDIT_USERS_REQUEST,
        successType: usersConstants.EDIT_USERS_SUCCESS,
        failureType: usersConstants.EDIT_USERS_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.remove(params),
        requestType: usersConstants.REMOVE_USERS_REQUEST,
        successType: usersConstants.REMOVE_USERS_SUCCESS,
        failureType: usersConstants.REMOVE_USERS_FAILURE,
    })
}

function getAllByRoleId(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.getAllByRoleId(params),
        requestType: usersConstants.GET_ALL_BY_ROLE_ID_USERS_REQUEST,
        successType: usersConstants.GET_ALL_BY_ROLE_ID_USERS_SUCCESS,
        failureType: usersConstants.GET_ALL_BY_ROLE_ID_USERS_FAILURE,
    })
}

function getAllMyUsersByRoleId(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.getAllMyUsersByRoleId(params),
        requestType: usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_REQUEST,
        successType: usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_SUCCESS,
        failureType: usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_FAILURE,
    })
}

function getAllWithoutUserByRoleId(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.getAllWithoutUserByRoleId(params),
        requestType: usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_REQUEST,
        successType: usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_SUCCESS,
        failureType: usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_FAILURE,
    })
}

function getOneByUserId(params) {
    return defaultAction(params, {
        serviceFunc: () => usersService.getOneByUserId(params),
        requestType: usersConstants.GET_ONE_BY_USER_ID_USERS_REQUEST,
        successType: usersConstants.GET_ONE_BY_USER_ID_USERS_SUCCESS,
        failureType: usersConstants.GET_ONE_BY_USER_ID_USERS_FAILURE,
    })
}
