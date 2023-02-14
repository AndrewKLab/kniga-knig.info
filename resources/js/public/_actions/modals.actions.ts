import {  modalsConstants } from '../_constants';

export const modalsActions = {
    openDonateModal,
};


function openDonateModal(open) {
    return dispatch => dispatch({ type: modalsConstants.OPEN_DONATE_MODAL, open })
}
