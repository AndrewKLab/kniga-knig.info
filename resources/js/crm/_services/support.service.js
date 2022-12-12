import {config, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const supportService = {
    create
};

const api_path = `/support/`;

async function create(params) {
    const response = await fetch(`${config.apiUrl}${api_path}create`, {...config.POST, body: paramsObjectToFormData(params)});
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