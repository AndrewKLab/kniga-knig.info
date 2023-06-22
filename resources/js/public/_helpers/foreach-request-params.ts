
export const paramsObjectToString = (params?: object | null) => {
    if (params) {
        let par = '';
        let counter = 0;
        for (var key in params) {
            par += `${counter === 0 ? `?` : `&`}${key}=${params[key]}`;
            counter++;
        }
        return par;
    } else return '';

}
export const paramsObjectToFormData = (params: object) => {
    const formData = new FormData();

    for (var key in params) {
        let value = params[key]
        if (value === null) value = '';
        if (value === false) value = '';
        formData.append(key, value);
    }
    return formData;
}

