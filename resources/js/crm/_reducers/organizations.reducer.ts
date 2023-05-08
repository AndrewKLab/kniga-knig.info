import { organizationsConstants, pagesConstants } from '../_constants';

const initialState = {
    create_organization_loading: false,
    create_organization_message: null,
    create_organization_errors: null,
    create_organization_error_message: null,
    create_organization: null,

    update_organization_loading: false,
    update_organization_message: null,
    update_organization_errors: null,
    update_organization_error_message: null,
    update_organization: null,

    delete_organization_loading: false,
    delete_organization_message: null,
    delete_organization_error: null,
    delete_organization: null,

    get_all_organizations_loading: false,
    get_all_organizations_message: null,
    get_all_organizations_error: null,
    get_all_organizations: null,

    get_one_by_id_organization_loading: false,
    get_one_by_id_organization_message: null,
    get_one_by_id_organization_error: null,
    get_one_by_id_organization: null,
}

export function organizations(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState

        // CREATE_ORGANIZATION
        case organizationsConstants.CREATE_ORGANIZATION_REQUEST:
            return {
                ...state,
                create_organization_loading: true,
                create_organization_message: null,
                create_organization_errors: null,
                create_organization_error_message: null,
                create_organization: null,
            };
        case organizationsConstants.CREATE_ORGANIZATION_SUCCESS:
            return {
                ...state,
                create_organization_loading: false,
                create_organization_message: action.res.message,
                create_organization_errors: null,
                create_organization_error_message: null,
                create_organization: null,
            };
        case organizationsConstants.CREATE_ORGANIZATION_FAILURE:
            return {
                ...state,
                create_organization_loading: false,
                create_organization_message: null,
                create_organization_errors: action.error.data,
                create_organization_error_message: action.error.message,
                create_organization: null,
            };

        // UPDATE_ORGANIZATION
        case organizationsConstants.UPDATE_ORGANIZATION_REQUEST:
            return {
                ...state,
                update_organization_loading: true,
                update_organization_message: null,
                update_organization_errors: null,
                update_organization_error_message: null,
                update_organization: null,
            };
        case organizationsConstants.UPDATE_ORGANIZATION_SUCCESS:
            return {
                ...state,
                update_organization_loading: false,
                update_organization_message: action.res.message,
                update_organization_errors: null,
                update_organization_error_message: null,
                update_organization: null,

                get_one_by_course_id_organization: action.res.course,
            };
        case organizationsConstants.UPDATE_ORGANIZATION_FAILURE:
            return {
                ...state,
                update_organization_loading: false,
                update_organization_message: null,
                update_organization_errors: action.error.message.data,
                update_organization_error_message: action.error.message.message,
                update_organization: null,
            };

        // DELETE_ORGANIZATION
        case organizationsConstants.DELETE_ORGANIZATION_REQUEST:
            return {
                ...state,
                delete_organization_loading: true,
                delete_organization_message: null,
                delete_organization_error: null,
                delete_organization: null,
            };
        case organizationsConstants.DELETE_ORGANIZATION_SUCCESS:
            return {
                ...state,
                delete_organization_loading: false,
                delete_organization_message: action.res.message,
                delete_organization_error: null,
                delete_organization: null,
            };
        case organizationsConstants.DELETE_ORGANIZATION_FAILURE:
            return {
                ...state,
                delete_organization_loading: false,
                delete_organization_message: null,
                delete_organization_error: action.error.message,
                delete_organization: null,
            };

        // GET_ALL_ORGANIZATIONS
        case organizationsConstants.GET_ALL_ORGANIZATIONS_REQUEST:
            return {
                ...state,
                get_all_organizations_loading: true,
                get_all_organizations_message: null,
                get_all_organizations_error: null,
                get_all_organizations: null,
            };
        case organizationsConstants.GET_ALL_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                get_all_organizations_loading: false,
                get_all_organizations_message: action.res.message,
                get_all_organizations_error: null,
                get_all_organizations: action.res.organizations,
            };
        case organizationsConstants.GET_ALL_ORGANIZATIONS_FAILURE:
            return {
                ...state,
                get_all_organizations_loading: false,
                get_all_organizations_message: null,
                get_all_organizations_error: action.error.message,
                get_all_organizations: null,
            };

        // GET_ONE_BY_ID_ORGANIZATION
        case organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_REQUEST:
            return {
                ...state,
                get_one_by_id_organization_loading: true,
                get_one_by_id_organization_message: null,
                get_one_by_id_organization_error: null,
                get_one_by_id_organization: null,
            };
        case organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_SUCCESS:
            return {
                ...state,
                get_one_by_id_organization_loading: false,
                get_one_by_id_organization_message: action.res.message,
                get_one_by_id_organization_error: null,
                get_one_by_id_organization: action.res.organization,
            };
        case organizationsConstants.GET_ONE_BY_ID_ORGANIZATION_FAILURE:
            return {
                ...state,
                get_one_by_id_organization_loading: false,
                get_one_by_id_organization_message: null,
                get_one_by_id_organization_error: action.error.message,
                get_one_by_id_organization: null,
            };


        default:
            return state
    }
}