import {authHeader, config, paramsObjectToString, paramsObjectToFormData, csrf} from '../_helpers';

export const questionsUsersProgressAnswersService = {
    edit,
};

const api_path = `/lessons/questions/questions_users_answers/`;

async function edit(params) {
    const response = await fetch(`${config.apiUrl}${api_path}edit`, {...config.POST, headers:{...authHeader()}, body: paramsObjectToFormData({...params, '_token': csrf()})});
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