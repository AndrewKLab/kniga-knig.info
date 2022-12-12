import { pagesConstants } from '../_constants';

export const pagesActions = {
    openPage,
    closePage,
};

function openPage() {
    return dispatch => dispatch({ type: pagesConstants.OPEN_PAGE })
}
function closePage() {
    return dispatch => dispatch({ type: pagesConstants.CLOSE_PAGE })
}
