

export function defaultAction(params, { serviceFunc, requestType, successType, failureType, }) {
    return dispatch => {
        dispatch(request(params));
        return serviceFunc(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: requestType, params } }
    function success(res) { return { type: successType, res } }
    function failure(error) { return { type: failureType, error } }
}