import { config, paramsObjectToString, paramsObjectToFormData, authHeader, csrf } from '../_helpers';

export const questionsService = {
    add,
    edit,
    remove,
    // getAll,
    getAllByLessonId,
};

const api_path = `/lessons/questions/`;

async function add(params) {
    const response = await fetch(`${config.apiUrl}${api_path}add`, {...config.POST, headers:{...authHeader(), 'Content-Type': "application/json"}, body: JSON.stringify({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function edit(params) {
    const response = await fetch(`${config.apiUrl}${api_path}edit`, {...config.POST, headers:{...authHeader(), 'Content-Type': "application/json"}, body: JSON.stringify({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function remove(params) {
    const response = await fetch(`${config.apiUrl}${api_path}remove`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}

// async function getAll(params) {
//     const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, config.GET);
//     return handleResponse(response);
// }
async function getAllByLessonId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllByLessonId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
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