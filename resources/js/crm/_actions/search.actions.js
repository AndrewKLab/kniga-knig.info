import { searchConstants } from '../_constants';
import { searchService } from '../_services';

export const searchActions = {
    search
};

function search(keywords) {
    return dispatch => {
        dispatch(request())
        return searchService.search(keywords)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: searchConstants.SEARCH_REQUEST } }
    function success(data) { return { type: searchConstants.SEARCH_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}