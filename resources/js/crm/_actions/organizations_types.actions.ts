import { organizationsTypesConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { organizationsTypesService } from '../_services';

export const organizationsTypesActions = {
    getAll,
};

function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => organizationsTypesService.getAll(params),
        requestType: organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_REQUEST,
        successType: organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_SUCCESS,
        failureType: organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_FAILURE,
    })
}