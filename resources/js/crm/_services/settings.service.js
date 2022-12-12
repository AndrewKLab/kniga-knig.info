import {config, authHeader, csrf, paramsObjectToFormData, paramsObjectToString} from '../_helpers';

export const settingsService = {
    getAllUsersRoles,
    getAllModules,
    addUsersRolesAccess,
    editUsersRolesAccess,
    removeUsersRolesAccess,
};

const api_path = `/settings/`;

async function getAllUsersRoles(params) {
    const response = await fetch(`${config.apiUrl}${api_path}users_roles/getAll${paramsObjectToString(params)}`, {...config.GET,  headers:{...authHeader()}});
    return handleResponse(response);
}
async function getAllModules(params) {
    const response = await fetch(`${config.apiUrl}${api_path}modules/getAll${paramsObjectToString(params)}`, {...config.GET,  headers:{...authHeader()}});
    return handleResponse(response);
}
async function addUsersRolesAccess(params) {
    const response = await fetch(`${config.apiUrl}${api_path}users_roles_access/add`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function editUsersRolesAccess(params) {
    const response = await fetch(`${config.apiUrl}${api_path}users_roles_access/edit`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function removeUsersRolesAccess(params) {
    const response = await fetch(`${config.apiUrl}${api_path}users_roles_access/remove`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
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