import { coursesUsersProgressConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { coursesUsersProgressService } from '../_services';

export const coursesUsersProgressActions = {
    add,
    edit,
    remove,
    getAll,
    getOneByCourseId
};

function add(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesUsersProgressService.add(params),
        requestType: coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_REQUEST,
        successType: coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_SUCCESS,
        failureType: coursesUsersProgressConstants.ADD_COURSES_USERS_PROGRESS_FAILURE,
    })
}
function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesUsersProgressService.edit(params),
        requestType: coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_REQUEST,
        successType: coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_SUCCESS,
        failureType: coursesUsersProgressConstants.EDIT_COURSES_USERS_PROGRESS_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesUsersProgressService.remove(params),
        requestType: coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_REQUEST,
        successType: coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_SUCCESS,
        failureType: coursesUsersProgressConstants.REMOVE_COURSES_USERS_PROGRESS_FAILURE,
    })
}
function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesUsersProgressService.getAll(params),
        requestType: coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_REQUEST,
        successType: coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_SUCCESS,
        failureType: coursesUsersProgressConstants.GET_ALL_COURSES_USERS_PROGRESS_FAILURE,
    })
}
function getOneByCourseId(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesUsersProgressService.getOneByCourseId(params),
        requestType: coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_REQUEST,
        successType: coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_SUCCESS,
        failureType: coursesUsersProgressConstants.GET_ONE_BY_COURSE_ID_COURSES_USERS_PROGRESS_FAILURE,
    })
}