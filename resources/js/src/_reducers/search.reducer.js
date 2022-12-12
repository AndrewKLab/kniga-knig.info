import { searchConstants } from '../_constants';
const initialState = {
  main_site_search_loading: false,
  main_site_search_results: null,
  main_site_search_error: null,
}

export function search(state = initialState, action) {
  switch (action.type) {
    case searchConstants.SEARCH_REQUEST:
      return {
        ...state,
        main_site_search_loading: true,
        main_site_search_results: null,
        main_site_search_error: null,
      };
    case searchConstants.SEARCH_SUCCESS:
      return {
        ...state,
        main_site_search_loading: false,
        main_site_search_results: action.data,
        main_site_search_error: null,
      };
    case searchConstants.SEARCH_FAILURE:
      return {
        ...state,
        main_site_search_loading: false,
        main_site_search_results: null,
        main_site_search_error: action.error,
      };
    default:
      return state
  }
}