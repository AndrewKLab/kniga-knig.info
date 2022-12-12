import { settingsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { settingsService } from '../_services';

export const settingsActions = {
    getAllUsersRoles,
    getAllModules,
    addUsersRolesAccess,
    editUsersRolesAccess,
    removeUsersRolesAccess
};

function getAllUsersRoles(params) {
    return defaultAction(params, {
        serviceFunc: () => settingsService.getAllUsersRoles(params),
        requestType: settingsConstants.GET_ALL_USERS_ROLES_REQUEST,
        successType: settingsConstants.GET_ALL_USERS_ROLES_SUCCESS,
        failureType: settingsConstants.GET_ALL_USERS_ROLES_FAILURE,
    })
}

function getAllModules(params) {
    return defaultAction(params, {
        serviceFunc: () => settingsService.getAllModules(params),
        requestType: settingsConstants.GET_ALL_MODULES_REQUEST,
        successType: settingsConstants.GET_ALL_MODULES_SUCCESS,
        failureType: settingsConstants.GET_ALL_MODULES_FAILURE,
    })
}

function addUsersRolesAccess(params) {
    return defaultAction(params, {
        serviceFunc: () => settingsService.addUsersRolesAccess(params),
        requestType: settingsConstants.ADD_USERS_ROLES_ACCESS_REQUEST,
        successType: settingsConstants.ADD_USERS_ROLES_ACCESS_SUCCESS,
        failureType: settingsConstants.ADD_USERS_ROLES_ACCESS_FAILURE,
    })
}

function editUsersRolesAccess(params) {
    return defaultAction(params, {
        serviceFunc: () => settingsService.editUsersRolesAccess(params),
        requestType: settingsConstants.EDIT_USERS_ROLES_ACCESS_REQUEST,
        successType: settingsConstants.EDIT_USERS_ROLES_ACCESS_SUCCESS,
        failureType: settingsConstants.EDIT_USERS_ROLES_ACCESS_FAILURE,
    })
}

function removeUsersRolesAccess(params) {
    return defaultAction(params, {
        serviceFunc: () => settingsService.removeUsersRolesAccess(params),
        requestType: settingsConstants.REMOVE_USERS_ROLES_ACCESS_REQUEST,
        successType: settingsConstants.REMOVE_USERS_ROLES_ACCESS_SUCCESS,
        failureType: settingsConstants.REMOVE_USERS_ROLES_ACCESS_FAILURE,
    })
}