import { organizationsUsersConstants, pagesConstants } from '../_constants';

const initialState = {
    create_organizations_users_loading: false,
    create_organizations_users_message: null,
    create_organizations_users_errors: null,
    create_organizations_users_error_message: null,
    create_organizations_users: null,

    delete_organization_users_loading: false,
    delete_organization_users_message: null,
    delete_organization_users_error: null,
    delete_organization_users: null,
}

export function organizations_users(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState

        // CREATE_ORGANIZATIONS_USERS
        case organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_REQUEST:
            return {
                ...state,
                create_organizations_users_loading: true,
                create_organizations_users_message: null,
                create_organizations_users_errors: null,
                create_organizations_users_error_message: null,
                create_organizations_users: null,
            };
        case organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_SUCCESS:
            return {
                ...state,
                create_organizations_users_loading: false,
                create_organizations_users_message: action.res.message,
                create_organizations_users_errors: null,
                create_organizations_users_error_message: null,
                create_organizations_users: null,
            };
        case organizationsUsersConstants.CREATE_ORGANIZATIONS_USERS_FAILURE:
            return {
                ...state,
                create_organizations_users_loading: false,
                create_organizations_users_message: null,
                create_organizations_users_errors: action.error.data,
                create_organizations_users_error_message: action.error.message,
                create_organizations_users: null,
            };

        // DELETE_ORGANIZATIONS_USERS
        case organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_REQUEST:
            return {
                ...state,
                delete_organization_users_loading: true,
                delete_organization_users_message: null,
                delete_organization_users_error: null,
                delete_organization_users: null,
            };
        case organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_SUCCESS:
            return {
                ...state,
                delete_organization_users_loading: false,
                delete_organization_users_message: action.res.message,
                delete_organization_users_error: null,
                delete_organization_users: null,
            };
        case organizationsUsersConstants.DELETE_ORGANIZATIONS_USERS_FAILURE:
            return {
                ...state,
                delete_organization_users_loading: false,
                delete_organization_users_message: null,
                delete_organization_users_error: action.error.message,
                delete_organization_users: null,
            };

        default:
            return state
    }
}