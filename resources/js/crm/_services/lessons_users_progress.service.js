import {authHeader, config, paramsObjectToString, paramsObjectToFormData, csrf} from '../_helpers';

export const lessonsUsersProgressService = {
    add,
    edit,
    remove,
    getAllByCupId,
    getOneByLessonId
};

const api_path = `/lessons_users_progress/`;

async function add(params) {
    const response = await fetch(`${config.apiUrl}${api_path}add`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function edit(params) {
    const response = await fetch(`${config.apiUrl}${api_path}edit`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function remove(params) {
    const response = await fetch(`${config.apiUrl}${api_path}remove`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function getAllByCupId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllByCupId${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
    return handleResponse(response);
}
async function getOneByLessonId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByLessonId${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
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