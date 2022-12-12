import { questionsConstants, pagesConstants } from '../_constants';

const initialState = {
    question_editor_action: null,
    question_editor_question: null,

    add_questions_loading: false,
    add_questions_message: null,
    add_questions_errors: null,
    add_questions_error_message: null,
    add_questions: null,

    edit_questions_loading: false,
    edit_questions_message: null,
    edit_questions_errors: null,
    edit_questions_error_message: null,
    edit_questions: null,

    remove_question_loading: false,
    remove_question_message: null,
    remove_question_error: null,
    remove_question: null,


    // get_all_questions_loading: false,
    // get_all_questions_message: null,
    // get_all_questions_error: null,
    // get_all_questions: null,

    get_all_by_lesson_id_questions_loading: false,
    get_all_by_lesson_id_questions_message: null,
    get_all_by_lesson_id_questions_error: null,
    get_all_by_lesson_id_questions: null,

}

export function questions(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        case questionsConstants.SET_QUESTION_EDITOR:
            return {
                ...state,
                question_editor_action: action.question_editor_action,
                question_editor_question: action.question_editor_question,

                add_questions_message: null,
                add_questions_errors: null,
                add_questions_error_message: null,

                edit_questions_message: null,
                edit_questions_errors: null,
                edit_questions_error_message: null,
            }

        // ADD_QUESTIONS
        case questionsConstants.ADD_QUESTIONS_REQUEST:
            return {
                ...state,
                add_questions_loading: true,
                add_questions_message: null,
                add_questions_errors: null,
                add_questions_error_message: null,
                add_questions: null,
            };
        case questionsConstants.ADD_QUESTIONS_SUCCESS:
            return {
                ...state,
                add_questions_loading: false,
                add_questions_message: action.res.message,
                add_questions_errors: null,
                add_questions_error_message: null,
                add_questions: null,
            };
        case questionsConstants.ADD_QUESTIONS_FAILURE:
            return {
                ...state,
                add_questions_loading: false,
                add_questions_message: null,
                add_questions_errors: action.error.data,
                add_questions_error_message: action.error.message,
                add_questions: null,
            };

        // EDIT_QUESTIONS
        case questionsConstants.EDIT_QUESTIONS_REQUEST:
            return {
                ...state,
                edit_questions_loading: true,
                edit_questions_message: null,
                edit_questions_errors: null,
                edit_questions_error_message: null,
                edit_questions: null,
            };
        case questionsConstants.EDIT_QUESTIONS_SUCCESS:
            return {
                ...state,
                edit_questions_loading: false,
                edit_questions_message: action.res.message,
                edit_questions_errors: null,
                edit_questions_error_message: null,
                edit_questions: null,

                get_one_by_lesson_id_questions: action.res.lesson,
            };
        case questionsConstants.EDIT_QUESTIONS_FAILURE:
            return {
                ...state,
                edit_questions_loading: false,
                edit_questions_message: null,
                edit_questions_errors: action.error.data,
                edit_questions_error_message: action.error.message,
                edit_questions: null,
            };


        // REMOVE_QUESTIONS
        case questionsConstants.REMOVE_QUESTIONS_REQUEST:
            return {
                ...state,
                remove_questions_loading: true,
                remove_questions_message: null,
                remove_questions_error: null,
                remove_questions: null,
            };
        case questionsConstants.REMOVE_QUESTIONS_SUCCESS:
            return {
                ...state,
                remove_questions_loading: false,
                remove_questions_message: action.res.message,
                remove_questions_error: null,
                remove_questions: null,
            };
        case questionsConstants.REMOVE_QUESTIONS_FAILURE:
            return {
                ...state,
                remove_questions_loading: false,
                remove_questions_message: null,
                remove_questions_error: action.error,
                remove_questions: null,
            };

        // GET_ALL_QUESTIONS_CATEGORIES
        // case questionsConstants.GET_ALL_QUESTIONS_REQUEST:
        //     return {
        //         ...state,
        //         get_all_questions_loading: true,
        //         get_all_questions_message: null,
        //         get_all_questions_error: null,
        //         get_all_questions: null,
        //     };
        // case questionsConstants.GET_ALL_QUESTIONS_SUCCESS:
        //     return {
        //         ...state,
        //         get_all_questions_loading: false,
        //         get_all_questions_message: action.res.message,
        //         get_all_questions_error: null,
        //         get_all_questions: action.res.questions,
        //     };
        // case questionsConstants.GET_ALL_QUESTIONS_FAILURE:
        //     return {
        //         ...state,
        //         get_all_questions_loading: false,
        //         get_all_questions_message: null,
        //         get_all_questions_error: null,
        //         get_all_questions: action.error,
        //     };

        // GET_ALL_BY_LESSON_ID_QUESTIONS
        case questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_REQUEST:
            return {
                ...state,
                get_all_by_lesson_id_questions_loading: true,
                get_all_by_lesson_id_questions_message: null,
                get_all_by_lesson_id_questions_error: null,
                get_all_by_lesson_id_questions: null,
            };
        case questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_SUCCESS:
            return {
                ...state,
                get_all_by_lesson_id_questions_loading: false,
                get_all_by_lesson_id_questions_message: action.res.message,
                get_all_by_lesson_id_questions_error: null,
                get_all_by_lesson_id_questions: action.res.questions,
            };
        case questionsConstants.GET_ALL_BY_LESSON_ID_QUESTIONS_FAILURE:
            return {
                ...state,
                get_all_by_lesson_id_questions_loading: true,
                get_all_by_lesson_id_questions_message: null,
                get_all_by_lesson_id_questions_error: null,
                get_all_by_lesson_id_questions: action.error,
            };



        default:
            return state
    }
}