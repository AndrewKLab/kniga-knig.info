import { settingsConstants } from '../_constants';
const initialState = {
    get_all_users_roles_loading: false,
    get_all_users_roles_message: null,
    get_all_users_roles_error: null,
    get_all_users_roles: null,

    get_all_modules_loading: false,
    get_all_modules_message: null,
    get_all_modules_error: null,
    get_all_modules: null,

    add_users_roles_access_loading: false,
    add_users_roles_access_message: null,
    add_users_roles_access_error: null,
    add_users_roles_access: null,

    edit_users_roles_access_loading: false,
    edit_users_roles_access_message: null,
    edit_users_roles_access_error: null,
    edit_users_roles_access: null,

    remove_users_roles_access_loading: false,
    remove_users_roles_access_message: null,
    remove_users_roles_access_error: null,
    remove_users_roles_access: null,
}

export function settings(state = initialState, action) {
    switch (action.type) {
        case settingsConstants.GET_ALL_USERS_ROLES_REQUEST:
            return {
                ...state,
                get_all_users_roles_loading: true,
                get_all_users_roles_message: null,
                get_all_users_roles_error: null,
                get_all_users_roles: null,
            };
        case settingsConstants.GET_ALL_USERS_ROLES_SUCCESS:
            return {
                ...state,
                get_all_users_roles_loading: false,
                get_all_users_roles_message: action.res.message,
                get_all_users_roles_error: null,
                get_all_users_roles: action.res.roles,
            };
        case settingsConstants.GET_ALL_USERS_ROLES_FAILURE:
            return {
                ...state,
                get_all_users_roles_loading: false,
                get_all_users_roles_message: action.res.message,
                get_all_users_roles_error: action.error,
                get_all_users_roles: null,
            };

        case settingsConstants.GET_ALL_MODULES_REQUEST:
            return {
                ...state,
                get_all_modules_loading: true,
                get_all_modules_message: null,
                get_all_modules_error: null,
                get_all_modules: null,
            };
        case settingsConstants.GET_ALL_MODULES_SUCCESS:
            return {
                ...state,
                get_all_modules_loading: false,
                get_all_modules_message: action.res.message,
                get_all_modules_error: null,
                get_all_modules: action.res.modules,
            };
        case settingsConstants.GET_ALL_MODULES_FAILURE:
            return {
                ...state,
                get_all_modules_loading: false,
                get_all_modules_message: null,
                get_all_modules_error: action.error,
                get_all_modules: null,
            };

        //ADD_USERS_ROLES_ACCESS
        case settingsConstants.ADD_USERS_ROLES_ACCESS_REQUEST:
            return {
                ...state,
                add_users_roles_access_loading: true,
                add_users_roles_access_message: null,
                add_users_roles_access_error: null,
                add_users_roles_access: action.params.kk_ura_id,
            };
        case settingsConstants.ADD_USERS_ROLES_ACCESS_SUCCESS:
            return {
                ...state,
                add_users_roles_access_loading: false,
                add_users_roles_access_message: action.res.message,
                add_users_roles_access_error: null,
                add_users_roles_access: action.res.kk_users_roles_access,

                get_all_modules: state.get_all_modules ? state.get_all_modules.map(module => module.kk_module_id === action.res.kk_users_roles_access.kk_ura_module_id ? { ...module, kk_users_roles_access: action.res.kk_users_roles_access } : module) : null,
            };
        case settingsConstants.ADD_USERS_ROLES_ACCESS_FAILURE:
            return {
                ...state,
                add_users_roles_access_loading: false,
                add_users_roles_access_message: null,
                add_users_roles_access_error: action.error,
                add_users_roles_access: null,
            };

        //EDIT_USERS_ROLES_ACCESS
        case settingsConstants.EDIT_USERS_ROLES_ACCESS_REQUEST:
            return {
                ...state,
                edit_users_roles_access_loading: true,
                edit_users_roles_access_message: null,
                edit_users_roles_access_error: null,
                edit_users_roles_access: action.params.kk_ura_id,
            };
        case settingsConstants.EDIT_USERS_ROLES_ACCESS_SUCCESS:
            return {
                ...state,
                edit_users_roles_access_loading: false,
                edit_users_roles_access_message: action.res.message,
                edit_users_roles_access_error: null,
                edit_users_roles_access: null,

                get_all_modules: state.get_all_modules ? state.get_all_modules.map(module => module.kk_module_id === action.res.kk_users_roles_access.kk_ura_module_id ? { ...module, kk_users_roles_access: action.res.kk_users_roles_access } : module) : null,

                
            };
        case settingsConstants.EDIT_USERS_ROLES_ACCESS_FAILURE:
            return {
                ...state,
                edit_users_roles_access_loading: false,
                edit_users_roles_access_message: null,
                edit_users_roles_access_error: action.error,
                edit_users_roles_access: null,
            };

        //REMOVE_USERS_ROLES_ACCESS
        case settingsConstants.REMOVE_USERS_ROLES_ACCESS_REQUEST:
            return {
                ...state,
                remove_users_roles_access_loading: true,
                remove_users_roles_access_message: null,
                remove_users_roles_access_error: null,
                remove_users_roles_access: null,
            };
        case settingsConstants.REMOVE_USERS_ROLES_ACCESS_SUCCESS:
            return {
                ...state,
                remove_users_roles_access_loading: false,
                remove_users_roles_access_message: action.res.message,
                remove_users_roles_access_error: null,
                remove_users_roles_access: action.res.kk_users_roles_access,

                get_all_modules: state.get_all_modules ? state.get_all_modules.map(module => module.kk_module_id === action.res.module.kk_module_id ? action.res.module : module) : null,
            };
        case settingsConstants.REMOVE_USERS_ROLES_ACCESS_FAILURE:
            return {
                ...state,
                remove_users_roles_access_loading: false,
                remove_users_roles_access_message: null,
                remove_users_roles_access_error: action.error,
                remove_users_roles_access: null,
            };
        default:
            return state
    }
}