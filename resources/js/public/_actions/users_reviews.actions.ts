import { usersReviewsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { usersReviewsService } from '../_services';

export const usersReviewsActions = {
    init,
    create,
    update,
    remove,
    getAll,
    getOneById,
};

function init(params) {
    return dispatch => dispatch({ type: usersReviewsConstants.USERS_REVIEWS_INIT })
}
function create(params) {
    return defaultAction(params, {
        serviceFunc: () => usersReviewsService.create(params),
        requestType: usersReviewsConstants.CREATE_USERS_REVIEWS_REQUEST,
        successType: usersReviewsConstants.CREATE_USERS_REVIEWS_SUCCESS,
        failureType: usersReviewsConstants.CREATE_USERS_REVIEWS_FAILURE,
    })
}
function update(params) {
    return defaultAction(params, {
        serviceFunc: () => usersReviewsService.update(params),
        requestType: usersReviewsConstants.UPDATE_USERS_REVIEWS_REQUEST,
        successType: usersReviewsConstants.UPDATE_USERS_REVIEWS_SUCCESS,
        failureType: usersReviewsConstants.UPDATE_USERS_REVIEWS_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => usersReviewsService.remove(params),
        requestType: usersReviewsConstants.DELETE_USERS_REVIEWS_REQUEST,
        successType: usersReviewsConstants.DELETE_USERS_REVIEWS_SUCCESS,
        failureType: usersReviewsConstants.DELETE_USERS_REVIEWS_FAILURE,
    })
}
function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => usersReviewsService.getAll(params),
        requestType: usersReviewsConstants.GET_ALL_USERS_REVIEWS_REQUEST,
        successType: usersReviewsConstants.GET_ALL_USERS_REVIEWS_SUCCESS,
        failureType: usersReviewsConstants.GET_ALL_USERS_REVIEWS_FAILURE,
    })
}
function getOneById(params) {
    return defaultAction(params, {
        serviceFunc: () => usersReviewsService.getOneById(params),
        requestType: usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_REQUEST,
        successType: usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_SUCCESS,
        failureType: usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_FAILURE,
    })
}