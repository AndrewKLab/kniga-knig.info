import { coursesCategoriesConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { coursesCategoriesService } from '../_services';

export const coursesCategoriesActions = {
    getAll,
    getOneByCategoryId
};

function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesCategoriesService.getAll(params),
        requestType: coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_REQUEST,
        successType: coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_SUCCESS,
        failureType: coursesCategoriesConstants.GET_ALL_COURSES_CATEGORIES_FAILURE,
    })
}

function getOneByCategoryId(params) {
    return dispatch => {
        dispatch(request(params));
        return coursesCategoriesService.getOneByCategoryId(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_REQUEST, params } }
    function success(res) { return { type: coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_SUCCESS, res } }
    function failure(error) { return { type: coursesCategoriesConstants.GET_ONE_BY_CATEGORY_ID_COURSES_CATEGORIES_FAILURE, error } }
}