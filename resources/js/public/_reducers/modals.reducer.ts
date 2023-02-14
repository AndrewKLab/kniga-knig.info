import { modalsConstants } from '../_constants';

const initialState = {
    open_donate_modal: false,
}

export function modals(state = initialState, action) {
    switch (action.type) {
        case modalsConstants.OPEN_DONATE_MODAL:
            return {
                ...state,
                open_donate_modal: action.open,
            };

        default:
            return state
    }
}