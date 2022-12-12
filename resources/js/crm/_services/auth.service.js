import {config, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const authService = {
    registration,
    login,
    logout,
    forgotPassword,
    verifyPinPassword,
    resetPassword,
    editAuthUser,
    editAvatarAuthUser,
    getAuthUser
};

const api_path = `/auth/`;
const user_path = `user/`;

async function registration(params) {
    const response = await fetch(`${config.apiUrl}${api_path}registration`, {...config.POST, body: paramsObjectToFormData(params)});
    return handleResponse(response);
}

async function login(params) {
    const response = await fetch(`${config.apiUrl}${api_path}login`, {...config.POST, body: paramsObjectToFormData(params)});
    return handleResponse(response);
}
async function logout(params) {
    const response = await fetch(`${config.apiUrl}${api_path}logout`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({'_token': csrf()})});
    return handleResponse(response);
}

async function forgotPassword(params) {
    const response = await fetch(`${config.apiUrl}${api_path}password/forgot`, {...config.POST, body: paramsObjectToFormData(params)});
    return handleResponse(response);
}
async function verifyPinPassword(params) {
    const response = await fetch(`${config.apiUrl}${api_path}password/verify/pin`, {...config.POST, body: paramsObjectToFormData(params)});
    return handleResponse(response);
}
async function resetPassword(params) {
    const response = await fetch(`${config.apiUrl}${api_path}password/reset`, {...config.POST, body: paramsObjectToFormData(params)});
    return handleResponse(response);
}
async function editAuthUser(params) {
    const response = await fetch(`${config.apiUrl}${api_path}${user_path}edit`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function editAvatarAuthUser(params) {
    const response = await fetch(`${config.apiUrl}${api_path}${user_path}edit/avatar`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function getAuthUser(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAuthUser`, {...config.GET, headers:{...authHeader()}});
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