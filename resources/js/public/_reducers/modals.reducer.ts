import { modalsConstants } from '../_constants';

const initialState = {
    open_donate_modal: false,

    open_image_modal: false,
    image_modal_src: null,

    open_referal_modal: false,

}

export function modals(state = initialState, action) {
    switch (action.type) {
        case modalsConstants.OPEN_DONATE_MODAL:
            return {
                ...state,
                open_donate_modal: action.open,
            };

        case modalsConstants.OPEN_IMAGE_MODAL:
            return {
                ...state,
                open_image_modal: action.open,
                image_modal_src: action.src,
            };

        case modalsConstants.OPEN_REFERAL_MODAL:
            return {
                ...state,
                open_referal_modal: action.open,
            };

        default:
            return state
    }
}