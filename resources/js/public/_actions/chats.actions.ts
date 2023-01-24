import { chatsConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { chatsService } from '../_services';

export const chatsActions = {
    getAllByUser,
    getOneById,
    sendMessage,
};


function getAllByUser(params) {
    return defaultAction(params, {
        serviceFunc: () => chatsService.getAllByUser(params),
        requestType: chatsConstants.GET_ALL_BY_USER_CHATS_REQUEST,
        successType: chatsConstants.GET_ALL_BY_USER_CHATS_SUCCESS,
        failureType: chatsConstants.GET_ALL_BY_USER_CHATS_FAILURE,
    })
}
function getOneById(params) {
    return defaultAction(params, {
        serviceFunc: () => chatsService.getOneById(params),
        requestType: chatsConstants.GET_ONE_BY_ID_CHATS_REQUEST,
        successType: chatsConstants.GET_ONE_BY_ID_CHATS_SUCCESS,
        failureType: chatsConstants.GET_ONE_BY_ID_CHATS_FAILURE,
    })
}
function sendMessage(params) {
    return defaultAction(params, {
        serviceFunc: () => chatsService.sendMessage(params),
        requestType: chatsConstants.SEND_MESSAGE_CHATS_REQUEST,
        successType: chatsConstants.SEND_MESSAGE_CHATS_SUCCESS,
        failureType: chatsConstants.SEND_MESSAGE_CHATS_FAILURE,
    })
}