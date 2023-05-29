import { usersConstants, pagesConstants, lessonsUsersProgressConstants } from '../_constants';

const initialState = {
    user_editor_action: null,
    user_editor_kk_user_id: null,

    user_page_tab: 1,
    user_page_tab_table: 6,

    user_for_tree_info: null,

    add_users_loading: false,
    add_users_message: null,
    add_users_errors: null,
    add_users_error_message: null,
    add_users: null,

    edit_users_loading: false,
    edit_users_message: null,
    edit_users_errors: null,
    edit_users_error_message: null,
    edit_users: null,

    remove_users_loading: false,
    remove_users_message: null,
    remove_users_error: null,
    remove_users: null,


    get_all_users_loading: false,
    get_all_users_message: null,
    get_all_users_error: null,
    get_all_users: null,

    get_all_by_role_id_users_loading: false,
    get_all_by_role_id_users_message: null,
    get_all_by_role_id_users_error: null,
    get_all_by_role_id_users: null,

    get_all_my_users_by_role_id_users_loading: false,
    get_all_my_users_by_role_id_users_message: null,
    get_all_my_users_by_role_id_users_error: null,
    get_all_my_users_by_role_id_users: null,

    get_all_without_user_by_role_id_users_loading: false,
    get_all_without_user_by_role_id_users_message: null,
    get_all_without_user_by_role_id_users_error: null,
    get_all_without_user_by_role_id_users: null,

    get_one_by_user_id_users_loading: false,
    get_one_by_user_id_users_message: null,
    get_one_by_user_id_users_error: null,
    get_one_by_user_id_users: null,
}

