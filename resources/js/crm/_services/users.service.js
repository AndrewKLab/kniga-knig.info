import { config, paramsObjectToString, paramsObjectToFormData, authHeader, csrf } from '../_helpers';

export const usersService = {
    add,
    edit,
    remove,
    getAllByRoleId,
    getAllMyUsersByRoleId,
    getAllWithoutUserByRoleId,
    getOneByUserId
};

const api_path = `/users/`;

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

async function getAllByRoleId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllByRoleId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function getAllMyUsersByRoleId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllMyUsersByRoleId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function getAllWithoutUserByRoleId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllWithoutUserByRoleId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function getOneByUserId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByUserId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
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