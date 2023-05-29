import {config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const organizationsUsersService = {
    create,
    remove,
};

const api_path = `/organizations_users/`;

async function create(params) {
    const response = await fetch(`${config.apiUrl}${api_path}create`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function remove(params) {
    const response = await fetch(`${config.apiUrl}${api_path}delete`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
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