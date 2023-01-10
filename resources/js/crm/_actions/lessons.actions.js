import { lessonsConstants, questionsUsersAnswersConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { lessonsService, questionsUsersProgressAnswersService } from '../_services';

export const lessonsActions = {
    add,
    edit,
    editPublished,
    remove,
    // getAll,
    getAllByCourseId,
    getOneByLessonId,

    setLessonEditor,

    editQuestionUserAnswer,
};

function add(params) {
    return dispatch => {
        dispatch(request(params));
        return lessonsService.add(params)
            .then(
                res => {
                    dispatch(success(res))
                    dispatch(setLessonEditor('edit', res.lesson.kk_lesson_id))
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: lessonsConstants.ADD_LESSONS_REQUEST, params } }
    function success(res) { return { type: lessonsConstants.ADD_LESSONS_SUCCESS, res } }
    function failure(error) { return { type: lessonsConstants.ADD_LESSONS_FAILURE, error } }
}

// function add(params) {
//     return defaultAction(params, {
//         serviceFunc: () => lessonsService.add(params),
//         requestType: lessonsConstants.ADD_LESSONS_REQUEST,
//         successType: lessonsConstants.ADD_LESSONS_SUCCESS,
//         failureType: lessonsConstants.ADD_LESSONS_FAILURE,
//     })
// }
function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.edit(params),
        requestType: lessonsConstants.EDIT_LESSONS_REQUEST,
        successType: lessonsConstants.EDIT_LESSONS_SUCCESS,
        failureType: lessonsConstants.EDIT_LESSONS_FAILURE,
    })
}
function editPublished(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.edit(params),
        requestType: lessonsConstants.EDIT_PUBLISHED_LESSONS_REQUEST,
        successType: lessonsConstants.EDIT_PUBLISHED_LESSONS_SUCCESS,
        failureType: lessonsConstants.EDIT_PUBLISHED_LESSONS_FAILURE,
    })
}

function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.remove(params),
        requestType: lessonsConstants.REMOVE_LESSONS_REQUEST,
        successType: lessonsConstants.REMOVE_LESSONS_SUCCESS,
        failureType: lessonsConstants.REMOVE_LESSONS_FAILURE,
    })
}

// function getAll(params) {
//     return defaultAction(params, {
//         serviceFunc: () => coursesUsersProgressService.add(params),
//         requestType: coursesUsersProgressConstants.GET_ALL_LESSONS_REQUEST,
//         successType: coursesUsersProgressConstants.GET_ALL_LESSONS_SUCCESS,
//         failureType: coursesUsersProgressConstants.GET_ALL_LESSONS_FAILURE,
//     })
// }
function getAllByCourseId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.getAllByCourseId(params),
        requestType: lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_REQUEST,
        successType: lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_SUCCESS,
        failureType: lessonsConstants.GET_ALL_BY_COURSE_ID_LESSONS_FAILURE,
    })
}


function getOneByLessonId(params) {
    return defaultAction(params, {
        serviceFunc: () => lessonsService.getOneByLessonId(params),
        requestType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_REQUEST,
        successType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_SUCCESS,
        failureType: lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_FAILURE,
    })
}


function setLessonEditor(lesson_editor_action, lesson_editor_kk_lesson_id) {
    return dispatch => dispatch({ type: lessonsConstants.SET_LESSON_EDITOR, lesson_editor_action, lesson_editor_kk_lesson_id })
}

function editQuestionUserAnswer(params) {
    return defaultAction(params, {
        serviceFunc: () => questionsUsersProgressAnswersService.edit(params),
        requestType: questionsUsersAnswersConstants.EDIT_QUESTIONS_USERS_ANSWERS_REQUEST,
        successType: questionsUsersAnswersConstants.EDIT_QUESTIONS_USERS_ANSWERS_SUCCESS,
        failureType: questionsUsersAnswersConstants.EDIT_QUESTIONS_USERS_ANSWERS_FAILURE,
    })
}