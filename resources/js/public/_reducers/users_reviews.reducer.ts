import { usersReviewsConstants, pagesConstants } from '../_constants';

const initialState = {
    create_users_reviews_loading: false,
    create_users_reviews_message: null,
    create_users_reviews_errors: null,
    create_users_reviews_error_message: null,
    create_users_reviews: null,

    update_users_reviews_loading: false,
    update_users_reviews_message: null,
    update_users_reviews_errors: null,
    update_users_reviews_error_message: null,
    update_users_reviews: null,

    delete_users_reviews_loading: false,
    delete_users_reviews_message: null,
    delete_users_reviews_error: null,
    delete_users_reviews: null,

    get_all_users_reviews_loading: false,
    get_all_users_reviews_message: null,
    get_all_users_reviews_error: null,
    get_all_users_reviews: null,

    get_one_by_id_users_reviews_loading: false,
    get_one_by_id_users_reviews_message: null,
    get_one_by_id_users_reviews_error: null,
    get_one_by_id_users_reviews: null,
}

export function users_reviews(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        case usersReviewsConstants.USERS_REVIEWS_INIT:
            return initialState

        // CREATE_USERS_REVIEWS
        case usersReviewsConstants.CREATE_USERS_REVIEWS_REQUEST:
            return {
                ...state,
                create_users_reviews_loading: true,
                create_users_reviews_message: null,
                create_users_reviews_errors: null,
                create_users_reviews_error_message: null,
                create_users_reviews: null,
            };
        case usersReviewsConstants.CREATE_USERS_REVIEWS_SUCCESS:
            return {
                ...state,
                create_users_reviews_loading: false,
                create_users_reviews_message: action.res.message,
                create_users_reviews_errors: null,
                create_users_reviews_error_message: null,
                create_users_reviews: null,
            };
        case usersReviewsConstants.CREATE_USERS_REVIEWS_FAILURE:
            return {
                ...state,
                create_users_reviews_loading: false,
                create_users_reviews_message: null,
                create_users_reviews_errors: action.error.data,
                create_users_reviews_error_message: action.error.message,
                create_users_reviews: null,
            };

        // UPDATE_USERS_REVIEWS
        case usersReviewsConstants.UPDATE_USERS_REVIEWS_REQUEST:
            return {
                ...state,
                update_users_reviews_loading: true,
                update_users_reviews_message: null,
                update_users_reviews_errors: null,
                update_users_reviews_error_message: null,
                update_users_reviews: null,
            };
        case usersReviewsConstants.UPDATE_USERS_REVIEWS_SUCCESS:
            return {
                ...state,
                update_users_reviews_loading: false,
                update_users_reviews_message: action.res.message,
                update_users_reviews_errors: null,
                update_users_reviews_error_message: null,
                update_users_reviews: null,
            };
        case usersReviewsConstants.UPDATE_USERS_REVIEWS_FAILURE:
            return {
                ...state,
                update_users_reviews_loading: false,
                update_users_reviews_message: null,
                update_users_reviews_errors: action.error.message.data,
                update_users_reviews_error_message: action.error.message.message,
                update_users_reviews: null,
            };

        // DELETE_USERS_REVIEWS
        case usersReviewsConstants.DELETE_USERS_REVIEWS_REQUEST:
            return {
                ...state,
                delete_users_reviews_loading: true,
                delete_users_reviews_message: null,
                delete_users_reviews_error: null,
                delete_users_reviews: null,
            };
        case usersReviewsConstants.DELETE_USERS_REVIEWS_SUCCESS:
            return {
                ...state,
                delete_users_reviews_loading: false,
                delete_users_reviews_message: action.res.message,
                delete_users_reviews_error: null,
                delete_users_reviews: null,

                get_all_users_reviews: state.get_all_users_reviews.filter(item => item.kk_ur_id != action.res.ur.kk_ur_id)
            };
        case usersReviewsConstants.DELETE_USERS_REVIEWS_FAILURE:
            return {
                ...state,
                delete_users_reviews_loading: false,
                delete_users_reviews_message: null,
                delete_users_reviews_error: action.error.message,
                delete_users_reviews: null,


            };

        // GET_ALL_USERS_REVIEWS
        case usersReviewsConstants.GET_ALL_USERS_REVIEWS_REQUEST:
            return {
                ...state,
                get_all_users_reviews_loading: true,
                get_all_users_reviews_message: null,
                get_all_users_reviews_error: null,
                get_all_users_reviews: null,
            };
        case usersReviewsConstants.GET_ALL_USERS_REVIEWS_SUCCESS:
            return {
                ...state,
                get_all_users_reviews_loading: false,
                get_all_users_reviews_message: action.res.message,
                get_all_users_reviews_error: null,
                get_all_users_reviews: action.res.urs,
            };
        case usersReviewsConstants.GET_ALL_USERS_REVIEWS_FAILURE:
            return {
                ...state,
                get_all_users_reviews_loading: false,
                get_all_users_reviews_message: null,
                get_all_users_reviews_error: action.error.message,
                get_all_users_reviews: null,
            };

        // GET_ONE_BY_ID_USERS_REVIEWS
        case usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_REQUEST:
            return {
                ...state,
                get_one_by_id_users_reviews_loading: true,
                get_one_by_id_users_reviews_message: null,
                get_one_by_id_users_reviews_error: null,
                get_one_by_id_users_reviews: null,
            };
        case usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_SUCCESS:
            return {
                ...state,
                get_one_by_id_users_reviews_loading: false,
                get_one_by_id_users_reviews_message: action.res.message,
                get_one_by_id_users_reviews_error: null,
                get_one_by_id_users_reviews: action.res.ur,
            };
        case usersReviewsConstants.GET_ONE_BY_ID_USERS_REVIEWS_FAILURE:
            return {
                ...state,
                get_one_by_id_users_reviews_loading: false,
                get_one_by_id_users_reviews_message: null,
                get_one_by_id_users_reviews_error: action.error.message,
                get_one_by_id_users_reviews: null,
            };


        default:
            return state
    }
}