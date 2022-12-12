import { supportConstants } from '../_constants';
const initialState = {
    create_support_loading: false,
    create_support_message: null,
    create_support_errors: null,
    create_support_error_message: null,
  }

export function support(state = initialState, action) {
  switch (action.type) {
    //CREATE COURSE
    case supportConstants.CREATE_SUPPORT_REQUEST:
      return {
        create_support_loading: true,
        create_support_message: null,
        create_support_errors: null,
        create_support_error_message: null,
      };
    case supportConstants.CREATE_SUPPORT_SUCCESS:
      return {
        create_support_loading: false,
        create_support_message: action.res.message,
        create_support_errors: null,
        create_support_error_message: null,
      };
    case supportConstants.CREATE_SUPPORT_FAILURE:
      return {
        create_support_loading: false,
        create_support_message: null,
        create_support_errors: action.error.data,
        create_support_error_message: action.error.message,
      };


    default:
      return state
  }
}