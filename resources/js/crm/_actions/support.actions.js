import { supportConstants } from '../_constants';
import { supportService } from '../_services';

export const supportActions = {
    create,
};

function create(params) {
    return dispatch => {
        dispatch(request(params));
        return supportService.create(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: supportConstants.CREATE_SUPPORT_REQUEST, params } }
    function success(res) { return { type: supportConstants.CREATE_SUPPORT_SUCCESS, res } }
    function failure(error) { return { type: supportConstants.CREATE_SUPPORT_FAILURE, error } }
}
