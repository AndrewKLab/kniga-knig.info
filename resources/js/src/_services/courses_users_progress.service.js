import { authHeader, config, paramsObjectToString, paramsObjectToFormData, csrf } from '../_helpers';

export const coursesUsersProgressService = {
    add,
    edit,
    remove,
    getAll,
    getOneByCourseId,
    update_cup_need_notify,
    send_course_diplom_to_email,
    send_course_diplom_order,
};

const api_path = `/courses_users_progress/`;

async function add(params) {
    const response = await fetch(`${config.apiUrl}${api_path}add`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
    return handleResponse(response);
}
async function edit(params) {
    const response = await fetch(`${config.apiUrl}${api_path}edit`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
    return handleResponse(response);
}
async function remove(params) {
    const response = await fetch(`${config.apiUrl}${api_path}remove`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
    return handleResponse(response);
}
async function getAll(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getAll${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function getOneByCourseId(params) {
    const response = await fetch(`${config.apiUrl}${api_path}getOneByCourseId${params ? paramsObjectToString(params) : ''}`, { ...config.GET, headers: { ...authHeader() } });
    return handleResponse(response);
}
async function update_cup_need_notify(params) {
    const response = await fetch(`${config.apiUrl}${api_path}update_cup_need_notify`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
    return handleResponse(response);
}
async function send_course_diplom_to_email(params) {
    const response = await fetch(`${config.apiUrl}${api_path}send_course_diplom_to_email`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
    return handleResponse(response);
}
async function send_course_diplom_order(params) {
    const response = await fetch(`${config.apiUrl}${api_path}send_course_diplom_order`, { ...config.POST, headers: { ...authHeader() }, body: paramsObjectToFormData({ ...params, '_token': csrf() }) });
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