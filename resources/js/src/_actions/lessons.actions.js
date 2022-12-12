import { lessonsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { lessonsService } from '../_services';

export const lessonsActions = {
    // getAll,
    // getAllByCategoryId,
    getOneByLessonId,
    getFirstByCourseId,
};

// function getAll(params) {
//     return defaultAction(params, {
//         serviceFunc: () => coursesUsersProgressService.add(params),
//         requestType: coursesUsersProgressConstants.GET_ALL_LESSONS_REQUEST,
//         successType: coursesUsersProgressConstants.GET_ALL_LESSONS_SUCCESS,
//         failureType: coursesUsersProgressConstants.GET_ALL_LESSONS_FAILURE,
//     })
// }
// function getAllByCategoryId(params) {
//     return dispatch => {
//         dispatch(request(params));
//         return lessonsService.getAllByCategoryId(params)
//             .then(
//                 res => dispatch(success(res)),
//                 error => dispatch(failure(error))
//             );
//     };

//     function request(params) { return { type: lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_REQUEST, params } }
//     function success(res) { return { type: lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_SUCCESS, res } }
//     function failure(error) { return { type: lessonsConstants.GET_ALL_BY_CATEGORY_ID_LESSONS_FAILURE, error } }
// }

function getOneByLessonId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.getOneByLessonId(params),
        requestType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_REQUEST,
        successType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_SUCCESS,
        failureType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_FAILURE,
    })
}

function getFirstByCourseId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.getFirstByCourseId(params),
        requestType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_REQUEST,
        successType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_SUCCESS,
        failureType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_FAILURE,
    })
}