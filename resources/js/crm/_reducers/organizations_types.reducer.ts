import { organizationsTypesConstants, pagesConstants } from '../_constants';

const initialState = {
    get_all_organizations_types_loading: false,
    get_all_organizations_types_message: null,
    get_all_organizations_types_error: null,
    get_all_organizations_types: null,
}

export function organizations_types(state = initialState, action) {
    switch (action.type) {
        case pagesConstants.OPEN_PAGE:
            return initialState
        case pagesConstants.CLOSE_PAGE:
            return initialState

        // GET_ALL_ORGANIZATIONS_TYPES
        case organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_REQUEST:
            return {
                ...state,
                get_all_organizations_types_loading: true,
                get_all_organizations_types_message: null,
                get_all_organizations_types_error: null,
                get_all_organizations_types: null,
            };
        case organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_SUCCESS:
            return {
                ...state,
                get_all_organizations_types_loading: false,
                get_all_organizations_types_message: action.res.message,
                get_all_organizations_types_error: null,
                get_all_organizations_types: action.res.ot,
            };
        case organizationsTypesConstants.GET_ALL_ORGANIZATIONS_TYPES_FAILURE:
            return {
                ...state,
                get_all_organizations_types_loading: false,
                get_all_organizations_types_message: null,
                get_all_organizations_types_error: action.error.message,
                get_all_organizations_types: null,
            };

        default:
            return state
    }
}