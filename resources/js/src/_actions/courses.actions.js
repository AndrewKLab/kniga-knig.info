import { coursesConstants } from '../_constants';
import { coursesService } from '../_services';

export const coursesActions = {
    getAll,
    getAllByCategoryId,
    getOneByCourseId
};

function getAll(params) {
    return dispatch => {
        dispatch(request(params));
        return coursesService.getAll(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: coursesConstants.GET_ALL_COURSES_REQUEST, params } }
    function success(res) { return { type: coursesConstants.GET_ALL_COURSES_SUCCESS, res } }
    function failure(error) { return { type: coursesConstants.GET_ALL_COURSES_FAILURE, error } }
}
function getAllByCategoryId(params) {
    return dispatch => {
        dispatch(request(params));
        return coursesService.getAllByCategoryId(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_REQUEST, params } }
    function success(res) { return { type: coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_SUCCESS, res } }
    function failure(error) { return { type: coursesConstants.GET_ALL_BY_CATEGORY_ID_COURSES_FAILURE, error } }
}
function getOneByCourseId(params) {
    return dispatch => {
        dispatch(request(params));
        return coursesService.getOneByCourseId(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_REQUEST, params } }
    function success(res) { return { type: coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_SUCCESS, res } }
    function failure(error) { return { type: coursesConstants.GET_ONE_BY_COURSE_ID_COURSES_FAILURE, error } }
}