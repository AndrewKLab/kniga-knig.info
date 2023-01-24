import { config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData } from '../_helpers';

export const notificationsService = {
    getAll,
    markAsReadOneById,
    markAsReadAll
};

const api_path = `/notifications/`;

async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function markAsReadOneById(params) {
    const response = await fetch(`${config.apiUrl}${api_path}markAsReadOneById`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function markAsReadAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}markAsReadAll`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
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