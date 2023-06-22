export const thunkFetch = async (request: any, { rejectWithValue }: any) => {
    try {
        const response = await request()
        return response.data
    } catch (err: any) {
        if (!err.response) throw err
        return rejectWithValue(err.response.data)
    }
}

export const handleServerErrors = (errors: object) => {
    return Object.keys(errors).map((error, index) => { return { name: error, errors: Object.values(errors)[index] } })
}