export function users(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState
        case usersConstants.SET_LESSON_EDITOR:
            return {
                ...state,
                user_editor_action: action.user_editor_action,
                user_editor_kk_user_id: action.user_editor_kk_user_id,
            }
        case usersConstants.SET_USER_FOR_TREE_INFO:
            return {
                ...state,
                user_for_tree_info: action.user,
            }
        case lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_SUCCESS:
            return {
                ...state,
                get_one_by_user_id_users: action?.res?.lesson && state?.get_one_by_user_id_users?.course_user_progress?.course?.lessons.length > 0 ? (
                    {
                        ...state.get_one_by_user_id_users,
                        course_user_progress: {
                            ...state.get_one_by_user_id_users.course_user_progress,
                            course: {
                                ...state.get_one_by_user_id_users.course_user_progress.course,
                                lessons: state.get_one_by_user_id_users.course_user_progress.course.lessons.map((lesson, index) =>
                                    lesson.kk_lesson_id === action?.res?.lesson.kk_lup_lesson_id ? { ...lesson, lesson_users_progress: action?.res?.lesson } : lesson
                                )
                            }
                        }

                    }
                ) : state.get_one_by_user_id_users,

            }

        case usersConstants.SET_USERS_PAGE_TAB:
            return {
                ...state,
                user_page_tab: action.tab,
            }
        case usersConstants.SET_USERS_PAGE_TAB_TABLE:
            return {
                ...state,
                user_page_tab_table: action.table,
            }

        // ADD_USERS
        case usersConstants.ADD_USERS_REQUEST:
            return {
                ...state,
                add_users_loading: true,
                add_users_message: null,
                add_users_errors: null,
                add_users_error_message: null,
                add_users: null,
            };
        case usersConstants.ADD_USERS_SUCCESS:
            return {
                ...state,
                add_users_loading: false,
                add_users_message: action.res.message,
                add_users_errors: null,
                add_users_error_message: null,
                add_users: null,
            };
        case usersConstants.ADD_USERS_FAILURE:
            return {
                ...state,
                add_users_loading: false,
                add_users_message: null,
                add_users_errors: action.error.data,
                add_users_error_message: action.error.message,
                add_users: null,
            };

        // EDIT_USERS
        case usersConstants.EDIT_USERS_REQUEST:
            return {
                ...state,
                edit_users_loading: true,
                edit_users_message: null,
                edit_users_errors: null,
                edit_users_error_message: null,
                edit_users: null,
            };
        case usersConstants.EDIT_USERS_SUCCESS:
            return {
                ...state,
                edit_users_loading: false,
                edit_users_message: action.res.message,
                edit_users_errors: null,
                edit_users_error_message: null,
                edit_users: null,

                get_one_by_role_id_users: action.res.role,
            };
        case usersConstants.EDIT_USERS_FAILURE:
            return {
                ...state,
                edit_users_loading: false,
                edit_users_message: null,
                edit_users_errors: action.error.data,
                edit_users_error_message: action.error.message,
                edit_users: null,
            };

        // EDIT_PUBLISHED_USERS
        case usersConstants.EDIT_PUBLISHED_USERS_REQUEST:
            return {
                ...state,
                edit_published_users_loading: true,
                edit_published_users_message: null,
                edit_published_users_errors: null,
                edit_published_users_error_message: null,
                edit_published_users: null,
            };
        case usersConstants.EDIT_PUBLISHED_USERS_SUCCESS:
            return {
                ...state,
                edit_published_users_loading: false,
                edit_published_users_message: action.res.message,
                edit_published_users_errors: null,
                edit_published_users_error_message: null,
                edit_published_users: null,

                get_one_by_role_id_users: action.res.role,
            };
        case usersConstants.EDIT_PUBLISHED_USERS_FAILURE:
            return {
                ...state,
                edit_published_users_loading: false,
                edit_published_users_message: null,
                edit_published_users_errors: action.error.data,
                edit_published_users_error_message: action.error.message,
                edit_published_users: null,
            };

        // REMOVE_USERS
        case usersConstants.REMOVE_USERS_REQUEST:
            return {
                ...state,
                remove_users_loading: true,
                remove_users_message: null,
                remove_users_error: null,
                remove_users: null,
            };
        case usersConstants.REMOVE_USERS_SUCCESS:
            return {
                ...state,
                remove_users_loading: false,
                remove_users_message: action.res.message,
                remove_users_error: null,
                remove_users: null,
            };
        case usersConstants.REMOVE_USERS_FAILURE:
            return {
                ...state,
                remove_users_loading: false,
                remove_users_message: null,
                remove_users_error: action.error,
                remove_users: null,
            };

        // GET_ALL_USERS
        case usersConstants.GET_ALL_USERS_REQUEST:
            return {
                ...state,
                get_all_users_loading: true,
                get_all_users_message: null,
                get_all_users_error: null,
                get_all_users: null,
            };
        case usersConstants.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                get_all_users_loading: false,
                get_all_users_message: action.res.message,
                get_all_users_error: null,
                get_all_users: action.res.users,
            };
        case usersConstants.GET_ALL_USERS_FAILURE:
            return {
                ...state,
                get_all_users_loading: false,
                get_all_users_message: null,
                get_all_users_error: null,
                get_all_users: action.error,
            };

        // GET_ALL_BY_ROLE_ID_USERS
        case usersConstants.GET_ALL_BY_ROLE_ID_USERS_REQUEST:
            return {
                ...state,
                get_all_by_role_id_users_loading: true,
                get_all_by_role_id_users_message: null,
                get_all_by_role_id_users_error: null,
                get_all_by_role_id_users: null,
            };
        case usersConstants.GET_ALL_BY_ROLE_ID_USERS_SUCCESS:
            return {
                ...state,
                get_all_by_role_id_users_loading: false,
                get_all_by_role_id_users_message: action.res.message,
                get_all_by_role_id_users_error: null,
                get_all_by_role_id_users: action.res.users,
            };
        case usersConstants.GET_ALL_BY_ROLE_ID_USERS_FAILURE:
            return {
                ...state,
                get_all_by_role_id_users_loading: false,
                get_all_by_role_id_users_message: null,
                get_all_by_role_id_users_error: action.error.message,
                get_all_by_role_id_users: null,
            };

        // GET_ALL_MY_USERS_BY_ROLE_ID_USERS
        case usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_REQUEST:
            return {
                ...state,
                get_all_my_users_by_role_id_users_loading: true,
                get_all_my_users_by_role_id_users_message: null,
                get_all_my_users_by_role_id_users_error: null,
                get_all_my_users_by_role_id_users: null,
            };
        case usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_SUCCESS:
            return {
                ...state,
                get_all_my_users_by_role_id_users_loading: false,
                get_all_my_users_by_role_id_users_message: action.res.message,
                get_all_my_users_by_role_id_users_error: null,
                get_all_my_users_by_role_id_users: action.res.users,
            };
        case usersConstants.GET_ALL_MY_USERS_BY_ROLE_ID_USERS_FAILURE:
            return {
                ...state,
                get_all_my_users_by_role_id_users_loading: false,
                get_all_my_users_by_role_id_users_message: null,
                get_all_my_users_by_role_id_users_error: action.error.message,
                get_all_my_users_by_role_id_users: null,
            };

        // GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS
        case usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_REQUEST:
            return {
                ...state,
                get_all_without_user_by_role_id_users_loading: true,
                get_all_without_user_by_role_id_users_message: null,
                get_all_without_user_by_role_id_users_error: null,
                get_all_without_user_by_role_id_users: null,
            };
        case usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_SUCCESS:
            return {
                ...state,
                get_all_without_user_by_role_id_users_loading: false,
                get_all_without_user_by_role_id_users_message: action.res.message,
                get_all_without_user_by_role_id_users_error: null,
                get_all_without_user_by_role_id_users: action.res.users,
            };
        case usersConstants.GET_ALL_WITHOUT_USER_BY_ROLE_ID_USERS_FAILURE:
            return {
                ...state,
                get_all_without_user_by_role_id_users_loading: false,
                get_all_without_user_by_role_id_users_message: null,
                get_all_without_user_by_role_id_users_error: action.error.message,
                get_all_without_user_by_role_id_users: null,
            };

        // GET_ONE_BY_USER_ID_USERS
        case usersConstants.GET_ONE_BY_USER_ID_USERS_REQUEST:
            return {
                ...state,
                get_one_by_user_id_users_loading: true,
                get_one_by_user_id_users_message: null,
                get_one_by_user_id_users_error: null,
                get_one_by_user_id_users: null,
            };
        case usersConstants.GET_ONE_BY_USER_ID_USERS_SUCCESS:
            return {
                ...state,
                get_one_by_user_id_users_loading: false,
                get_one_by_user_id_users_message: action.res.message,
                get_one_by_user_id_users_error: null,
                get_one_by_user_id_users: action.res.user,
            };
        case usersConstants.GET_ONE_BY_USER_ID_USERS_FAILURE:
            return {
                ...state,
                get_one_by_user_id_users_loading: false,
                get_one_by_user_id_users_message: null,
                get_one_by_user_id_users_error: action.error.message,
                get_one_by_user_id_users: null,
            };

        default:
            return state
    }
}