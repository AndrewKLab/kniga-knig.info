import { organizationsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { organizationsService } from '../_services';

export const organizationsActions = {
    create,
    update,
    remove,
    getAll,
    getOneById,
};

function create(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsService.create(params),
        requestType: organizationsConstants.CREATE_ORGANIZATION_REQUEST,
        successType: organizationsConstants.CREATE_ORGANIZATION_SUCCESS,
        failureType: organizationsConstants.CREATE_ORGANIZATION_FAILURE,
    })
}
function update(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsService.update(params),
        requestType: organizationsConstants.UPDATE_ORGANIZATION_REQUEST,
        successType: organizationsConstants.UPDATE_ORGANIZATION_SUCCESS,
        failureType: organizationsConstants.UPDATE_ORGANIZATION_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsService.remove(params),
        requestType: organizationsConstants.DELETE_ORGANIZATION_REQUEST,
        successType: organizationsConstants.DELETE_ORGANIZATION_SUCCESS,
        failureType: organizationsConstants.DELETE_ORGANIZATION_FAILURE,
    })
}
function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsService.getAll(params),
        requestType: organizationsConstants.GET_ALL_ORGANIZATIONS_REQUEST,
        successType: organizationsConstants.GET_ALL_ORGANIZATIONS_SUCCESS,
        failureType: organizationsConstants.GET_ALL_ORGANIZATIONS_FAILURE,
    })
}
function getOneById(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsService.getOneById(params),
        requestType: organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_REQUEST,
        successType: organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_SUCCESS,
        failureType: organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_FAILURE,
    })
}