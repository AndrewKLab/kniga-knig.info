import { coursesConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { coursesService } from '../_services';

export const coursesActions = {
    setCoursesPageTab,
    setCoursesPageTabTable,

    add,
    edit,
    editPublished,
    remove,
    getAll,
    getAllByCategoryId,
    getOneByCourseId
};

function setCoursesPageTab(tab) { return { type: coursesConstants.SET_COURSES_PAGE_TAB, tab } }
function setCoursesPageTabTable(table) { return { type: coursesConstants.SET_COURSES_PAGE_TAB_TABLE, table } }

function add(params, navigate) {
    return dispatch => {
        dispatch(request(params));
        return coursesService.add(params)
            .then(
                res => {
                    dispatch(success(res))
                    navigate(`/courses/constructor/edit/${res.course.kk_course_id}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: coursesConstants.ADD_COURSES_REQUEST, params } }
    function success(res) { return { type: coursesConstants.ADD_COURSES_SUCCESS, res } }
    function failure(error) { return { type: coursesConstants.ADD_COURSES_FAILURE, error } }
}

// function add(params) {
//     return defaultAction(params, {
//         serviceFunc: () => coursesService.add(params),
//         requestType: coursesConstants.ADD_COURSES_REQUEST,
//         successType: coursesConstants.ADD_COURSES_SUCCESS,
//         failureType: coursesConstants.ADD_COURSES_FAILURE,
//     })
// }
function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesService.edit(params),
        requestType: coursesConstants.EDIT_COURSES_REQUEST,
        successType: coursesConstants.EDIT_COURSES_SUCCESS,
        failureType: coursesConstants.EDIT_COURSES_FAILURE,
    })
}
function editPublished(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesService.edit(params),
        requestType: coursesConstants.EDIT_PUBLISHED_COURSES_REQUEST,
        successType: coursesConstants.EDIT_PUBLISHED_COURSES_SUCCESS,
        failureType: coursesConstants.EDIT_PUBLISHED_COURSES_FAILURE,
    })
}
function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => coursesService.remove(params),
        requestType: coursesConstants.REMOVE_COURSES_REQUEST,
        successType: coursesConstants.REMOVE_COURSES_SUCCESS,
        failureType: coursesConstants.REMOVE_COURSES_FAILURE,
    })
}

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