import { config, authHeader, csrf, paramsObjectToFormData, paramsObjectToString } from '../_helpers';

export const statisticService = {
    users,
    courses_users_progress,
    getStatisticByCourse,
    getUsersEmailByLup,
};

const api_path = `/statistics/`;

async function users(params) {
    const response = await fetch(`${config.apiUrl}${api_path}users${paramsObjectToString(params)}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}

async function courses_users_progress(params) {
    const response = await fetch(`${config.apiUrl}${api_path}courses_users_progress${paramsObjectToString(params)}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}

async function getStatisticByCourse(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getStatisticByCourse${paramsObjectToString(params)}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}

async function getUsersEmailByLup(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getUsersEmailByLup${paramsObjectToString(params)}`, { ...config.GET, headers: { ...authHeader() } });
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'пользователи.xlsx';
        a.click();
    });
    return response;
}

function handleResponse(response) {

    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
            }

            const error = data;
            return Promise.reject(error);
        }

        return data;
    });
}