import { statisticConstants } from '../_constants';
import { defaultAction } from '../_helpers';
import { statisticService } from '../_services';

export const statisticActions = {
    users,
    courses_users_progress,
    getStatisticByCourse,
};

function users(params) {
    return defaultAction(params, {
        serviceFunc: () => statisticService.users(params),
        requestType: statisticConstants.USERS_STATISTIC_REQUEST,
        successType: statisticConstants.USERS_STATISTIC_SUCCESS,
        failureType: statisticConstants.USERS_STATISTIC_FAILURE,
    })
}

function courses_users_progress(params) {
    return defaultAction(params, {
        serviceFunc: () => statisticService.courses_users_progress(params),
        requestType: statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_REQUEST,
        successType: statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_SUCCESS,
        failureType: statisticConstants.COURSES_USERS_PROGRESS_STATISTIC_FAILURE,
    })
}

function getStatisticByCourse(params) {
    return defaultAction(params, {
        serviceFunc: () => statisticService.getStatisticByCourse(params),
        requestType: statisticConstants.GET_STATISTIC_BY_COURSE_REQUEST,
        successType: statisticConstants.GET_STATISTIC_BY_COURSE_SUCCESS,
        failureType: statisticConstants.GET_STATISTIC_BY_COURSE_FAILURE,
    })
}