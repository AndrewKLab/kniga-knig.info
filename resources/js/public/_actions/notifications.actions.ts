import { chatsConstants, notificationsConstants } from '../_constants';
import { defaultAction, subscribeToPrivateChannel } from '../_helpers';
import { notificationsService } from '../_services';

export const notificationsActions = {
    createNotificationPusherToChannel,
    getAll,
    markAsReadOneById,
    markAsReadAll
};

function createNotificationPusherToChannel(params) {
    return dispatch => {
        return subscribeToPrivateChannel(params.channel, params?.options).notification((res) => {
            
            if(res.type === "App\\Notifications\\ChatNewMessage") dispatch(push_message(res))
            dispatch(push_notification(res))

            console.log(res);
        });
    };
    function push_notification(res) { return { type: notificationsConstants.PUSH_NOTIFICATION, res } }
    function push_message(res) { return { type: chatsConstants.PUSH_MESSAGE, res } }
}

function getAll(params) {
    return defaultAction(params, {
        serviceFunc: () => notificationsService.getAll(params),
        requestType: notificationsConstants.GET_ALL_NOTIFICATIONS_REQUEST,
        successType: notificationsConstants.GET_ALL_NOTIFICATIONS_SUCCESS,
        failureType: notificationsConstants.GET_ALL_NOTIFICATIONS_FAILURE,
    })
}

function markAsReadOneById(params) {
    return defaultAction(params, {
        serviceFunc: () => notificationsService.markAsReadOneById(params),
        requestType: notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_REQUEST,
        successType: notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_SUCCESS,
        failureType: notificationsConstants.MARK_AS_READ_ONE_BY_ID_NOTIFICATIONS_FAILURE,
    })
}

function markAsReadAll(params) {
    return defaultAction(params, {
        serviceFunc: () => notificationsService.markAsReadAll(params),
        requestType: notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_REQUEST,
        successType: notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_SUCCESS,
        failureType: notificationsConstants.MARK_AS_READ_ALL_NOTIFICATIONS_FAILURE,
    })
}
