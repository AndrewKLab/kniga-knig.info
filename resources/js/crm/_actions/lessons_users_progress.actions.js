import { lessonsUsersProgressConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { lessonsUsersProgressService } from '../_services';

export const lessonsUsersProgressActions = {
    add,
    edit,
    remove,
    getAllByCupId,
    getOneByLessonId
};

function add(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsUsersProgressService.add(params),
        requestType: lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_REQUEST,
        successType: lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_SUCCESS,
        failureType: lessonsUsersProgressConstants.ADD_LESSONS_USERS_PROGRESS_FAILURE,
    })
}
function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsUsersProgressService.edit(params),
        requestType: lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_REQUEST,
        successType: lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_SUCCESS,
        failureType: lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsUsersProgressService.remove(params),
        requestType: lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_REQUEST,
        successType: lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_SUCCESS,
        failureType: lessonsUsersProgressConstants.REMOVE_LESSONS_USERS_PROGRESS_FAILURE,
    })
}
function getAllByCupId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsUsersProgressService.getAllByCupId(params),
        requestType: lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_REQUEST,
        successType: lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_SUCCESS,
        failureType: lessonsUsersProgressConstants.GET_ALL_BY_CUP_ID_LESSONS_USERS_PROGRESS_FAILURE,
    })
}
function getOneByLessonId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsUsersProgressService.getOneByLessonId(params),
        requestType: lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_REQUEST,
        successType: lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_SUCCESS,
        failureType: lessonsUsersProgressConstants.GET_ONE_BY_LESSON_ID_LESSONS_USERS_PROGRESS_FAILURE,
    })
}