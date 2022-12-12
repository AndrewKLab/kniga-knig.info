import {config, paramsObjectToString} from '../_helpers';

export const coursesCategoriesService = {
    getAll,
    getOneByCategoryId
};

const api_path = `/courses_categories/`;

async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, config.GET);
    return handleResponse(response);
}
async function getOneByCategoryId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByCategoryId${params ? paramsObjectToString(params) : ''}`, config.GET);
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