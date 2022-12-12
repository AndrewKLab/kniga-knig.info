import {config, paramsObjectToString } from '../_helpers';

export const searchService = {
    search
};

async function search(params) {
    const response = await fetch(`${config.apiUrl}/search${params ? paramsObjectToString(params) : ''}`, {...config.GET});
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

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

