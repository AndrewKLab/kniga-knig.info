import {config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const organizationsService = {
    create,
    update,
    remove,
    getAll,
    getOneById,
};

const api_path = `/organizations/`;

async function create(params) {
    const response = await fetch(`${config.apiUrl}${api_path}create`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function update(params) {
    const response = await fetch(`${config.apiUrl}${api_path}update`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function remove(params) {
    const response = await fetch(`${config.apiUrl}${api_path}delete`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
    return handleResponse(response);
}
async function getOneById(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneById${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
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