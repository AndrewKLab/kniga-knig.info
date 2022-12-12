import {config, paramsObjectToString} from '../_helpers';

export const coursesService = {
    getAll,
    getAllByCategoryId,
    getOneByCourseId
};

const api_path = `/courses/`;

async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, config.GET);
    return handleResponse(response);
}
async function getAllByCategoryId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllByCategotyId${params ? paramsObjectToString(params) : ''}`, config.GET);
    return handleResponse(response);
}
async function getOneByCourseId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByCourseId${params ? paramsObjectToString(params) : ''}`, config.GET);
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