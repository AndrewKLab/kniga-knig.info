import { organizationsUsersConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import {  organizationsUsersService } from '../_services';

export const organizationsUsersActions = {
    create,
    remove,
};

function create(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsUsersService.create(params),
        requestType: organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_REQUEST,
        successType: organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_SUCCESS,
        failureType: organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsUsersService.remove(params),
        requestType: organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_REQUEST,
        successType: organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_SUCCESS,
        failureType: organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_FAILURE,
    })
}