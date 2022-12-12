import { questionsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { questionsService } from '../_services';

export const questionsActions = {
    add,
    edit,
    remove,
    // getAll,
    getAllByLessonId,

    setQuestionEditor,
};

function add(params) {
    return dispatch => {
        dispatch(request(params));
        return questionsService.add(params)
            .then(
                res => {
                    dispatch(success(res))
                    dispatch(setQuestionEditor('edit', res.question.kk_question_id))
                },
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: questionsConstants.ADD_QUESTIONS_REQUEST, params } }
    function success(res) { return { type: questionsConstants.ADD_QUESTIONS_SUCCESS, res } }
    function failure(error) { return { type: questionsConstants.ADD_QUESTIONS_FAILURE, error } }
}

// function add(params) {
//     return defaultAction(params, {
//         serviceFunc: () => questionsService.add(params),
//         requestType: questionsConstants.ADD_QUESTIONS_REQUEST,
//         successType: questionsConstants.ADD_QUESTIONS_SUCCESS,
//         failureType: questionsConstants.ADD_QUESTIONS_FAILURE,
//     })
// }
function edit(params) {
    return defaultAction(params, {
        serviceFunc: () => questionsService.edit(params),
        requestType: questionsConstants.EDIT_QUESTIONS_REQUEST,
        successType: questionsConstants.EDIT_QUESTIONS_SUCCESS,
        failureType: questionsConstants.EDIT_QUESTIONS_FAILURE,
    })
}

function remove(params) {
    return defaultAction(params, {
        serviceFunc: () => questionsService.remove(params),
        requestType: questionsConstants.REMOVE_QUESTIONS_REQUEST,
        successType: questionsConstants.REMOVE_QUESTIONS_SUCCESS,
        failureType: questionsConstants.REMOVE_QUESTIONS_FAILURE,
    })
}

// function getAll(params) {
//     return defaultAction(params, {
//         serviceFunc: () => coursesUsersProgressService.add(params),
//         requestType: coursesUsersProgressConstants.GET_ALL_QUESTIONS_REQUEST,
//         successType: coursesUsersProgressConstants.GET_ALL_QUESTIONS_SUCCESS,
//         failureType: coursesUsersProgressConstants.GET_ALL_QUESTIONS_FAILURE,
//     })
// }
function getAllByLessonId(params) {
    return defaultAction(params, {
        serviceFunc: () => questionsService.getAllByLessonId(params),
        requestType: questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_REQUEST,
        successType: questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_SUCCESS,
        failureType: questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_FAILURE,
    })
}



function setQuestionEditor(question_editor_action, question_editor_question) {
    return dispatch => dispatch({ type: questionsConstants.SET_QUESTION_EDITOR, question_editor_action, question_editor_question })
}