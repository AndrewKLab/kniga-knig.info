
export const paramsObjectToString = (params: object) => {
    let par = '';
    let counter = 0;
    for (var key in params) {
        par += `${counter === 0 ? `?` : `&`}${key}=${params[key]}`;
        counter++;
    }
    return par;
}
export const paramsObjectToFormData = (params: object) => {
    const formData = new FormData();

    for (var key in params) {
        let value = params[key]
        if (value === null) value = '';
        if (value === false) value = '';
        if (value === undefined) value = '';
        
        if (typeof value === "object") {
            for (const file of value) {
                formData.append(key, file);
            }
        } else formData.append(key, value);

    }
    return formData;
}

