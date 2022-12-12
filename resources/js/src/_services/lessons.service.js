import { config, paramsObjectToString, authHeader } from '../_helpers';

export const lessonsService = {
    // getAll,
    // getAllByCategoryId,
    getOneByLessonId,
    getFirstByCourseId,
};

const api_path = `/lessons/`;

// async function getAll(params) {
//     const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, config.GET);
//     return handleResponse(response);
// }
// async function getAllByCategoryId(params) {
//     const response = await fetch(`${config.apiUrl}${api_path}getAllByCategotyId${params ? paramsObjectToString(params) : ''}`, config.GET);
//     return handleResponse(response);
// }
async function getOneByLessonId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByLessonId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function getFirstByCourseId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getFirstByCourseId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
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