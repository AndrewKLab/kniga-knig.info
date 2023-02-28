import {config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const authService = {
    googleAuthUrl,
    vkAuthUrl,
    odnoklassnikiAuthUrl,
};

const api_path = `/auth/`;

async function googleAuthUrl(params) {
    const response = await fetch(`${config.apiUrl}${api_path}google/url${params ? paramsObjectToString(params) : ''}`, {...config.GET});
    return handleResponse(response);
}
async function vkAuthUrl(params) {
    const response = await fetch(`${config.apiUrl}${api_path}vkontakte/url${params ? paramsObjectToString(params) : ''}`, {...config.GET});
    return handleResponse(response);
}
async function odnoklassnikiAuthUrl(params) {
    const response = await fetch(`${config.apiUrl}${api_path}odnoklassniki/url${params ? paramsObjectToString(params) : ''}`, {...config.GET});
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