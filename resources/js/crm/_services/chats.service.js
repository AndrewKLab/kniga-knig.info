import {config, paramsObjectToString, authHeader, csrf, paramsObjectToFormData} from '../_helpers';

export const chatsService = {
    getAllByUser,
    getOneById,
    sendMessage,
    create
};

const api_path = `/chats/`;

async function getAllByUser(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAllByUser${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
    return handleResponse(response);
}
async function getOneById(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneById${params ? paramsObjectToString(params) : ''}`, {...config.GET, headers:{...authHeader()}});
    return handleResponse(response);
}
async function sendMessage(params) {
    const response = await fetch(`${config.apiUrl}${api_path}messages/sendMessage`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
    return handleResponse(response);
}
async function create(params) {
    const response = await fetch(`${config.apiUrl}${api_path}create`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
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