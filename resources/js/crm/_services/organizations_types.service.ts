import {config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const organizationsTypesService = {
    getAll,
};

const api_path = `/organizations_types/`;

async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
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