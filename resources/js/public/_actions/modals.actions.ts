import {  modalsConstants } from '../_constants';

export const modalsActions = {
    openDonateModal,
    openImageModal,
    openReferalModal,
};


function openDonateModal(open) {
    return dispatch => dispatch({ type: modalsConstants.OPEN_DONATE_MODAL, open })
}

function openImageModal(open, src) {
    return dispatch => dispatch({ type: modalsConstants.OPEN_IMAGE_MODAL, open, src })
}

function openReferalModal(open) {
    return dispatch => dispatch({ type: modalsConstants.OPEN_REFERAL_MODAL, open })
}
